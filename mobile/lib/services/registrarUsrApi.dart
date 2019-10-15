import 'dart:convert';

import 'package:defesa_civil/helpers/constants.dart';
import 'package:dio/dio.dart';
import 'package:http/http.dart' as http;

Future<Map<String, dynamic>> registrarUsuario(Map dados, String token) async {
  var response;
  var url = '$REQ/auth/google/cadastro';
  Dio dio = new Dio();
  response = await dio
      .post(url,
      data: jsonEncode(dados),
      options: Options(headers: {"authorization": "Bearer $token"}))
      .then((sucess) {
    print(sucess);
    return sucess.data;
  }).catchError((e) {
    print(e.response.data);
    return e.response.data;
  });

  return response;
}

Future<Map<String, dynamic>> getCep(String cep) async {
  String url =
      'https://viacep.com.br/ws/${cep.replaceAll('-', '')}/json/';
  var response = await http.get(url);
  print('Response status: ${response.statusCode}');
  Map<String, dynamic> responseDecoded = json.decode(response.body);
  print('Response body: ${response.body}');
  return responseDecoded;
}