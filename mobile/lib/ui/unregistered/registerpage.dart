import 'dart:convert';

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

  @override
  _RegisterPageState createState() => _RegisterPageState(name,email,image);

  RegisterPage({@required this.name, @required this.email, @required this.image});
}

class _RegisterPageState extends State<RegisterPage>
    with SingleTickerProviderStateMixin {
  TabController _tabController;
  var cepController = new MaskedTextController(mask: '00000-000');
  var cpfController = new MaskedTextController(mask: '000.000.000-00');
  var telController = new MaskedTextController(mask: '(00)00000-0000');
  GlobalKey<FormState> _globalKey = GlobalKey<FormState>();
  GlobalKey<FormState> _globalKey1 = GlobalKey<FormState>();
  String next = "Proximo";
  String name;
  String email;
  String image;
  int _enderecoState = 0;
  String endereco = "CEP Inválido";

  _RegisterPageState(this.name,this.email,this.image);

  @override
  void initState() {
    super.initState();
    _tabController = new TabController(vsync: this, length: 2);
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
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () async {
            if(_tabController.index==0) {
              if (_globalKey.currentState.validate()) {
                _tabController.animateTo(_tabController.index + 1);
                setState(() => next="Cadastrar");
              }

            }
            else if(_tabController.index==1){
              if (_globalKey1.currentState.validate()) {


                setCredentials(name, email, image);
                Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(builder: (context) => HomeLogged()), (
                    Route<dynamic> route) => false);
              }
            }
          } ,
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
              key: _globalKey,
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
                        controller: cpfController,
                        maxLength: 14,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          counterText: '',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.assignment_ind),
                          labelText: 'CPF:',
                        ),
                        validator: (value){
                          if(value.isEmpty) return "Insira o CPF";
                          else if(value.length != 14) return "O tamanho do CPF são 11 dígitos";
                          else if(!validarCPF(value.replaceAll('.', '').replaceAll('-', ''))) return "CPF Inválido";
                        },
                      ),
                      Padding(
                        padding: EdgeInsets.all(10),
                      ),
                      TextFormField(
                        controller: telController,
                        maxLength: 14,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          counterText: '',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.phone),
                          labelText: 'Telefone:',
                        ),
                        validator: (value){
                          if(value.isEmpty) return "Insira o Telefone";
                          else if(value.length != 14) return "O tamanho do telefone são 11 dígitos";
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Form(
              key: _globalKey1,
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
                        onChanged: (value)async{
                          if(value.length==9){
                            setState(() {
                              _enderecoState=1;
                            });
                            var url = 'https://viacep.com.br/ws/${value.replaceAll('-', '')}/json/';
                            var response = await http.get(url);
                            print('Response status: ${response.statusCode}');
                            var responseDecoded = json.decode(response.body);
                            print('Response body: ${response.body}');
                            if(responseDecoded['logradouro']!=null)
                              endereco = responseDecoded['logradouro'];
                            else
                              endereco="CEP não encontrado";
                            setState(() {
                              _enderecoState=2;
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
                        validator: (value){
                          if(value.isEmpty) return "Insira o CEP";
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

  Widget _createEndereco(){
    if(_enderecoState == 0)
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
    else if(_enderecoState == 1){
      return CircularProgressIndicator();
    }
    else if(_enderecoState == 2){
      return Text(endereco);
    }
  }

  setCredentials(String name, String email, String image) async {
    SharedPreferences userData = await SharedPreferences.getInstance();
    userData.setString("name", name);
    userData.setString("email", email);
    userData.setString("image", image);
  }

  bool validarCPF(String cpf){
    List<int> sanitizedCPF = cpf
        .replaceAll(new RegExp(r'\.|-'), '')
        .split('')
        .map((String digit) => int.parse(digit))
        .toList();
    return !blacklistedCPF(sanitizedCPF.join()) &&
        sanitizedCPF[9] == gerarDigitoVerificador(sanitizedCPF.getRange(0, 9).toList()) &&
        sanitizedCPF[10] == gerarDigitoVerificador(sanitizedCPF.getRange(0, 10).toList());
  }

  int gerarDigitoVerificador(List<int> digits) {
    int baseNumber = 0;
    for (var i = 0; i < digits.length; i++) {
      baseNumber += digits[i] * ((digits.length + 1) - i);
    }
    int verificationDigit = baseNumber * 10 % 11;
    return verificationDigit >= 10 ? 0 : verificationDigit;
  }

  bool blacklistedCPF(String cpf) {
    return
      cpf == '11111111111' ||
          cpf == '22222222222' ||
          cpf == '33333333333' ||
          cpf == '44444444444' ||
          cpf == '55555555555' ||
          cpf == '66666666666' ||
          cpf == '77777777777' ||
          cpf == '88888888888' ||
          cpf == '99999999999' ||
          cpf == '00000000000';
  }

}
