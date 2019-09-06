import 'package:defesa_civil/ui/loginpage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

import '../sign_in.dart';
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
        padding: EdgeInsets.fromLTRB(10, 0, 10, 10),
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(bottom: 0),
                child: Image(
                    height: SizeConfig.blockSizeHorizontal * 40,
                    image: AssetImage("assets/images/defesa_civil.jpg")),
              ),
              Align(
                child: Text(
                  "Cadastre-se",
                  style: TextStyle(
                      fontSize: SizeConfig.blockSizeHorizontal * 7,
                      fontWeight: FontWeight.w500),
                ),
                alignment: Alignment.topLeft,
              ),
              Padding(
                padding: EdgeInsets.all(10),
              ),
              _signInButton(),
              Padding(
                padding: EdgeInsets.all(10),
              ),
              TextFormField(
                maxLength: 11,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.assignment_ind),
                  labelText: 'CPF:',
                ),
              ),
              Padding(
                padding: EdgeInsets.all(5),
              ),
              TextFormField(
                maxLength: 11,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.phone),
                  labelText: 'Telefone:',
                ),
              ),
              Align(
                alignment: Alignment.topLeft,
                child: Text("Endereço"),
              ),
              Padding(
                padding: EdgeInsets.all(3),
              ),
              TextFormField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.streetview),
                  labelText: 'Rua:',
                ),
              ),
              Padding(
                padding: EdgeInsets.all(3),
              ),
              TextFormField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.streetview),
                  labelText: 'Nº:',
                ),
              ),
              Padding(
                padding: EdgeInsets.all(3),
              ),
              TextFormField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.streetview),
                  labelText: 'Bairro:',
                ),
              ),
              Padding(
                padding: EdgeInsets.all(3),
              ),
              TextFormField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.streetview),
                  labelText: 'Cidade:',
                ),
              ),
              Padding(
                padding: EdgeInsets.all(3),
              ),
              TextFormField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.streetview),
                  labelText: 'CEP:',
                ),
              ),
              Padding(
                padding: EdgeInsets.all(3),
              ),
              TextFormField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.streetview),
                  labelText: 'Complemento:',
                ),
              ),
              Padding(
                padding: EdgeInsets.all(10),
              ),
              Align(
                child: FlatButton(
                  child: Container(
                    height: SizeConfig.blockSizeVertical * 7,
                    width: SizeConfig.blockSizeHorizontal * 25,
                    decoration: BoxDecoration(
                      color: Colors.green,
                      borderRadius: BorderRadius.all(Radius.circular(10)),
                    ),
                    child: Center(
                      child: Text(
                        "Cadastrar",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: SizeConfig.blockSizeHorizontal * 4),
                      ),
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

  Widget _signInButton() {
    return OutlineButton(
      splashColor: Colors.grey,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(40)),
      highlightElevation: 0,
      borderSide: BorderSide(color: Colors.grey),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image(image: AssetImage("assets/images/google.jpg"), height: 35.0),
            Padding(
              padding: const EdgeInsets.only(left: 10),
              child: Text(
                'Sign in with Google',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.grey,
                ),
              ),
            )
          ],
        ),
      ),
      onPressed: () {
        signInWithGoogle().whenComplete(() {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) {
                return LoginPage();
              },
            ),
          );
        });
      },
    );
  }
}
