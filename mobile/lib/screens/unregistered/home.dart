import 'package:defesa_civil/screens/mappage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/feather.dart';

import 'loginpage.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int _currentIndex = 0;
  final List<Widget> _children = [MapPage(), LoginPage()];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(246, 129, 33, 1),
        title: Text('Defesa Civil de Contagem'),
      ),
      body: _children[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        selectedItemColor: Color.fromRGBO(246, 129, 33, 1),
        currentIndex: _currentIndex, //
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        }, // this will be set when a new tab is tapped
        items: [
          BottomNavigationBarItem(
            icon: Icon(Feather.getIconData("map")),
            title: Text(
              'Areas',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
          BottomNavigationBarItem(
            icon: Icon(Feather.getIconData("user")),
            title: Text(
              'Login',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
        ],
      ),
    );
  }
}
