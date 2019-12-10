import 'package:defesa_civil/components/dialog.dart';
import 'package:defesa_civil/models/size_config.dart';
import 'package:defesa_civil/services/nupdec.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttie/fluttie.dart';

class NupDec extends StatefulWidget {
  @override
  _NupDecState createState() => _NupDecState();
}

class _NupDecState extends State<NupDec> {
  FluttieAnimationController animationCtrl;
  bool _visible = false;

  @override
  void initState() {
    super.initState();
    prepareAnimation();
    setState(() {
      _visible = true;
    });
  }

  @override
  dispose() {
    super.dispose();
    animationCtrl?.dispose();
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(246, 129, 33, 1),
        title: Text('NuPDeC'),
      ),
      body: Container(
        padding: EdgeInsets.all(20),
        child: FutureBuilder(
          future: consultNuPDeC(),
          builder: (context, snapshot) {
            if (!snapshot.hasData)
              return Center(
                child: CircularProgressIndicator(),
              );
            if (snapshot.data) {
              animationCtrl.start();

              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    AnimatedOpacity(
                        opacity: _visible ? 1 : 0,
                        duration: Duration(milliseconds: 6000),
                        // The green box must be a child of the AnimatedOpacity widget.
                        child: Text(
                          "Você está cadastrado no NuPDec!",
                          style: TextStyle(
                              fontWeight: FontWeight.w500,
                              fontSize: SizeConfig.blockSizeHorizontal * 6),
                        )),
                    Container(
                      height: SizeConfig.blockSizeVertical * 35,
                      width: SizeConfig.blockSizeHorizontal * 80,
                      child: FluttieAnimation(animationCtrl),
                    ),
                    FlatButton(
                      child: Container(
                        padding: EdgeInsets.all(10),
                        child: Text(
                          "Sair do NuPDec",
                          style: TextStyle(color: Colors.white),
                        ),
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.all(Radius.circular(10)),
                            color: Color.fromRGBO(50, 69, 157, 1)),
                      ),
                      onPressed: () async {
                        showDialog(
                            context: context,
                            builder: (context) {
                              return dialog(
                                  "Removendo", "Removendo inscriçao no NuPDec",
                                  carregando: true);
                            });
                        await removerNup();

                        setState(() {});
                        Navigator.pop(context);
                      },
                    )
                  ],
                ),
              );
            }
            return SingleChildScrollView(
              child: Center(
                child: Column(
                  children: <Widget>[
                    Image(
                        height: SizeConfig.blockSizeHorizontal * 40,
                        image: AssetImage("assets/images/nupdec.jpg")),
                    Padding(
                      padding: EdgeInsets.only(top: 20),
                    ),
                    Text(
                      "O que é Núcleo Comunitário de Proteção e Defesa Civil ( NUPDEC ) ? ",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    Text(
                        "\nA Política Nacional de Defesa Civil aponta o Núcleo Comunitário de Proteção e Defesa Civil – NUPDEC – como o elo mais importante de Sistema Nacional de Proteção e Defesa Civil.\n\n"
                        "Tem como finalidade implementar a integração de todo o Sistema de Proteção e Defesa Civil, empresas, estabelecimentos de ensino, comunidade e instituições de segurança pública para garantir uma ação conjunta de toda a sociedade nas ações de segurança social. Através de programas de mudança cultural e treinamento , deve-se buscar o engajamento de comunidades participativas, informadas, preparadas e côncias de seus direitos e deveres relativos à segurança comunitária.O agente de Proteção e Defesa Civil será a ligação entre o poder constituído e sua comunidade, multiplicando as informações recebidas e articulando discussões sobre problemas e formas de intervenções.\n\n"
                        "Os Núcleos Comunitários de Proteção e Defesa Civil fundamentan-se, basicamente, na promoção de mudança cultural em dois níveis – Participação e Prevenção. É no NUPDEC que poderão acontecer os debates acerca da questão da segurança da localidade numa perspectiva da Segurança Global da População, pois os acidentes e desastres acontecem prioritariamente nos espaços locais. Muito antes da chegada dos profissionais melhor vocacionados para o atendimento da emergência, a população local se faz presente, por isso é indiscutível que os danos serão tanto menores quanto mais preparada estiver a comunidade.\n"),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Text("Objetivo Geral do NUPDEC",
                          style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                    Text(
                        "Envolver as comunidades situadas em áreas de risco no processo de reflexão sobre a realidade dos riscos, incentivando a construção de uma consciência coletiva acerca da preservação do meio ambiente local, sobre a ótica da minimização dos desastres."),
                    Padding(
                      padding: EdgeInsets.only(top: 10),
                    ),
                    FlatButton(
                      child: Container(
                        padding: EdgeInsets.all(10),
                        child: Text(
                          "Quero ser NuPDec",
                          style: TextStyle(color: Colors.white),
                        ),
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.all(Radius.circular(10)),
                            color: Color.fromRGBO(50, 69, 157, 1)),
                      ),
                      onPressed: () async {
                        showDialog(
                            context: context,
                            builder: (context) {
                              return dialog(
                                  "Cadastrando", "Cadastrando novo NuPDec",
                                  carregando: true);
                            });
                        await registerNuPDeC();

                        setState(() {});
                        Navigator.pop(context);
                      },
                    )
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  prepareAnimation() async {
    var instance = Fluttie();

    var checkAnimation =
        await instance.loadAnimationFromAsset("assets/orangecheck.json");

    animationCtrl = await instance.prepareAnimation(
      checkAnimation,
      duration: const Duration(seconds: 2),
      repeatCount: const RepeatCount.dontRepeat(),
      repeatMode: RepeatMode.START_OVER,
    );
    return true;
  }
}
