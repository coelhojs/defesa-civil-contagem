import 'package:defesa_civil/models/size_config.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:snaplist/snaplist_view.dart';

class Vistoriades extends StatefulWidget {
  @override
  _VistoriadesState createState() => _VistoriadesState();
}

class _VistoriadesState extends State<Vistoriades> {
  List<List> list = [
    [
      "Ana Paula Soares Silva Avelino - Assistente Administrativo",
      "assets/images/vistoriadores/anapaula.png"
    ],
    [
      "Anselmo Ribeiro de Moura - Vistoriador",
      "assets/images/vistoriadores/anselmo.png"
    ],
    [
      "Bruno César de Souza - Vistoriador",
      "assets/images/vistoriadores/bruno.jpg"
    ],
    [
      "Claudio Eduardo Fernandes - Vistoriador",
      "assets/images/vistoriadores/claudio.jpg"
    ],
    [
      "Cléberson Campos Matias - Gerente Vistoriador",
      "assets/images/vistoriadores/cleberson.png"
    ],
    [
      "Daniele Pereira da Silva Gomes - Vistoriador",
      "assets/images/vistoriadores/daniele.png"
    ],
    [
      "Davidson Vieira da Silva - Vistoriador",
      "assets/images/vistoriadores/davidson.png"
    ],
    [
      "Décio Camargos de Aguiar Júnior - Secretário Municipal de Defesa Social",
      "assets/images/vistoriadores/decinho.jpg"
    ],
    [
      "Edmar Pedro Feliciano - Logistica",
      "assets/images/vistoriadores/edmar.jpg"
    ],
    [
      "Fernanda Dorini Fonseca - Vistoriador",
      "assets/images/vistoriadores/fernanda.jpg"
    ],
    [
      "Hudson Douglas Ferreira da Silva - Administrativo",
      "assets/images/vistoriadores/hudson.jpg"
    ],
    [
      "Lorena da Silva Justino Ribeiro - Diretora de Resposta a Desastre",
      "assets/images/vistoriadores/lorena.png"
    ],
    [
      "Marcelo Francisco Rezende - Vistoriador",
      "assets/images/vistoriadores/marcelorezende.png"
    ],
    [
      "Marcelo Rodrigues Ferreira - Engenheiro",
      "assets/images/vistoriadores/marcelo.jpg"
    ],
    [
      "Nancy Mary Freitas - Assistente administrativo",
      "assets/images/vistoriadores/nancy.jpg"
    ],
    [
      "Olivério Simois da Silva - Vistoriador",
      "assets/images/vistoriadores/oliverio.png"
    ],
    [
      "Ricardo Bispo dos Santos - Vistoriador",
      "assets/images/vistoriadores/ricardo.png"
    ],
    [
      "Samuel Martins Lara - Coordenador",
      "assets/images/vistoriadores/samuel.png"
    ],
    [
      "Waldo Lúcio Quaresma - Vistoriador",
      "assets/images/vistoriadores/waldo.jpg"
    ],
    [
      "Wilson Henrique da Silva - Motorista",
      "assets/images/vistoriadores/wilson.jpg"
    ]
  ];

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(246, 129, 33, 1),
        title: Text('Vistoriadores'),
      ),
      body: HorizontalTab(
        images: list,
      ),
    );
  }
}

class HorizontalTab extends StatelessWidget {
  final List<List> images;
  final VoidCallback loadMore;

  const HorizontalTab({Key key, this.images, this.loadMore}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final Size cardSize = Size(SizeConfig.blockSizeHorizontal * 70,
        SizeConfig.blockSizeHorizontal * 125);
    return SnapList(
      padding: EdgeInsets.only(
          left: (MediaQuery.of(context).size.width - cardSize.width) / 2),
      sizeProvider: (index, data) => cardSize,
      separatorProvider: (index, data) => Size(10.0, 10.0),
      builder: (context, index, data) {
        return Card(
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
          child: Padding(
            padding: EdgeInsets.all(20),
            child: Column(
              children: <Widget>[
                ClipRRect(
                  borderRadius: BorderRadius.circular(16.0),
                  child: Image.asset(
                    images[index][1],
                    fit: BoxFit.cover,
                    width: SizeConfig.blockSizeHorizontal * 60,
                    height: SizeConfig.blockSizeHorizontal * 90,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(top: 20),
                ),
                Align(
                    alignment: Alignment.centerLeft,
                    child: RichText(
                      text: TextSpan(children: <TextSpan>[
                        TextSpan(
                            text: "Nome: ",
                            style: TextStyle(
                                fontSize: SizeConfig.blockSizeHorizontal * 3.5,
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                                fontFamily: 'Uber')),
                        TextSpan(
                            text: images[index][0].split('-')[0],
                            style: TextStyle(
                                color: Colors.black,
                                fontFamily: 'Uber',
                                fontSize: SizeConfig.blockSizeHorizontal * 3.5))
                      ]),
                    )),
                Align(
                    alignment: Alignment.centerLeft,
                    child: RichText(
                      text: TextSpan(children: [
                        TextSpan(
                            text: "Cargo: ",
                            style: TextStyle(
                                fontSize: SizeConfig.blockSizeHorizontal * 3.5,
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                                fontFamily: 'Uber')),
                        TextSpan(
                            text: images[index][0].split('-')[1],
                            style: TextStyle(
                                color: Colors.black,
                                fontFamily: 'Uber',
                                fontSize: SizeConfig.blockSizeHorizontal * 3.5))
                      ]),
                    ))
              ],
            ),
          ),
        );
      },
      count: images.length,
    );
  }
}
