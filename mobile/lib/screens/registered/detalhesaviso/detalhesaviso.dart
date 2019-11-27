import 'dart:typed_data';

import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/models/size_config.dart';
import 'package:defesa_civil/screens/registered/detalhesaviso/components/carregando.dart';
import 'package:defesa_civil/screens/registered/detalhesaviso/services/detalhesAPI.dart';
import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class DetalhesAviso extends StatefulWidget {
  DetalhesAviso(this.idaviso);

  String idaviso;

  @override
  _DetalhesAvisoState createState() => _DetalhesAvisoState();
}

class _DetalhesAvisoState extends State<DetalhesAviso> {
  List<String> images2 = [
    "http://via.placeholder.com/200x150",
    "http://via.placeholder.com/300x150",
    "http://via.placeholder.com/400x150",
  ];
  List<Uint8List> images = [];

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      appBar: AppBar(
          title: Text("Detalhes do aviso"),
          backgroundColor: Color.fromRGBO(246, 129, 33, 1)),
      body: Container(
          width: double.infinity,
          height: double.infinity,
          child: Column(
            children: <Widget>[
              FutureBuilder(
                future: detalhes(widget.idaviso),
                builder: (context, snapshot) {
                  if (snapshot.connectionState != ConnectionState.done) {
                    return carregando(context, true);
                  }
                  if (snapshot.hasError) {
                    return carregando(context, false);
                  }
                  for (var img in snapshot.data.fotos2) {
                    images.add(img);
                  }
                  print(snapshot.data);

                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Container(
                        width: SizeConfig.blockSizeHorizontal * 100,
                        height: 300,
                        child: Swiper(
                          itemBuilder: (BuildContext context, int index) {
                            return Image.memory(
                              images[index],
                              fit: BoxFit.fill,
                            );
                          },
                          //indicatorLayout: PageIndicatorLayout,
                          autoplay: true,
                          itemCount: images.length,
                          pagination: SwiperPagination(),
                          control: SwiperControl(),
                        ),
                      ),
                      textoBold(
                          texto1: "Status: ", texto2: snapshot.data.status),
                      textoBold(texto1: "Tipo: ", texto2: snapshot.data.tipo),
                      textoBold(
                          texto1: "Local: ",
                          texto2: snapshot.data.endereco['rua']),
                      textoBold(
                          texto1: "Descrição: ",
                          texto2: snapshot.data.descricao),
                    ],
                  );
                },
              ),
            ],
          )),
    );
  }

  Widget textoBold({@required texto1, @required texto2}) {
    return Padding(
      padding: EdgeInsets.all(5),
      child: RichText(
        text: TextSpan(
          style: TextStyle(
              fontSize: SizeConfig.blockSizeHorizontal * 4.5,
              color: Colors.black,
              fontFamily: 'Uber'),
          children: <TextSpan>[
            TextSpan(
                text: texto1, style: TextStyle(fontWeight: FontWeight.bold)),
            TextSpan(
                text: texto2, style: TextStyle(fontWeight: FontWeight.w300)),
          ],
        ),
      ),
    );
  }
}
