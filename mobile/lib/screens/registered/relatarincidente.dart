import 'dart:async';

import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/models/size_config.dart';
import 'package:defesa_civil/screens/registered/detalhesaviso/detalhesaviso.dart';
import 'package:defesa_civil/screens/registered/criaraviso/registraraviso.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_icons/feather.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class RelatarIncidente extends StatefulWidget {

  @override
  _RelatarIncidenteState createState() => _RelatarIncidenteState();
}

class _RelatarIncidenteState extends State<RelatarIncidente>
    with AutomaticKeepAliveClientMixin{

  @override
  bool get wantKeepAlive => true;

  SharedPreferences userData;
  String api_key;
  Future<List> avisos;
  final GlobalKey<RefreshIndicatorState> _refreshIndicatorKey =
      GlobalKey<RefreshIndicatorState>();

  Future<List> _getAvisos() async {
    http.Response response;
      response = await http.get("$REQ/app/avisos",
        headers: {"authorization": "Bearer $api_key"});
    print(response.body);

    return json.decode(response.body);
  }

  Future _loadImage(String url) async {
    var response = await http
        .get("$REQ$url", headers: {"authorization": "Bearer $api_key"});
    return response.bodyBytes;
  }

  @override
  void initState() {
    super.initState();
    getCredentials();
    Future.delayed(const Duration(microseconds: 1), () {
      avisos = _getAvisos();
    });
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.orange,
        onPressed: () {
           Navigator.of(context).push(
              CupertinoPageRoute(fullscreenDialog:true, builder: (context) => RegistroAviso(api_key)));
        },
        child: Icon(Feather.getIconData("plus")),
      ),
      body: Container(
        padding: EdgeInsets.all(10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              "Avisos",
              style: TextStyle(
                  fontSize: SizeConfig.blockSizeHorizontal * 6,
                  fontWeight: FontWeight.bold),
            ),
            FutureBuilder(
                future: avisos,
                builder: (context, snapshot) {
                  if (snapshot.connectionState != ConnectionState.done) {
                    return _carregandoIncidentes();
                  } else if (snapshot.hasError) {
                    return _textoCentralizado("Houve um erro ao carregar :(");
                  } else {
                    return _createListaIncidente(snapshot);
                  }
                })
          ],
        ),
      ),
    );
  }

  Widget _createListaIncidente(AsyncSnapshot snapshot) {
    print(snapshot.data.length);
    return snapshot.data.length > 0
        ? Expanded(
            child: RefreshIndicator(
              key: _refreshIndicatorKey,
              onRefresh: _refresh,
              child: ListView.builder(
                  itemCount: snapshot.data.length,
                  itemBuilder: (context, index) {
                    return GestureDetector(
                      onTap: () {
                        Navigator.push(context,CupertinoPageRoute(builder: (context) => DetalhesAviso(snapshot.data[index]['id'])));
                      },
                      child: Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15),
                        ),
                        elevation: 3,
                        child: Padding(
                          padding: EdgeInsets.all(0),
                          child: Row(
                            children: <Widget>[
                              FutureBuilder(
                                future: _loadImage(
                                    snapshot.data[index]['fotos'][0]['url']),
                                builder: (context, snapshot) {
                                  if (snapshot.connectionState !=
                                      ConnectionState.done) {
                                    return Container(
                                      width:
                                          SizeConfig.blockSizeHorizontal * 20,
                                      height:
                                          SizeConfig.blockSizeHorizontal * 20,
                                      child: Center(
                                        child: CircularProgressIndicator(),
                                      ),
                                    );
                                  } else {
                                    return Container(
                                        width:
                                            SizeConfig.blockSizeHorizontal * 20,
                                        height:
                                            SizeConfig.blockSizeHorizontal * 20,
                                        child: ClipRRect(
                                          borderRadius: BorderRadius.only(
                                            topLeft: Radius.circular(15),
                                            bottomLeft: Radius.circular(15),
                                          ),
                                          child: Image.memory(
                                            snapshot.data,
                                            fit: BoxFit.fill,
                                          ),
                                        ));
                                  }
                                },
                              ),
                              Padding(
                                padding: EdgeInsets.only(left: 20),
                              ),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: <Widget>[
                                    Text(
                                      "${snapshot.data[index]['tipo']}",
                                      style:
                                      TextStyle(fontWeight: FontWeight.bold),
                                    ),
                                    Text("${snapshot.data[index]['descricao']}", overflow: TextOverflow.ellipsis,
                                      maxLines: 1,
                                      softWrap: false,),
                                  ],
                                ),
                              )
                            ],
                          ),
                        ),
                      ),
                    );
                  }),
            ),
          )
        : _textoCentralizado("Nenhum aviso relatado!");
  }

  Widget _textoCentralizado(String text) {
    return Expanded(
      child: Container(
        alignment: Alignment.center,
        child: RefreshIndicator(
          onRefresh: _refresh,
          child: ListView(
            shrinkWrap: true,
            children: <Widget>[
              Container(
                //width: 200,
                height: SizeConfig.blockSizeVertical > 6
                    ? SizeConfig.blockSizeVertical * 70
                    : SizeConfig.blockSizeVertical * 60,
                alignment: Alignment.center,
                child: Text(
                  text,
                  style: TextStyle(
                      fontSize: SizeConfig.safeBlockHorizontal * 5,
                      color: Colors.black87),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _carregandoIncidentes() {
    return Expanded(
        child: Stack(
      children: <Widget>[
        Positioned.fill(
          child: Align(
            child: Text(
              "Carregando avisos...",
              style: TextStyle(
                  color: Colors.black54,
                  fontSize: SizeConfig.blockSizeHorizontal * 4),
            ),
            alignment: Alignment.topLeft,
          ),
        ),
        Positioned.fill(
          child: Align(
              alignment: Alignment.center, child: CircularProgressIndicator()),
        )
      ],
    ));
  }

  Future _refresh() {
    setState(() {
      avisos = _getAvisos();
    });
    return avisos;
  }

  void getCredentials() async {
    userData = await SharedPreferences.getInstance();
    setState(() {
      api_key = userData.getString('api_key');
    });
  }
}
