import 'package:defesa_civil/screens/registered/homelogged.dart';
import 'package:flutter/material.dart';
import 'package:fluttie/fluttie.dart';

Widget sucessFail(bool sucess, String detalhes, BuildContext context, FluttieAnimationController animationController) {

  return sucess
      ? AlertDialog(
    title: Text("Sucesso"),
    content: Row(
      children: <Widget>[
        Container(
          width: 80,
          height: 80,
          child: FluttieAnimation(animationController),
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
        Container(
          width: 40,
          height: 40,
          child: FluttieAnimation(animationController),
        ),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 10),
        ),
        Text(detalhes)
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