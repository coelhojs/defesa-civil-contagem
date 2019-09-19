import 'package:defesa_civil/helpers/size_config.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';


class UserInfo extends StatefulWidget {
  @override
  _UserInfoState createState() => _UserInfoState();
}

class _UserInfoState extends State<UserInfo> {
  String name='Name';
  String email='Email';
  String image='http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png';

  @override
  void initState() {
    getCredentials();
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      body: Container(
        child: Column(
          children: <Widget>[
            Text(name),
            Text(email),
            Container(
              height: SizeConfig.blockSizeHorizontal *20,
              child: Image.network(
                image,
              ),
            )
          ],
        ),
      ),
      floatingActionButton:
          FloatingActionButton.extended(onPressed: () async{
            SharedPreferences userData = await SharedPreferences.getInstance();
            print(userData.getString("name"));
            userData.clear();
            //print(name);
          }, label: Text("Testee", style: TextStyle(color: Colors.white),),
          backgroundColor: Colors.black54,),
    );
  }

  getCredentials()async {
    SharedPreferences userData = await SharedPreferences.getInstance();
    setState(() {
      if(userData.getString("name") != null) {
        name = userData.getString("name");
        email = userData.getString("email");
        image = userData.getString("image");
      }
    });
  }
}
