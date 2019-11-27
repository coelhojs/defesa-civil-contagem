import 'dart:convert';
import 'dart:io';

import 'package:defesa_civil/helpers/constants.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future uploadAviso(
    {@required List<File> imageFile,
    @required String incidente,
    @required String descricao,
    @required String endereco,
    @required String numero,
    @required String bairro}) async {
  var userData = await SharedPreferences.getInstance();
  var api_key = userData.getString('api_key');

  var position = await Geolocator()
      .getCurrentPosition(desiredAccuracy: LocationAccuracy.high);

  var response;
  var url = '$REQ/app/avisos';
  Dio dio = Dio();
  response = await dio
      .post(url,
          data: jsonEncode({
            "tipo": incidente,
            "descricao": descricao,
            "coordenadas": {
              "latitude": position.latitude,
              "longitude": position.longitude
            },
            "endereco": {"rua": endereco, "numero": numero, "bairro": bairro}
          }),
          options: Options(headers: {"authorization": "Bearer $api_key"}))
      .then((sucess) async {
    print(sucess.data);
    await uploadFoto(imageFile, sucess.data['id'], api_key);
    return sucess.data;
  }).catchError((e) {
    print(e.response.data);
    return e.response.data;
  });
}

Future uploadFoto(List<File> imageFile, String id, String api_key) async {
  Dio dio = new Dio();

  for (int i = 0; i < 3; i++) {
    if (imageFile[i] != null) {
      FormData formData = new FormData.fromMap(
          {"foto": await MultipartFile.fromFile(imageFile[i].path)});
      await dio
          .post("$REQ/app/avisos/$id/fotos",
              data: formData,
              options: Options(headers: {"authorization": "Bearer $api_key"}))
          .then((sucesso) {
        print(sucesso);
      }).catchError((error) {
        print(error.response.data);
      });
    }
  }
}
