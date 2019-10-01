import 'dart:convert';

import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/helpers/sign_in.dart';
import 'package:defesa_civil/ui/logged/homelogged.dart';
import 'package:defesa_civil/ui/unregistered/registerpage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_auth_buttons/flutter_auth_buttons.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

import '../../helpers/size_config.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  SharedPreferences userData;

  @override
  void initState() {
    super.initState();
    getCredentials();
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
          onPressed: () async {}, label: Text("Teste")),
      backgroundColor: Colors.white,
      body: Container(
        padding: EdgeInsets.fromLTRB(10, 0, 10, 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.only(bottom: 0),
              child: Image(
                  height: SizeConfig.blockSizeHorizontal * 40,
                  image: AssetImage("assets/images/defesa_civil.jpg")),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 50),
              child: GoogleSignInButton(
                darkMode: true,
                text: "Fazer login com Google",
                onPressed: () async {
                  showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        // retorna um objeto do tipo Dialog
                        return AlertDialog(
                          title: new Text("Autenticando"),
                          content: Row(
                            children: <Widget>[
                              CircularProgressIndicator(
                                valueColor: AlwaysStoppedAnimation<Color>(
                                    Color.fromRGBO(246, 129, 33, 1)),
                              ),
                              Padding(
                                padding: EdgeInsets.symmetric(horizontal: 10),
                              ),
                              Text("Autenticando")
                            ],
                          ),
                        );
                      });
                  signInWithGoogle().then((result) async {
                    var url = '$REQ/auth/google/login';
                    var response = await http
                        .post(url, headers: {"authorization": "Bearer $token"});
                    var responseDecoded = json.decode(response.body);
                    print(token);
                    print(responseDecoded['api_key']);
                    if (response.statusCode == 200) {
                      setCredentials(responseDecoded['api_key']);
                      Navigator.of(context).pushAndRemoveUntil(
                          MaterialPageRoute(builder: (context) => HomeLogged()),
                          (Route<dynamic> route) => false);
                    } else if (responseDecoded['mensagem'] ==
                        "Usuário não cadastrado") {
                      Navigator.of(context).pushAndRemoveUntil(
                          MaterialPageRoute(
                              builder: (context) =>
                                  RegisterPage(name, email, image, token)),
                          (Route<dynamic> route) => false);
                    }
                  }).catchError((erro) {
                    print("ERRO: $erro");
                  });
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  setCredentials(String api_key) async {
    userData.setString("name", name);
    userData.setString("email", email);
    userData.setString("image", image);
    userData.setString("api_key", api_key);

  }

  getCredentials() async {
    userData = await SharedPreferences.getInstance();
  }
}
