import 'package:flutter/material.dart';
import 'package:fluttie/fluttie.dart';
import 'package:url_launcher/url_launcher.dart';

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

  final String lat = "47.3230";
  final String lng = "-142.0212";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Container(
        child: ListTile(
          title: Text("Open Maps"),
          onTap: () async {
            // Here we are supplying the variables that we've created above
            final String googleMapsUrl = "https://waze.com/ul";
            final String appleMapsUrl = "https://waze.com/ul";

            if (await canLaunch(googleMapsUrl)) {
              await launch(googleMapsUrl);
            }
            if (await canLaunch(appleMapsUrl)) {
              await launch(appleMapsUrl, forceSafariVC: false);
            } else {
              throw "Couldn't launch URL";
            }
          },
        ),
      )
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
