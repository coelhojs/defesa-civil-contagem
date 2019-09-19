import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/feather.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class RelatarIncidente extends StatefulWidget {
  @override
  _RelatarIncidenteState createState() => _RelatarIncidenteState();
}

class _RelatarIncidenteState extends State<RelatarIncidente> {

  Future<List> chamados;

  Future<List> _getChamados() async {
    http.Response response;
    response = await http.get("http://192.168.137.94:3001/chamados");
    return json.decode(response.body);
  }

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(microseconds: 1), () {
      chamados = _getChamados();
    });
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(onPressed: (){}, child: Icon(Feather.getIconData("plus")),),
      body: Container(
        padding: EdgeInsets.all(10),
        child: Column(
          children: <Widget>[
            Text("Chamados", style: TextStyle(fontSize: 20),),
            FutureBuilder(
                future: _getChamados(),
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
                              Text("${snapshot.data[index]['vistoriador']}"),
                              Text("${snapshot.data[index]['status']}"),
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
}
