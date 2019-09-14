import 'package:defesa_civil/helpers/sign_in.dart';
import 'package:defesa_civil/ui/logged/homelogged.dart';
import 'package:defesa_civil/ui/unregistered/registerpage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_auth_buttons/flutter_auth_buttons.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../helpers/size_config.dart';


class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool sucess=true;

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
                  showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        // retorna um objeto do tipo Dialog
                        return AlertDialog(
                          title: new Text("Autenticando"),
                          content: Row(
                            children: <Widget>[
                              CircularProgressIndicator(
                                valueColor: AlwaysStoppedAnimation<Color>(Color.fromRGBO(246, 129, 33, 1)),

                              ),
                              Padding(
                                padding: EdgeInsets.symmetric(horizontal: 10),
                              ),
                              Text("Autenticando")
                            ],
                          ),
                        );
                      }
                  );
                  signInWithGoogle().then((result){

                      if(sucess){
                        setCredentials(name,email,image);
                        Navigator.of(context).pushAndRemoveUntil(
                          MaterialPageRoute(builder: (context) => HomeLogged()),(Route<dynamic> route) => false);
                      }
                      else{
                        Navigator.of(context).pushAndRemoveUntil(
                            MaterialPageRoute(builder: (context) => RegisterPage()),(Route<dynamic> route) => false);
                      }
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

  setCredentials(String name, String email, String image) async {
    SharedPreferences userData = await SharedPreferences.getInstance();
    userData.setString("name", name);
    userData.setString("email", email);
    userData.setString("image", image);
  }
}
