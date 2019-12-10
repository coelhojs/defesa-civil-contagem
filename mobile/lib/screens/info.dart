import 'package:defesa_civil/models/size_config.dart';
import 'package:flutter/material.dart';

class Info extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Color.fromRGBO(246, 129, 33, 1),
          title: Text('Sobre'),
        ),
        body: SingleChildScrollView(
          child: Container(
//        alignment: Alignment.center,
            child: Column(
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.only(top: 10),
                ),
                Image(
                    height: SizeConfig.blockSizeHorizontal * 40,
                    image: AssetImage("assets/images/defesa.png")),
                Container(
                  alignment: Alignment.centerLeft,
                  padding: EdgeInsets.all(10),
                  child: Text(
                      "Coordenadoria Municipal de Defesa Civil\nRua Vereador David da Costa, 14\nBairro: Fonte Grande \nCEP: 32.040-650\nHorário de funcionamento:\n8:00 às 17:00 horas\n\nTelefone: 3198-8676 / 3198-8677 / 3198-8678 / 3198-8679"),
                ),
                Container(
                  alignment: Alignment.centerLeft,
                  padding: EdgeInsets.all(10),
                  child: Text(
                      "Atribuições:\nÀ Coordenadoria de Defesa Civil compete:\nI - articular, coordenar e gerenciar ações de defesa civil no Município de Contagem;\nII - promover a defesa permanente contra desastres naturais ou provocados pelo homem;\nIII - prevenir ou minimizar danos, socorrer e assistir populações atingidas;\nIV - articular-se com as Regionais Estaduais de Defesa Civil - REDEC ou órgãos correspondentes, e participar ativamente dos Planos de Apoio Mútuo - PAM, em acordo com o princípio de auxílio mútuo entre os Municípios;\nV - promover a criação e a interligação de centros de operações e incrementar as atividades de monitorização, alerta e alarme, com o objetivo de otimizar a previsão de desastres;\nVI - Executar outras atividades correlatas."),
                ),
              ],
            ),
          ),
        ));
  }
}
