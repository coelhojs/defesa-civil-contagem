import 'package:defesa_civil/screens/unregistered/home.dart';
import 'package:defesa_civil/theme/theme.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Google Maps Demo',
      home: Home(0),
      theme: theme(),
      debugShowCheckedModeBanner: false,
    );
  }
}
