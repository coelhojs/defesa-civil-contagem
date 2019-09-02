
import 'package:defesa_civil/ui/registerpage.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Google Maps Demo',
      home: RegisterPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}


