import 'package:defesa_civil/models/usuario.dart';
import 'package:meta/meta.dart';
import 'package:shared_preferences/shared_preferences.dart';

void setCredentials({
  @required String api_key,
  @required SharedPreferences userData,
  @required Usuario novoUsuario}) async {
  userData = await SharedPreferences.getInstance();
  userData.setString("usuario", novoUsuario.toString());
  userData.setString("api_key", api_key);
}