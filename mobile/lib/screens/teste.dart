import 'package:flutter/material.dart';
import 'package:fluttie/fluttie.dart';

class Teste extends StatefulWidget {
  @override
  _TesteState createState() => _TesteState();
}

class _TesteState extends State<Teste> {
  var busy = false;
  var done = false;
  FluttieAnimationController animationCtrl;

  @override
  initState() {
    super.initState();
    prepareAnimation();
  }

  @override
  dispose() {
    super.dispose();
    animationCtrl?.dispose();
  }

  prepareAnimation() async {
    var instance = Fluttie();

    var checkAnimation =
    await instance.loadAnimationFromAsset("assets/done.json");

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
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Container(
            width: double.infinity,
            alignment: Alignment.center,
          ),
          FluttieAnimation(animationCtrl),
          FlatButton(
            onPressed: submit,
            child: Text("Teste"),
          )
        ],
      ),
    );
  }

  Future<Function> submit() async {
    setState(() {
      busy = true;
    });

    Future.delayed(
      const Duration(seconds: 2),
          () => setState(
            () {
          done = true;
          animationCtrl.start();
        },
      ),
    );
  }
}
