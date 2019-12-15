import 'package:defesa_civil/helpers/constants.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future consultNuPDeC() async {
  var userData = await SharedPreferences.getInstance();
  var api_key = userData.getString('api_key');
  var response;
  var url = '$REQ/app/nupdec/consultar';
  Dio dio = Dio();
  response = await dio
      .get(url, options: Options(headers: {"authorization": "Bearer $api_key"}))
      .then((result) {
    print("Chamei");
    return result.data['cadastrado'];
  }).catchError((e) {
    return e.response.data['cadastrado'];
  });
  return response;
}

Future removerNup() async {
  var userData = await SharedPreferences.getInstance();
  var api_key = userData.getString('api_key');
  var response;
  var url = '$REQ/app/nupdec/remover';
  Dio dio = Dio();
  response = await dio
      .post(url,
          options: Options(headers: {"authorization": "Bearer $api_key"}))
      .then((result) {
    print(result.data);
    print(result.statusCode);
    return result.data;
  }).catchError((e) {
    print(e.response.data);
    return e.response.data;
  });

  return response;
}

Future registerNuPDeC() async {
  var userData = await SharedPreferences.getInstance();
  var api_key = userData.getString('api_key');
  var response;
  var url = '$REQ/app/nupdec/cadastrar';
  Dio dio = Dio();
  response = await dio
      .post(url,
          options: Options(headers: {"authorization": "Bearer $api_key"}))
      .then((result) {
    print(result.data);
    print(result.statusCode);
    return result.data;
  }).catchError((e) {
    print(e.response.data);
    return e.response.data;
  });

  return response;
}
