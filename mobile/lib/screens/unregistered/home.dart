import 'package:defesa_civil/screens/mappage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/feather.dart';

import 'loginpage.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final List<Widget> pages = [
    MapPage(),
    LoginPage()
  ];
  final pageController = PageController();
  int _selectedIndex = 0;

  Widget _bottomNavigationBar(int selectedIndex) => BottomNavigationBar(
    onTap: (int index) => pageController.jumpToPage(index),
    selectedItemColor: Color.fromRGBO(246, 129, 33, 1),
    currentIndex: selectedIndex,
    items: <BottomNavigationBarItem>[
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
  );

  void onPageChanged(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(246, 129, 33, 1),
        title: Text('Defesa Civil de Contagem'),
      ),
      body: PageView(
        controller: pageController,
        onPageChanged: onPageChanged,
        children: pages,
        physics: NeverScrollableScrollPhysics(), // No sliding
      ),
      bottomNavigationBar: _bottomNavigationBar(_selectedIndex)
    );
  }
}
