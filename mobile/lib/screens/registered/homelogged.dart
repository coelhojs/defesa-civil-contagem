import 'package:defesa_civil/screens/registered/relatarincidente.dart';
import 'package:defesa_civil/screens/registered/userinfo.dart';
import 'package:defesa_civil/screens/mappage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/feather.dart';

class HomeLogged extends StatefulWidget {
  @override
  _HomeLoggedState createState() => _HomeLoggedState();
}

class _HomeLoggedState extends State<HomeLogged> {
  final List<Widget> pages = [MapPage(), RelatarIncidente(), UserInfo()];
  final pageController = PageController();
  int _selectedIndex = 0;

  Widget _bottomNavigationBar(int selectedIndex) => BottomNavigationBar(
        onTap: (int index) => pageController.jumpToPage(index),
        selectedItemColor: Color.fromRGBO(246, 129, 33, 1),
        currentIndex: selectedIndex,
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            activeIcon: Icon(
              Feather.getIconData("map"),
              color: Color.fromRGBO(246, 129, 33, 1),
            ),
            icon: Icon(
              Feather.getIconData("map"),
            ),
            title: Text(
              'Areas',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
          BottomNavigationBarItem(
            activeIcon: Icon(
              Feather.getIconData("message-square"),
              color: Color.fromRGBO(246, 129, 33, 1),
            ),
            icon: Icon(
              Feather.getIconData("message-square"),
            ),
            title: Text(
              'Relatar',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
          BottomNavigationBarItem(
            icon: Icon(Feather.getIconData("user")),
            title: Text(
              'Info',
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
        bottomNavigationBar: _bottomNavigationBar(_selectedIndex));
  }
}
