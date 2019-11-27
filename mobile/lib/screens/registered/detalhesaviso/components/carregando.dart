import 'package:defesa_civil/models/size_config.dart';
import 'package:flutter/material.dart';

Widget carregando(BuildContext context, bool tipo){
  SizeConfig().init(context);
    return tipo ? Expanded(
        child: Stack(
          children: <Widget>[
            Positioned.fill(
              child: Align(
                  alignment: Alignment.center, child: CircularProgressIndicator(valueColor: new AlwaysStoppedAnimation<Color>(Color.fromRGBO(246, 129, 33, 1)))),
            )
          ],
        )) :
    Container(
      width:
      SizeConfig.blockSizeHorizontal * 20,
      height:
      SizeConfig.blockSizeHorizontal * 20,
      child: Center(
        child: Text("Erro ao carregar"),
      ),
    );

}