import 'dart:convert';

import 'package:defesa_civil/models/size_config.dart';
import 'package:defesa_civil/models/usuario.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/feather.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class UserInfo extends StatefulWidget {

  @override
  _UserInfoState createState() => _UserInfoState();
}

class _UserInfoState extends State<UserInfo>
    with AutomaticKeepAliveClientMixin{

  @override
  bool get wantKeepAlive => true;

  Usuario usuario = Usuario();
  Future imagem;
  String api_key;

  SharedPreferences userData;

  @override
  void initState() {
    getCredentials();
  }

  Future _loadImage() async {
    var response = await http.get(usuario.imagem);
    return response.bodyBytes;
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 15),
        child: SingleChildScrollView(
          child: Column(
            //crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Center(
                  child: Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15),
                ),
                elevation: 3,
                child: Padding(
                  padding: EdgeInsets.fromLTRB(50, 20, 50, 20),
                  child: Column(
                    children: <Widget>[
                      Container(
                        width: double.infinity,
                      ),
                      FutureBuilder(
                        future: _loadImage(),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState != ConnectionState.done)
                            return Container(
                              width: SizeConfig.blockSizeHorizontal * 20,
                              height: SizeConfig.blockSizeHorizontal * 20,
                              child: Center(
                                child: CircularProgressIndicator(),
                              ),
                            );
                          else {
                            return Container(
                              width: SizeConfig.blockSizeHorizontal * 20,
                              height: SizeConfig.blockSizeHorizontal * 20,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                image: DecorationImage(
                                  image: MemoryImage(snapshot.data),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            );
                          }
                        },
                      ),
                      Padding(
                        padding: EdgeInsets.only(top: 10),
                      ),
                      Text(
                        usuario.nome,
                        style: TextStyle(
                            fontSize: SizeConfig.blockSizeHorizontal * 6,
                            fontWeight: FontWeight.bold),
                      ),
                      Text(usuario.email)
                    ],
                  ),
                ),
              )),
              Padding(
                padding: EdgeInsets.symmetric(vertical: 10),
              ),
              Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15),
                ),
                elevation: 3,
                child: Padding(
                  padding: EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: <Widget>[
                      Text(
                        "Dados",
                        style: TextStyle(
                            fontSize: SizeConfig.blockSizeHorizontal * 6,
                            fontWeight: FontWeight.bold),
                      ),
                      _texto("CPF: ", usuario.cpf),
                      _texto("Telefone: ", usuario.telefone)
                    ],
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(vertical: 10),
              ),
              Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15),
                ),
                elevation: 3,
                child: Padding(
                  padding: EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: <Widget>[
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 0),
                        child: Text(
                          "Endereço",
                          style: TextStyle(
                              fontSize: SizeConfig.blockSizeHorizontal * 6,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                      _texto("Logradouro: ", usuario.endereco.logradouro),
                      _texto("Numero: ", usuario.endereco.numero.toString()),
                      _texto("Bairro: ", usuario.endereco.bairro),
                      _texto("Cidade: ", usuario.endereco.cidade),
                      _texto("Estado: ", usuario.endereco.uf),
                      usuario.endereco.complemento.isNotEmpty
                          ? _texto(
                              "Complemento: ", usuario.endereco.complemento)
                          : Container()
                    ],
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20),
                child: Center(
                  child: RaisedButton(
                    onPressed: () {},
                    child: Container(
                      child: Text("Sair"),
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          Position position = await Geolocator()
              .getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
          print(position.toString());
          print(api_key);
        },
        icon: Icon(Feather.getIconData("edit")),
        label: Text(
          "Editar",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.black54,
      ),
    );
  }

  bool showFab = true;

  void showFoatingActionButton(bool value) {
    setState(() {
      showFab = value;
    });
  }

  Widget _texto(String texto1, String texto2) {
    return RichText(
      text: TextSpan(
        style: DefaultTextStyle.of(context).style,
        children: <TextSpan>[
          TextSpan(text: texto1, style: _estiloTextoNegrito()),
          TextSpan(
            text: texto2,
            style: _estiloTexto(),
          ),
        ],
      ),
    );
  }

  _estiloTexto() {
    return TextStyle(
        color: Colors.black54,
        fontSize: SizeConfig.blockSizeHorizontal * 4,
        fontWeight: FontWeight.w500);
  }

  _estiloTextoNegrito() {
    return TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: SizeConfig.blockSizeHorizontal * 4);
  }

  getCredentials() async {
    userData = await SharedPreferences.getInstance();
    setState(() {
      usuario = Usuario.fromJson(jsonDecode(userData.getString('usuario')));
      api_key = userData.getString('api_key');
    });
  }
}
