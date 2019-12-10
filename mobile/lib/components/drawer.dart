import 'package:defesa_civil/models/size_config.dart';
import 'package:defesa_civil/screens/info.dart';
import 'package:defesa_civil/screens/registered/nupdecpage.dart';
import 'package:defesa_civil/screens/vistoriadores.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class DrawerNav extends StatelessWidget {
  DrawerNav(BuildContext context) {
    SizeConfig().init(context);
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      // Add a ListView to the drawer. This ensures the user can scroll
      // through the options in the drawer if there isn't enough vertical
      // space to fit everything.
      child: ListView(
        // Important: Remove any padding from the ListView.
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            child: Image(
                height: SizeConfig.blockSizeHorizontal * 40,
                image: AssetImage("assets/images/defesa.png")),
            decoration: BoxDecoration(
              color: Colors.white,
            ),
          ),
          ListTile(
            leading: Image(
                height: SizeConfig.blockSizeHorizontal * 8,
                image: AssetImage("assets/images/nupdec.jpg")),
            title: Text('NupDec'),
            onTap: () {
              // Update the state of the app
              // ...
              // Then close the drawer
              Navigator.push(
                context,
                CupertinoPageRoute(
                    fullscreenDialog: true, builder: (context) => NupDec()),
              );
            },
          ),
          ListTile(
            leading: Icon(Icons.people_outline),
            title: Text('Vistoriadores'),
            onTap: () {
              // Update the state of the app
              // ...
              // Then close the drawer
              Navigator.push(
                context,
                CupertinoPageRoute(
                    fullscreenDialog: true,
                    builder: (context) => Vistoriades()),
              );
            },
          ),
          ListTile(
            leading: Icon(Icons.info_outline),
            title: Text('Sobre'),
            onTap: () {
              Navigator.push(
                context,
                CupertinoPageRoute(
                    fullscreenDialog: true, builder: (context) => Info()),
              );
              //Navigator.pop(context);
            },
          ),
        ],
      ),
    );
  }
}
