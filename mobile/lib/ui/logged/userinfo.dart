import 'package:defesa_civil/helpers/size_config.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;


class UserInfo extends StatefulWidget {
  @override
  _UserInfoState createState() => _UserInfoState();
}

class _UserInfoState extends State<UserInfo> {
  String name='Name';
  String email='Email';
  String image='http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png';
  String api_key;
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();

  @override
  void initState() {
    getCredentials();
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      key: _scaffoldKey,
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
            var response = await http.get("http://192.168.43.196:3001/acesso/chamados/foto/5d93e3ff82c43448bc3d1809/1569973249175", headers: {"authorization": "Bearer $api_key"});
            showDialog(context: context,builder: (context){
              return AlertDialog(content: Image.memory(response.bodyBytes),);
            });
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
        api_key = userData.getString('api_key');
      }
    });
  }
}
