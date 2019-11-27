import 'dart:async';

import 'package:defesa_civil/components/dialog.dart';
import 'package:defesa_civil/helpers/blochome.dart';
import 'package:defesa_civil/screens/unregistered/home.dart';
import 'package:defesa_civil/screens/unregistered/registerpage/components/endereco.dart';
import 'package:defesa_civil/screens/unregistered/registerpage/components/sucess.dart';
import 'package:defesa_civil/screens/unregistered/registerpage/components/textFieldValidators.dart';
import 'package:defesa_civil/services/cepvalidator.dart';
import 'package:defesa_civil/models/usuario.dart';
import 'package:defesa_civil/services/setcredentials.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_masked_text/flutter_masked_text.dart';
import 'package:fluttie/fluttie.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../services/registrarUsrApi.dart';

import '../../../models/size_config.dart';
import '../loginpage.dart';
import 'components/inputs.dart';
import 'components/sucessfail.dart';

class RegisterPage extends StatefulWidget {
  RegisterPage(this.name, this.email, this.image, this.token, this.player_id);

  String name;
  String email;
  String image;
  String token;
  String player_id;

  @override
  _RegisterPageState createState() =>
      _RegisterPageState(name, email, image, token, player_id);
}

class _RegisterPageState extends State<RegisterPage>
    with SingleTickerProviderStateMixin {
  _RegisterPageState(this.name, this.email, this.image, this.token, this.player_id);

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
  FocusNode focusCEP = FocusNode();
  FocusNode focusComplemento = FocusNode();

  String next = "Proximo";
  String name;
  String email;
  String image;
  String token;
  String player_id;
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
          appBar: AppBar(
            automaticallyImplyLeading: false,
            leading: IconButton(
              icon: Icon(
                Icons.arrow_back,
                color: Color.fromRGBO(246, 129, 33, 1),
              ),
              onPressed: voltar,
            ),
            elevation: 0,
            backgroundColor: Colors.white,
            title: Text(
              "Cadastre-se",
              style: TextStyle(
                  fontSize: SizeConfig.blockSizeHorizontal * 7,
                  fontWeight: FontWeight.w300,
                  color: Colors.black),
            ),
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
                        Padding(
                          padding: EdgeInsets.all(10),
                        ),
                        Theme(
                          child: TextFormField(
                            style: TextStyle(fontWeight: FontWeight.w500),
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
                              border: UnderlineInputBorder(),
                              prefixStyle: TextStyle(color: Colors.red),
                              prefixIcon: Icon(Icons.assignment_ind),
                              labelText: 'CPF:',
                            ),
                            validator: (value) {
                              if (value.isEmpty) {
                                return "Insira o CPF";
                              } else if (value.length != 14) {
                                return "O tamanho do CPF são 11 dígitos";
                              } else if (!validarCPF(value
                                  .replaceAll('.', '')
                                  .replaceAll('-', ''))) {
                                return "CPF Inválido";
                              }
                              //return "Erro";
                            },
                          ),
                          data: Theme.of(context).copyWith(
                            primaryColor: Color.fromRGBO(246, 129, 33, 1),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.all(10),
                        ),
                        Theme(
                          child: TextFormField(
                            style: TextStyle(fontWeight: FontWeight.w500),
                            focusNode: focusTel,
                            controller: telController,
                            maxLength: 14,
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(
                              counterText: '',
                              border: UnderlineInputBorder(),
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
                          data: Theme.of(context).copyWith(
                            primaryColor: Color.fromRGBO(246, 129, 33, 1),
                          ),
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
                        Padding(
                          padding: EdgeInsets.all(10),
                        ),
                        Theme(
                          child: TextFormField(
                            style: TextStyle(fontWeight: FontWeight.w500),
                            focusNode: focusCEP,
                            onChanged: (value) async {
                              if (value.length == 9) {
                                FocusScope.of(context)
                                    .requestFocus(focusComplemento);
                                setState(() {
                                  _enderecoState = 1;
                                });
                                if (_enderecoState == 1) {
                                  showDialog(
                                      context: context,
                                      builder: (context) {
                                        return dialog(
                                            "Carregando", "Carregando endereço",
                                            carregando: true);
                                      });
                                }

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
                                Navigator.pop(context, false);
                              }
                            },
                            maxLength: 9,
                            controller: cepController,
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(
                              counterText: '',
                              border: UnderlineInputBorder(),
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
                          data: Theme.of(context).copyWith(
                            primaryColor: Color.fromRGBO(246, 129, 33, 1),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.all(10),
                        ),
                        Row(
                          children: <Widget>[
                            Container(
                                width: SizeConfig.blockSizeHorizontal * 65,
                                child: Theme(
                                  child: TextFormField(
                                    style:
                                    TextStyle(fontWeight: FontWeight.w500),
                                    textInputAction: TextInputAction.go,
                                    onFieldSubmitted: (value) =>
                                        FocusScope.of(context)
                                            .requestFocus(focusNum),
                                    focusNode: focusComplemento,
                                    controller: complementoController,
                                    maxLength: 6,
                                    keyboardType: TextInputType.text,
                                    decoration: const InputDecoration(
                                      counterText: '',
                                      border: UnderlineInputBorder(),
                                      prefixIcon: Icon(Icons.chevron_right),
                                      labelText: 'Complemento:',
                                    ),
                                  ),
                                  data: Theme.of(context).copyWith(
                                    primaryColor:
                                    Color.fromRGBO(246, 129, 33, 1),
                                  ),
                                )),
                            Padding(
                              padding: EdgeInsets.all(10),
                            ),
                            Expanded(
                                child: Input(
                                  controller: numController,
                                  focusNode: focusNum,
                                  tamanho: 6,
                                  inputFormatters: <TextInputFormatter>[
                                    WhitelistingTextInputFormatter.digitsOnly
                                  ],
                                  tipoTeclado: TextInputType.number,
                                  label: "Nº",
                                  validator: (value) {
                                    if (value.isEmpty) {
                                      return "Insira o número";
                                    }
                                  },
                                )),
                          ],
                        ),
                        Padding(
                          padding: EdgeInsets.all(10),
                        ),
                        createEndereco(
                            _enderecoState, detalhesEndereco, context),
                      ],
                    ),
                  ),
                ),
              )
            ],
          ),
          floatingActionButton: FloatingActionButton.extended(
            onPressed: validator,
            label: Text(next),
            backgroundColor: Color.fromRGBO(246, 129, 33, 1),
          )),
    );
  }

  voltar() async {
    if (_tabController.index == 0) {
      Navigator.pushAndRemoveUntil(
          context,
          CupertinoPageRoute(builder: (context) => Home(0)),
          (Route<dynamic> route) => false);
    } else if (_tabController.index == 1) {
      setState(() {
        next = "Próximo";
      });
      _tabController.animateTo(0);
    }
  }

  void validator() async{
    if (_tabController.index == 0 && _keyValidaForm1.currentState.validate()) {
      _tabController.animateTo(_tabController.index + 1);

      setState(() => next = "Cadastrar");
      Timer(Duration(milliseconds: 100), () {
        FocusScope.of(context).requestFocus(focusCEP);
      });
    } else if (_tabController.index == 1 &&
        _keyValidaForm2.currentState.validate() &&
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
        "player_id": player_id,
        "tipo": "Usuário",
      });
      showDialog(
          barrierDismissible: false,
          context: context,
          builder: (context) {
            return dialog("Registrando", "Registrando novo usuário",
                carregando: true);
          });
      registrarUsuario(novoUsuario.toJson(), token).then((result){

        if (result['api_key'] != null) {
          setCredentials(
              api_key: result['api_key'],
              userData: userData,
              novoUsuario: novoUsuario);
          Navigator.pushAndRemoveUntil(
              context,
              CupertinoPageRoute(
                  fullscreenDialog: true,
                  builder: (context) => RegisterSucess()),
                  (Route<dynamic> route) => false);
        } else {
          Navigator.pop(context, false);
          animationCtrlError.start();
          showDialog(
              context: context,
              builder: (context) {
                return sucessFail(false, result['mensagem_amigavel'],
                    context, animationCtrlError);
              });
        }


      });


    }
  }
}
