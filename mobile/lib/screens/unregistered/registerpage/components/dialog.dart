import 'package:defesa_civil/screens/registered/homelogged.dart';
import 'package:flutter/material.dart';

Widget sucessFail(bool sucess, String detalhes, BuildContext context) {
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