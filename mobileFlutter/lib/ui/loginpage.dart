import 'package:defesa_civil/ui/registerpage.dart';
import 'package:flutter/material.dart';

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
      body: Column(
        children: <Widget>[
          RaisedButton(
            child: Container(
              height: SizeConfig.blockSizeHorizontal *10,
              width: SizeConfig.blockSizeVertical * 30,
              child: Center(
                child: Text("Fazer cadastro"),
              ),
            ),
            onPressed: (){
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => RegisterPage()),
              );
            },
          )
        ],
      ),
    );
  }
}
