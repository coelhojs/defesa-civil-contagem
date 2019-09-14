import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../helpers/size_config.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(onPressed: (){}, label: Text("Próximo"),backgroundColor: Color.fromRGBO(246, 129, 33, 1),),
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

            ],
          ),
        ),
      ),
    );
  }
}
