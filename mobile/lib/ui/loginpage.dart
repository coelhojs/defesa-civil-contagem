import 'package:defesa_civil/ui/registerpage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_auth_buttons/flutter_auth_buttons.dart';
import 'package:flutter_icons/feather.dart';

import '../sign_in.dart';
import '../size_config.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
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
                  signInWithGoogle().then((result){
                    print(name);
                    print("RESULTADOOOOOOOOOOO"+result);
                  }).catchError((erro){
                    print("ERRO");
                  });
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _signInButton() {
    return OutlineButton(
      splashColor: Colors.grey,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(40)),
      highlightElevation: 0,
      borderSide: BorderSide(color: Colors.grey),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image(
                image: AssetImage("assets/images/google.jpg"),
                height: SizeConfig.blockSizeHorizontal * 8),
            Padding(
              padding: const EdgeInsets.only(left: 10),
              child: Text(
                'Fazer login com Google',
                style: TextStyle(
                  fontSize: SizeConfig.blockSizeHorizontal * 4.5,
                  color: Colors.grey,
                ),
              ),
            )
          ],
        ),
      ),
      onPressed: () async {
        signInWithGoogle().whenComplete(() {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) {
                return LoginPage();
              },
            ),
          );
        });
      },
    );
  }
}
