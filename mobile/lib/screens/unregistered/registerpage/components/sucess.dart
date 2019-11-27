import 'dart:async';

import 'package:defesa_civil/models/size_config.dart';
import 'package:defesa_civil/screens/registered/homelogged.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttie/fluttie.dart';

import '../../loginpage.dart';

class RegisterSucess extends StatefulWidget {
  @override
  RegisterSucessState createState() => RegisterSucessState();
}

class RegisterSucessState extends State<RegisterSucess> {
  FluttieAnimationController animationCtrl;
  bool _visible = false;

  @override
  initState() {
    super.initState();
    prepareAnimation().then((value) {
      setState(() {
        animationCtrl.start();
        _visible= !_visible;
        Timer(Duration(seconds: 4), () {
          Navigator.pushAndRemoveUntil(
            context,
            CupertinoPageRoute(builder: (context) => HomeLogged()),
                  (Route<dynamic> route) => false);
        });
      });
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
    return true;
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
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
          AnimatedOpacity(
            opacity: _visible ? 1.0 : 0.0,
            duration: Duration(milliseconds: 1000),
            // The green box must be a child of the AnimatedOpacity widget.
            child: Text(
              "Usuário cadastrado com sucesso",
              style: TextStyle(fontWeight: FontWeight.w500, fontSize: SizeConfig.blockSizeHorizontal * 6),
            )
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
