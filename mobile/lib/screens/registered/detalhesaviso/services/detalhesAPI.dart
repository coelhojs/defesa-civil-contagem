import 'dart:typed_data';

import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/models/aviso.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

Future<Aviso> detalhes(String id) async {
  Dio dio = Dio();
  var userData = await SharedPreferences.getInstance();
  String api_key = userData.getString("api_key");

  Map response = await dio
      .get("$REQ/app/avisos/$id",
          options: Options(headers: {"authorization": "Bearer $api_key"}))
      .then((result) {
    return result.data;
  }).catchError((e) {
    return e.response.data;
  });

  List<String> images = [];
  var aviso = Aviso.fromJson(response);

  /// Adicionando o url completo das imagens obtidas pela API
  /// para um array
  for (var foto in aviso.fotos) {
    images.add("$REQ${foto['url']}");
  }

  /// Percorrendo o array com o url completo obtido pela API
  /// e fazendo download das imagens e convertendo elas
  /// para tipo Uint8list para poder usar no Image.memory
  for (var url in images) {
    List<int> response = await dio
        .get(url,
            options: Options(
                headers: {"authorization": "Bearer $api_key"},
                responseType: ResponseType.bytes))
        .then((value) {
      return value.data;
    });
    Uint8List fotoConvertida = Uint8List.fromList(response);
    aviso.fotos2.add(fotoConvertida);
  }

  return aviso;
}
