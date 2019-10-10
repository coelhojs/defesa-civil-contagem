import 'dart:convert';

import 'package:defesa_civil/helpers/cepvalidator.dart';
import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/helpers/usuario.dart';
import 'package:defesa_civil/ui/logged/homelogged.dart';
import 'package:dio/dio.dart';
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
  SharedPreferences userData;
  TabController _tabController;

  Usuario novoUsuario;
  Endereco enderecoUsuario = Endereco();
  Map<String, dynamic> detalhesEndereco = {};

  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();

  MaskedTextController cepController = MaskedTextController(mask: '00000-000');
  MaskedTextController cpfController =
      MaskedTextController(mask: '000.000.000-00');
  MaskedTextController telController =
      MaskedTextController(mask: '(00)00000-0000');
  TextEditingController numController = TextEditingController();
  TextEditingController complementoController = TextEditingController();

  GlobalKey<FormState> _keyValidaForm1 = GlobalKey<FormState>();
  GlobalKey<FormState> _keyValidaForm2 = GlobalKey<FormState>();

  FocusNode focusTel = FocusNode();
  FocusNode focusNum = FocusNode();
  FocusNode focusComplemento = FocusNode();

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
    //_tabController.animateTo(1);
    getCredentials();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<Map<String, dynamic>> _registrarUsuario(Map dados) async {
    var response;
    var url = '$REQ/auth/google/cadastro';
    Dio dio = new Dio();
    response = await dio
        .post(url,
            data: jsonEncode(dados),
            options: Options(headers: {"authorization": "Bearer $token"}))
        .then((sucess) {
      return sucess.data;
    }).catchError((e) {
      return e.response.data;
    });

    return response;
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
              if (_keyValidaForm2.currentState.validate() &&
                  detalhesEndereco['logradouro'] != 'CEP não encontrado') {
                detalhesEndereco['numero'] = int.parse(numController.text);
                detalhesEndereco['complemento'] = complementoController.text;
                novoUsuario = Usuario.fromJson({
                  "nome": name,
                  "email": email,
                  "imagem": image,
                  "cpf": cpfController.text,
                  "endereco": detalhesEndereco,
                  "telefone": telController.text,
                  "tipo": "Usuário",
                });
                showDialog(
                    barrierDismissible: false,
                    context: context,
                    builder: (context) {
                      return FutureBuilder(
                        future: _registrarUsuario(novoUsuario.toJson()),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState != ConnectionState.done)
                            return AlertDialog(
                              title: Text("Registrando"),
                              content: Row(
                                children: <Widget>[
                                  CircularProgressIndicator(
                                    valueColor: AlwaysStoppedAnimation<Color>(
                                        Color.fromRGBO(246, 129, 33, 1)),
                                  ),
                                  Padding(
                                    padding:
                                        EdgeInsets.symmetric(horizontal: 10),
                                  ),
                                  Text("Registrando novo usuário")
                                ],
                              ),
                            );
                          if (snapshot.hasError) {
                            return AlertDialog(
                              title: Text("Erro"),
                              content: Row(
                                children: <Widget>[
                                  Icon(
                                    Icons.close,
                                    color: Colors.red,
                                    size: 40,
                                  ),
                                  Padding(
                                    padding:
                                        EdgeInsets.symmetric(horizontal: 10),
                                  ),
                                  Text("Houve um erro ao registrar")
                                ],
                              ),
                            );
                          } else {
                            if (snapshot.data['api_key'] != null) {
                              setCredentials(snapshot.data['api_key']);
                              print(userData.getString('api_key'));
                              print(snapshot.data['api_key']);
                            }
                            return snapshot.data['api_key'] != null
                                ? _sucessFail(true)
                                : _sucessFail(false);
                          }
                        },
                      );
                    });

                /*var url = '$REQ/auth/google/cadastro';
                var response = await http.post(url,
                    headers: {"authorization": "Bearer $token"},
                    body: jsonEncode(novoUsuario.toJson()));
                var responseDecoded = json.decode(response.body);

                if (response.statusCode == 200) {
                  setCredentials(responseDecoded['api_key']);
                  Navigator.of(context).pushAndRemoveUntil(
                      MaterialPageRoute(builder: (context) => HomeLogged()),
                      (Route<dynamic> route) => false);
                } else if (responseDecoded['mensagem'] ==
                    'Usuário já cadastrado') {
                  _scaffoldKey.currentState.showSnackBar(new SnackBar(
                    content: new Text("Usuário já está cadastrado"),
                    duration: Duration(seconds: 3),
                    backgroundColor: Colors.red,
                  ));
                }*/
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
                            detalhesEndereco['logradouro'] =
                                "CEP não encontrado";
                            var url =
                                'https://viacep.com.br/ws/${value.replaceAll('-', '')}/json/';
                            var response = await http.get(url);
                            print('Response status: ${response.statusCode}');
                            var responseDecoded = json.decode(response.body);
                            print('Response body: ${response.body}');
                            if (responseDecoded['logradouro'] != null) {
                              detalhesEndereco = {
                                "cep": responseDecoded['cep'],
                                "logradouro": responseDecoded['logradouro'],
                                "bairro": responseDecoded['bairro'],
                                "cidade": responseDecoded['localidade'],
                                "uf": responseDecoded['uf'],
                              };
                            } else if (responseDecoded['erro'])
                              detalhesEndereco['logradouro'] =
                                  "CEP não encontrado";
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
                          else if (endereco == "CEP não encontrado")
                            return "CEP não encontrado";
                        },
                      ),
                      Padding(
                        padding: EdgeInsets.all(10),
                      ),
                      Row(
                        children: <Widget>[
                          Container(
                              width: SizeConfig.blockSizeHorizontal * 65,
                              child: TextFormField(
                                focusNode: focusComplemento,
                                controller: complementoController,
                                maxLength: 6,
                                keyboardType: TextInputType.text,
                                decoration: const InputDecoration(
                                  counterText: '',
                                  border: OutlineInputBorder(),
                                  prefixIcon: Icon(Icons.chevron_right),
                                  labelText: 'Complemento:',
                                ),
                              )),
                          Padding(
                            padding: EdgeInsets.all(10),
                          ),
                          Expanded(
                            child: TextFormField(
                              focusNode: focusNum,
                              controller: numController,
                              maxLength: 6,
                              keyboardType: TextInputType.number,
                              decoration: const InputDecoration(
                                counterText: '',
                                border: OutlineInputBorder(),
                                labelText: 'Nº:',
                              ),
                              validator: (value) {
                                if (value.isEmpty) return "Insira o número";
                              },
                            ),
                          ),
                        ],
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
      return Text(detalhesEndereco['logradouro']);
    }
  }

  Widget _sucessFail(bool sucess) {
    return sucess
        ? AlertDialog(
            title: Text("Sucesso"),
            content: Row(
              children: <Widget>[
                Icon(
                  Icons.check,
                  color: Colors.green,
                  size: 40,
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 10),
                ),
                Text("Usuário registrado")
              ],
            ),
            actions: <Widget>[
              FlatButton(
                  onPressed: () {
                    Navigator.of(context).pushAndRemoveUntil(
                        MaterialPageRoute(builder: (context) => HomeLogged()),
                        (Route<dynamic> route) => false);
                  },
                  child: Text('Continuar')),
            ],
          )
        : AlertDialog(
            title: Text("Erro"),
            content: Row(
              children: <Widget>[
                Icon(
                  Icons.close,
                  color: Colors.red,
                  size: 40,
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 10),
                ),
                Text("Usuário já está registrado")
              ],
            ),
            actions: <Widget>[
              FlatButton(
                  onPressed: () {
                    Navigator.of(context).popUntil((route) => route.isFirst);
                  },
                  child: Text('Fechar')),
            ],
          );
  }

  setCredentials(String api_key) async {
    userData.setString("usuario", novoUsuario.toString());
    userData.setString("api_key", api_key);
  }

  getCredentials() async {
    userData = await SharedPreferences.getInstance();
  }
}
