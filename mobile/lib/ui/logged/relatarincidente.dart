import 'dart:async';

import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/helpers/size_config.dart';
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
    var decod = json.decode(response.body);
    print(decod);
    return json.decode(response.body);
  }

  Future _loadImage(String url) async {
    print("$REQ$url");
    var response = await http.get("$REQ$url", headers: {"authorization": "Bearer $api_key"});
    //var responseDecoded = json.decode(response.body);

    //print(response.bodyBytes);
    return response.bodyBytes;
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
    SizeConfig().init(context);
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
                          child: Padding(
                            padding: EdgeInsets.all(10),
                            child: Row(
                              children: <Widget>[
                                FutureBuilder(
                                  future: _loadImage(snapshot.data[index]['fotos'][0]['url']),
                                  builder: (context,snapshot){
                                    if (snapshot.connectionState != ConnectionState.done)
                                      return Container(
                                          width: SizeConfig.blockSizeHorizontal*20,
                                          height: SizeConfig.blockSizeHorizontal*20,
                                        child: Center(child: CircularProgressIndicator(),),
                                      );
                                    else{
                                      //print(snapshot.data);
                                      return Container(
                                        width: SizeConfig.blockSizeHorizontal*20,
                                        height: SizeConfig.blockSizeHorizontal*20,
                                        decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          image: DecorationImage(image: MemoryImage(snapshot.data), fit: BoxFit.cover,),

                                        ),
                                      );
                                    }
                                  },
                                ),
                                Padding(padding: EdgeInsets.only(left: 10),),
                                Column(
                                  children: <Widget>[
                                    Text("${snapshot.data[index]['tipo']}"),
                                    Text("${snapshot.data[index]['descricao']}"),

                                  ],
                                ),
                              ],
                            ),
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
