import 'dart:async';

import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/ui/logged/registraraviso.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/feather.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class RelatarIncidente extends StatefulWidget {
  @override
  _RelatarIncidenteState createState() => _RelatarIncidenteState();
}

class _RelatarIncidenteState extends State<RelatarIncidente> {
  SharedPreferences userData;
  String api_key;
  Future chamados;

  Future _getChamados() async {
    http.Response response;
    response = await http.get("$REQ/acesso/chamados", headers: {"authorization": "Bearer $api_key"});
    return json.decode(response.body);
  }

  @override
  void initState() {
    super.initState();
    getCredentials();
    Future.delayed(const Duration(microseconds: 1), () {
      chamados = _getChamados();
    });
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(backgroundColor: Colors.orange,onPressed: (){
        Navigator.of(context).push(
            MaterialPageRoute(builder: (context) => RegistroAviso(api_key)));
      }, child: Icon(Feather.getIconData("plus")),),
      body: Container(
        padding: EdgeInsets.all(10),
        child: Column(
          children: <Widget>[
            Text("Chamados", style: TextStyle(fontSize: 20),),
            FutureBuilder(
                future: chamados,
                builder: (context, snapshot) {
                  if (snapshot.connectionState != ConnectionState.done)
                    return Text("Carregando chamados...");
                  if (snapshot.hasError) {
                    return Text(
                        "Houve um erro ao carregar.");
                  } else {
                    return Expanded(
                      child: ListView.builder(itemCount: snapshot.data.length,itemBuilder: (context,index){
                        return Card(
                          child: Column(
                            children: <Widget>[
                              Text("${snapshot.data[index]['descricao']}"),
                              Text("${snapshot.data[index]['tipo']}"),
                            ],
                          ),
                        );
                      }),
                    );
                  }
                })
          ],
        ),
      ),
    );
  }

  getCredentials() async {
    userData = await SharedPreferences.getInstance();
    setState(() {
      api_key = userData.getString('api_key');
    });
  }
}
