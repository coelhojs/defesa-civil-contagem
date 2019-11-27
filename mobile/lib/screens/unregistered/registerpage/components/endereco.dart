import 'package:defesa_civil/models/size_config.dart';
import 'package:flutter/material.dart';

Widget createEndereco(
    int enderecoState, Map detalhesEndereco, BuildContext context) {
  SizeConfig().init(context);
  var rua = TextEditingController();
  var bairro = TextEditingController();
  var municipio = TextEditingController();
  var uf = TextEditingController();

  if (enderecoState == 0 || enderecoState == 1) {
    return Container(
      child: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              Container(
                width: SizeConfig.blockSizeHorizontal * 55,
                child: inputText("Rua"),
              ),
              Padding(
                padding: EdgeInsets.only(left: 10),
              ),
              Expanded(child: inputText("Estado"))
            ],
          ),
          inputText("Municipio"),
          inputText("Bairro")
        ],
      ),
    );
  } else if (enderecoState == 2) {
    if (detalhesEndereco['logradouro'] != "CEP não encontrado") {
      rua.text = detalhesEndereco["logradouro"];
      bairro.text = detalhesEndereco["bairro"];
      municipio.text = detalhesEndereco["cidade"];
      uf.text = detalhesEndereco["uf"];
    }else{
      rua.text = "CEP não encontrado";
    }
    print(detalhesEndereco);
    return Column(
      children: <Widget>[
        Row(
          children: <Widget>[
            Container(
                width: SizeConfig.blockSizeHorizontal * 75,
                child: inputText("Rua", controller: rua)),
            Padding(
              padding: EdgeInsets.only(left: 10),
            ),
            Expanded(
              child: inputText("Estado", controller: uf),
            )
          ],
        ),
        inputText("Municipio", controller: municipio),
        inputText("Bairro", controller: bairro)
      ],
    );
  }
}

Widget inputText(String texto, {TextEditingController controller}) {
  return controller != null
      ? TextField(
          style: TextStyle(fontWeight: FontWeight.w500),
          controller: controller,
          enabled: false,
          decoration: InputDecoration(labelText: texto),
        )
      : TextField(
          style: TextStyle(fontWeight: FontWeight.w500),
          enabled: false,
          decoration: InputDecoration(labelText: texto),
        );
}
