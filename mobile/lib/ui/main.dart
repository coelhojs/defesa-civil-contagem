import 'package:defesa_civil/ui/logged/userinfo.dart';
import 'package:defesa_civil/ui/unregistered/loginpage.dart';
import 'package:defesa_civil/ui/unregistered/registerpage.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Google Maps Demo',
      home: LoginPage(),
      theme: ThemeData(fontFamily: 'Uber',),
      debugShowCheckedModeBanner: false,
    );
  }
}


