import 'package:defesa_civil/ui/logged/relatarincidente.dart';
import 'package:defesa_civil/ui/logged/userinfo.dart';
import 'package:defesa_civil/ui/mappage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/feather.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeLogged extends StatefulWidget {
  @override
  _HomeLoggedState createState() => _HomeLoggedState();
}

class _HomeLoggedState extends State<HomeLogged> {

  @override
  void initState() {
    getCredentials();
  }

  int _currentIndex = 0;
  final List<Widget> _children = [MapPage(), RelatarIncidente(),UserInfo()];

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
            activeIcon: Icon(Feather.getIconData("map"), color: Color.fromRGBO(246, 129, 33, 1),),
            icon: new Icon(Feather.getIconData("map"),),

            title: new Text(
              'Areas',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
          BottomNavigationBarItem(
            activeIcon: Icon(Feather.getIconData("message-square"), color: Color.fromRGBO(246, 129, 33, 1),),
            icon: new Icon(Feather.getIconData("message-square"),),

            title: new Text(
              'Relatar',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
          BottomNavigationBarItem(
            icon: new Icon(Feather.getIconData("user")),
            title: new Text(
              'Info',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
        ],
      ),
    );
  }

  getCredentials()async {
    SharedPreferences userData = await SharedPreferences.getInstance();
  }
}
