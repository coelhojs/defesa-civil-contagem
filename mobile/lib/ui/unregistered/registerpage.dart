import 'dart:convert';

import 'package:defesa_civil/helpers/cepvalidator.dart';
import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/ui/logged/homelogged.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_masked_text/flutter_masked_text.dart';
import 'package:meta/meta.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

import '../../helpers/size_config.dart';

class RegisterPage extends StatefulWidget {
  String name;
  String email;
  String image;
  String token;

  @override
  _RegisterPageState createState() =>
      _RegisterPageState(name, email, image, token);

  RegisterPage(this.name, this.email, this.image, this.token);
}

class _RegisterPageState extends State<RegisterPage>
    with SingleTickerProviderStateMixin {
  TabController _tabController;
  SharedPreferences userData;
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  var cepController = new MaskedTextController(mask: '00000-000');
  var cpfController = new MaskedTextController(mask: '000.000.000-00');
  var telController = new MaskedTextController(mask: '(00)00000-0000');
  GlobalKey<FormState> _keyValidaForm1 = GlobalKey<FormState>();
  GlobalKey<FormState> _keyValidaForm2 = GlobalKey<FormState>();
  FocusNode focusTel = FocusNode();
  String next = "Proximo";
  String name;
  String email;
  String image;
  String token;
  int _enderecoState = 0;
  String endereco = "CEP Inválido";

  _RegisterPageState(this.name, this.email, this.image, this.token);

  @override
  void initState() {
    super.initState();
    _tabController = new TabController(vsync: this, length: 2);
    getCredentials();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        key: _scaffoldKey,
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () async {
            if (_tabController.index == 0) {
              if (_keyValidaForm1.currentState.validate()) {
                _tabController.animateTo(_tabController.index + 1);
                setState(() => next = "Cadastrar");
              }
            } else if (_tabController.index == 1) {
              if (_keyValidaForm2.currentState.validate()) {
                var url = '$REQ/auth/cadastro';
                var response = await http.post(url, headers: {
                  "authorization": "Bearer $token"
                }, body: {
                  "tipo": "Usuário",
                  "nome": name,
                  "telefone": telController.text,
                  "cpf": cpfController.text,
                  "email": email,
                  "endereco": cepController.text
                });
                print('Response status: ${response.statusCode}');
                //var responseDecoded = json.decode(response.body);
                print('Response body: ${response.body}');
                setCredentials();
                /*Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(builder: (context) => HomeLogged()),
                    (Route<dynamic> route) => false);*/
              }
            }
          },
          label: Text(next),
          backgroundColor: Color.fromRGBO(246, 129, 33, 1),
        ),
        appBar: AppBar(
          backgroundColor: Color.fromRGBO(246, 129, 33, 1),
          title: Text("Página de cadastro"),
        ),
        backgroundColor: Colors.white,
        body: TabBarView(
          controller: _tabController,
          physics: NeverScrollableScrollPhysics(),
          children: <Widget>[
            Form(
              key: _keyValidaForm1,
              child: Container(
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
                        onChanged: (value) {
                          if (value.length == 14)
                            FocusScope.of(context).requestFocus(focusTel);
                        },
                        autofocus: true,
                        controller: cpfController,
                        maxLength: 14,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          counterText: '',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.assignment_ind),
                          labelText: 'CPF:',
                        ),
                        validator: (value) {
                          if (value.isEmpty)
                            return "Insira o CPF";
                          else if (value.length != 14)
                            return "O tamanho do CPF são 11 dígitos";
                          else if (!validarCPF(
                              value.replaceAll('.', '').replaceAll('-', '')))
                            return "CPF Inválido";
                        },
                      ),
                      Padding(
                        padding: EdgeInsets.all(10),
                      ),
                      TextFormField(
                        focusNode: focusTel,
                        controller: telController,
                        maxLength: 14,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          counterText: '',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.phone),
                          labelText: 'Telefone:',
                        ),
                        validator: (value) {
                          if (value.isEmpty)
                            return "Insira o Telefone";
                          else if (value.length != 14)
                            return "O tamanho do telefone são 11 dígitos";
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Form(
              key: _keyValidaForm2,
              child: Container(
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
                        onChanged: (value) async {
                          if (value.length == 9) {
                            setState(() {
                              _enderecoState = 1;
                            });
                            var url =
                                'https://viacep.com.br/ws/${value.replaceAll('-', '')}/json/';
                            var response = await http.get(url);
                            print('Response status: ${response.statusCode}');
                            var responseDecoded = json.decode(response.body);
                            print('Response body: ${response.body}');
                            if (responseDecoded['logradouro'] != null)
                              endereco = responseDecoded['logradouro'];
                            else
                              endereco = "CEP não encontrado";
                            setState(() {
                              _enderecoState = 2;
                            });
                          }
                        },
                        maxLength: 9,
                        controller: cepController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          counterText: '',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.location_on),
                          labelText: 'CEP:',
                        ),
                        validator: (value) {
                          if (value.isEmpty)
                            return "Insira o CEP";
                          else if (value.length != 9)
                            return "O tamanho do CEP são 8 dígitos";
                          else if(endereco == "CEP não encontrado")
                            return "CEP não encontrado";
                        },
                      ),
                      Padding(
                        padding: EdgeInsets.all(10),
                      ),
                      _createEndereco()
                    ],
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _createEndereco() {
    if (_enderecoState == 0)
      return Container(
        child: Column(
          children: <Widget>[
            Text("Rua: Teste"),
            Text("Bairro: Gloria"),
            Text("Municipio: BH"),
            Text("UF: MG")
          ],
        ),
      );
    else if (_enderecoState == 1) {
      return CircularProgressIndicator();
    } else if (_enderecoState == 2) {
      return Text(endereco);
    }
  }

  setCredentials() async {
    userData.setString("name", name);
    userData.setString("email", email);
    userData.setString("image", image);
    userData.setString("endereco", cepController.text);
    userData.setString("telefone", telController.text);
    userData.setString("cpf", cpfController.text);
  }

  getCredentials() async {
    userData = await SharedPreferences.getInstance();
  }
}
