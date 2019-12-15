import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttie/fluttie.dart';

Widget dialog(String titulo, String descricao,
    {IconData icone, Color cor, bool carregando = false, bool botao = false, BuildContext context}) {
  return AlertDialog(
    actions: <Widget>[
      botao ? FlatButton(
        child: Text("Fechar"),
        onPressed: () {
          Navigator.pop(context);
        },
      ) : Container(),
    ],
    shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(15))),
    title: Text(titulo),
    content: Row(
      children: <Widget>[
        carregando
            ? CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(
                    Color.fromRGBO(246, 129, 33, 1)),
              )
            : Icon(
                icone,
                color: cor,
                size: 40,
              ),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 10),
        ),
        Text(descricao)
      ],
    ),
  );
}
