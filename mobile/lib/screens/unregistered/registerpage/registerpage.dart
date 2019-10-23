import 'package:defesa_civil/components/dialog.dart';
import 'package:defesa_civil/services/cepvalidator.dart';
import 'package:defesa_civil/models/usuario.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_masked_text/flutter_masked_text.dart';
import 'package:fluttie/fluttie.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../services/registrarUsrApi.dart';

import '../../../models/size_config.dart';
import 'components/dialog.dart';

class RegisterPage extends StatefulWidget {
  RegisterPage(this.name, this.email, this.image, this.token);

  String name;
  String email;
  String image;
  String token;

  @override
  _RegisterPageState createState() =>
      _RegisterPageState(name, email, image, token);
}

class _RegisterPageState extends State<RegisterPage>
    with SingleTickerProviderStateMixin {
  _RegisterPageState(this.name, this.email, this.image, this.token);

  SharedPreferences userData;
  TabController _tabController;

  Usuario novoUsuario;
  Endereco enderecoUsuario = Endereco();
  Map<String, dynamic> detalhesEndereco = {};

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  MaskedTextController cepController = MaskedTextController(mask: '00000-000');
  MaskedTextController cpfController =
      MaskedTextController(mask: '000.000.000-00');
  MaskedTextController telController =
      MaskedTextController(mask: '(00)00000-0000');
  TextEditingController numController = TextEditingController();
  TextEditingController complementoController = TextEditingController();

  FluttieAnimationController animationCtrlDone;
  FluttieAnimationController animationCtrlError;

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

  @override
  void initState() {
    super.initState();
    _tabController = TabController(vsync: this, length: 2);
    prepareAnimation();
  }

  @override
  void dispose() {
    super.dispose();

    animationCtrlDone?.dispose();
    animationCtrlError?.dispose();
    _tabController.dispose();
  }

  prepareAnimation() async {
    var instance = Fluttie();

    var checkAnimation =
    await instance.loadAnimationFromAsset("assets/animation/done.json");

    var erroAnimation =
    await instance.loadAnimationFromAsset("assets/animation/erro.json");

    animationCtrlDone = await instance.prepareAnimation(
      checkAnimation,
      duration: const Duration(seconds: 2),
      repeatCount: const RepeatCount.dontRepeat(),
      repeatMode: RepeatMode.START_OVER,
    );
    animationCtrlError = await instance.prepareAnimation(
      erroAnimation,
      duration: const Duration(seconds: 2),
      repeatCount: const RepeatCount.dontRepeat(),
      repeatMode: RepeatMode.START_OVER,
    );
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        key: _scaffoldKey,
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () {
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
                        future: registrarUsuario(novoUsuario.toJson(), token),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState !=
                              ConnectionState.done) {
                            return dialog(
                                "Registrando", "Registrando novo usuário",
                                carregando: true);
                          }
                          if (snapshot.hasError) {
                            return dialog("Erro", "Houve um erro ao registrar",
                                icone: Icons.close, cor: Colors.red);
                          } else {
                            if (snapshot.data['api_key'] != null) {
                              setCredentials(snapshot.data['api_key']);
                            }
                            if(snapshot.data['api_key'] != null){
                              animationCtrlDone.start();
                              return sucessFail(true, "Usuário registrado",
                                  context, animationCtrlDone);
                            }else{
                              animationCtrlError.start();
                              return sucessFail(
                                  false,
                                  snapshot.data['mensagem_amigavel'],
                                  context,
                                  animationCtrlError);
                            }
                          }
                        },
                      );
                    });
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
                          if (value.length == 14) {
                            FocusScope.of(context).requestFocus(focusTel);
                          }
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
                          if (value.isEmpty) {
                            return "Insira o CPF";
                          } else if (value.length != 14) {
                            return "O tamanho do CPF são 11 dígitos";
                          } else if (!validarCPF(
                              value.replaceAll('.', '').replaceAll('-', ''))) {
                            return "CPF Inválido";
                          }
                          //return "Erro";
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
                          if (value.isEmpty) {
                            return "Insira o Telefone";
                          } else if (value.length != 14) {
                            return "O tamanho do telefone são 11 dígitos";
                          }
                          //return "Erro";
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
                            Map responseDecoded = await getCep(value);
                            if (responseDecoded['logradouro'] != null) {
                              detalhesEndereco = {
                                "cep": responseDecoded['cep'],
                                "logradouro": responseDecoded['logradouro'],
                                "bairro": responseDecoded['bairro'],
                                "cidade": responseDecoded['localidade'],
                                "uf": responseDecoded['uf'],
                              };
                            } else if (responseDecoded['erro']) {
                              detalhesEndereco['logradouro'] =
                                  "CEP não encontrado";
                            }
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
                          if (value.isEmpty) {
                            return "Insira o CEP";
                          } else if (value.length != 9) {
                            return "O tamanho do CEP são 8 dígitos";
                          } else if (endereco == "CEP não encontrado") {
                            return "CEP não encontrado";
                          }
                          //return "Erro";
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
                                if (value.isEmpty) {
                                  return "Insira o número";
                                }
                                //return "Erro";
                              },
                            ),
                          ),
                        ],
                      ),
                      Padding(
                        padding: EdgeInsets.all(10),
                      ),
                      _createEndereco(),
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
    if (_enderecoState == 0) {
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
    } else if (_enderecoState == 1) {
      return CircularProgressIndicator();
    } else if (_enderecoState == 2) {
      print(detalhesEndereco);
      return Column(
        children: <Widget>[
          Text(detalhesEndereco["logradouro"]),
          Text(detalhesEndereco["bairro"]),
          Text(detalhesEndereco["cidade"]),
          Text(detalhesEndereco["uf"])
        ],
      );
    }
  }

  void setCredentials(String api_key) async {
    userData = await SharedPreferences.getInstance();
    userData.setString("usuario", novoUsuario.toString());
    userData.setString("api_key", api_key);
  }
}
