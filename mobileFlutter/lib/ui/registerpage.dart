import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../size_config.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(246, 129, 33, 1),
        title: Text("Página de cadastro"),
      ),
      backgroundColor: Colors.white,
      body: Container(
        padding: EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[

              Padding(
                padding: EdgeInsets.only(top: 5, bottom: 20),
                child: Image(
                    height: SizeConfig.blockSizeHorizontal * 40,
                    image: AssetImage("assets/images/defesa_civil.jpg")),
              ),
              Align(
                child: Text("Cadastre-se", style: TextStyle(fontSize: SizeConfig.blockSizeHorizontal *8,fontWeight: FontWeight.w500),),
                alignment: Alignment.topLeft,
              ),
              Padding(padding: EdgeInsets.all(10),),
              TextFormField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.person),
                  hintText: 'Digite o nome para login!',
                  labelText: 'Nome:',
                ),
              ),
              Padding(padding: EdgeInsets.all(20),),
              TextFormField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.lock),
                  labelText: 'Senha:',
                ),
                obscureText: true,
              ),
              Padding(padding: EdgeInsets.all(10),),
              Align(
                child: FlatButton(
                  child: Container(
                    height: SizeConfig.blockSizeVertical*5,
                    width: SizeConfig.blockSizeHorizontal*25,
                    decoration: BoxDecoration(
                      color: Colors.green,
                      borderRadius: BorderRadius.all(Radius.circular(10)),
                    ),
                    child: Center(
                      child: Text("Cadastrar", style: TextStyle(color: Colors.white, fontSize: SizeConfig.blockSizeHorizontal * 4),),
                    ),
                  ),
                ),
                alignment: Alignment.bottomRight,
              ),
            ],
          ),
        ),
      ),
    );
  }

}
