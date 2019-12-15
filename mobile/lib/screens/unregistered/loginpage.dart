import 'dart:async';
import 'dart:convert';

import 'package:defesa_civil/helpers/blochome.dart';
import 'package:defesa_civil/screens/unregistered/registerpage/components/sucess.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttie/fluttie.dart';
import 'package:defesa_civil/components/dialog.dart';
import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/screens/registered/homelogged.dart';
import 'package:defesa_civil/screens/teste.dart';
import 'package:defesa_civil/screens/unregistered/registerpage/registerpage.dart';
import 'package:defesa_civil/services/sign_in.dart';
import 'package:defesa_civil/models/usuario.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_auth_buttons/flutter_auth_buttons.dart';
import 'package:fluttie/fluttie.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:pedantic/pedantic.dart';

import '../../models/size_config.dart';
import '../../testepage.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  Usuario novoUsuario;
  var bloc = BlocHome();
  String player_id;

  @override
  initState() {
    super.initState();
    bloc.initOneSignal();
    bloc.getPlayerId().then((result) => player_id = result);
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      body: Stack(
        children: <Widget>[
          Image(
            image: AssetImage("assets/images/contagem.jpg"),
            height: SizeConfig.screenHeight,
            width: SizeConfig.screenWidth,
            fit: BoxFit.cover,
          ),
          Positioned.fill(
              child: Align(
            alignment: Alignment.center,
            child: Container(
              decoration: BoxDecoration(
                boxShadow: [
                  BoxShadow(
                    color: Colors.black87,
                    blurRadius: 10.0,
                    // has the effect o
                    // has the effect of extending the shadow
                    offset: Offset(
                      5.0, // horizontal, move right 10
                      5.0, // vertical, move down 10
                    ),
                  )
                ],
                color: Colors.white,
                borderRadius: BorderRadius.all(Radius.circular(10)),
              ),
              width: SizeConfig.safeBlockHorizontal * 85,
              height: SizeConfig.safeBlockVertical > 7
                  ? SizeConfig.safeBlockVertical * 45
                  : SizeConfig.safeBlockVertical * 60,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Image(
                      height: SizeConfig.blockSizeHorizontal * 40,
                      image: AssetImage("assets/images/defesa_civil.jpg")),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 25),
                    child: GoogleSignInButton(
                      darkMode: true,
                      text: "Fazer login com Google",
                      onPressed: () {
                        showDialog(
                            barrierDismissible: false,
                            context: context,
                            builder: (BuildContext context) {
                              // retorna um objeto do tipo Dialog
                              return dialog("Autenticando", "Autenticando",
                                  carregando: true);
                            });
                        signInWithGoogle().then((result) async {
                          var url = '$REQ/auth/google/login';
                          var response = await http.post(url,
                              headers: {"authorization": "Bearer $token"},
                              body: {"player_id": player_id});
                          var responseDecoded = json.decode(response.body);
                          print(responseDecoded);
                          if (response.statusCode == 200) {
                            novoUsuario =
                                Usuario.fromJson(responseDecoded['usuario']);
                            setCredentials(responseDecoded['api_key']);
                            unawaited(Navigator.of(context).pushAndRemoveUntil(
                                CupertinoPageRoute(
                                    builder: (context) => HomeLogged()),
                                (Route<dynamic> route) => false));
                          } else if (responseDecoded['mensagem'] ==
                              "Usuário não cadastrado") {
                            unawaited(Navigator.of(context).pushAndRemoveUntil(
                                CupertinoPageRoute(
                                    builder: (context) => RegisterPage(
                                        name, email, image, token, player_id)),
                                (Route<dynamic> route) => false));
                          }
                        }).catchError((erro) {
                          Navigator.pop(context);
                          showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return dialog(
                                    "Erro", "Houve um erro ao carregar",
                                icone: Icons.error_outline, cor: Colors.red, botao: true, context: context);
                              });
                          print("ERRO: $erro");
                        });
                      },
                    ),
                  ),
                ],
              ),
            ),
          )),
        ],
      ),
    );
  }

  void setCredentials(String api_key) async {
    SharedPreferences userData;

    userData = await SharedPreferences.getInstance();
    userData.setString("usuario", novoUsuario.toString());
    userData.setString("api_key", api_key);
  }
}

class SignupPage extends StatefulWidget {
  @override
  SignupPageState createState() => SignupPageState();
}

class SignupPageState extends State<SignupPage> {
  var busy = false;
  var done = false;
  FluttieAnimationController animationCtrl;

  @override
  initState() {
    super.initState();
    prepareAnimation();
    animationCtrl.start();
    Timer(Duration(seconds: 3), () {
      Navigator.push(
        context,
        CupertinoPageRoute(
            fullscreenDialog: true, builder: (context) => LoginPage()),
      );
    });
  }

  @override
  dispose() {
    super.dispose();
    animationCtrl?.dispose();
  }

  prepareAnimation() async {
    var instance = Fluttie();

    var checkAnimation =
        await instance.loadAnimationFromAsset("assets/teste.json");

    animationCtrl = await instance.prepareAnimation(
      checkAnimation,
      duration: const Duration(seconds: 2),
      repeatCount: const RepeatCount.dontRepeat(),
      repeatMode: RepeatMode.START_OVER,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
            width: double.infinity,
          ),
          Container(
            height: 300,
            width: 300,
            child: FluttieAnimation(animationCtrl),
          ),
        ],
      ),
    );
  }

  Future<Function> submit() async {
    setState(() {});
    animationCtrl.start();
  }
}
