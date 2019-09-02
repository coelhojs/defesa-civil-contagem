
import 'package:defesa_civil/ui/home.dart';
import 'package:defesa_civil/ui/registerpage.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Google Maps Demo',
      home: Home(),
      theme: ThemeData(fontFamily: 'Uber'),
      debugShowCheckedModeBanner: false,
    );
  }
}


