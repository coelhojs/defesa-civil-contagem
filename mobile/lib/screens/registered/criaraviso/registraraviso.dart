import 'dart:convert';
import 'dart:io';

import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/models/size_config.dart';
import 'package:defesa_civil/screens/registered/criaraviso/services/services.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_icons/feather.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';

class RegistroAviso extends StatefulWidget {
  String api_key;

  RegistroAviso(this.api_key);

  @override
  _RegistroAvisoState createState() => _RegistroAvisoState(api_key);
}

class _RegistroAvisoState extends State<RegistroAviso> {
  _RegistroAvisoState(this.api_key);

  GlobalKey<FormState> _keyValidaForm = GlobalKey<FormState>();
  bool exibeFuture = false;
  String api_key;
  List<File> _image = new List(3);
  TextEditingController descController = TextEditingController();
  TextEditingController endController = TextEditingController();
  TextEditingController numController = TextEditingController();
  TextEditingController bairroController = TextEditingController();
  List<DropdownMenuItem<String>> _dropDownMenuItems;
  String _incidenteAtual;
  int imageUpld = 0;
  List _tiposIncidentes = [
    "Alagamento",
    "Queda de Arvore",
    "Deslizamento de Terra",
    "Queda de Muro"
  ];

  Position position;

  @override
  void initState() {
    _tiposIncidentes.sort();
    _dropDownMenuItems = getDropDownMenuItems();
    _incidenteAtual = _dropDownMenuItems[0].value;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.orange,
        onPressed: () async {
          print(_image[0]);
          if (_image[0] == null) {
            setState(() {
              imageUpld = 1;
            });

            print(imageUpld);
          } else {
            setState(() {
              imageUpld = 0;
            });
            print("Entrou else");
          }

          if (_keyValidaForm.currentState.validate() && imageUpld == 0) {
            showDialog(
                barrierDismissible: false,
                context: context,
                builder: (BuildContext context) {
                  return FutureBuilder(
                    future: uploadAviso(imageFile: _image, incidente: _incidenteAtual, descricao: descController.text,
                        endereco: endController.text, numero: numController.text, bairro: bairroController.text),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState != ConnectionState.done)
                        return AlertDialog(
                          title: Text(
                            "Enviando",
                            style: _textoNegrito(),
                          ),
                          content: Row(
                            children: <Widget>[
                              CircularProgressIndicator(
                                valueColor: AlwaysStoppedAnimation<Color>(
                                    Color.fromRGBO(246, 129, 33, 1)),
                              ),
                              Padding(
                                padding: EdgeInsets.symmetric(horizontal: 10),
                              ),
                              Text(
                                "Enviando aviso",
                                style: _texto(),
                              )
                            ],
                          ),
                        );
                      if (snapshot.hasError) {
                        return AlertDialog(
                          title: Text(
                            "Erro",
                            style: _textoNegrito(),
                          ),
                          content: Row(
                            children: <Widget>[
                              Icon(
                                Feather.getIconData("x"),
                                color: Colors.red,
                                size: 40,
                              ),
                              Padding(
                                padding: EdgeInsets.symmetric(horizontal: 10),
                              ),
                              Text(
                                "Houve um erro ao carregar",
                                style: _texto(),
                              )
                            ],
                          ),
                        );
                      } else {
                        return AlertDialog(
                          title: Text("Sucesso", style: _textoNegrito()),
                          content: Row(
                            children: <Widget>[
                              Icon(
                                Feather.getIconData("check"),
                                color: Colors.green,
                                size: 40,
                              ),
                              Padding(
                                padding: EdgeInsets.symmetric(horizontal: 10),
                              ),
                              Flexible(
                                child: Text("Aviso enviado com sucesso",
                                    style: _texto()),
                              )
                            ],
                          ),
                          actions: <Widget>[
                            FlatButton(
                                onPressed: () {
                                  Navigator.of(context)
                                      .popUntil((route) => route.isFirst);
                                },
                                child: Text('Fechar')),
                          ],
                        );
                      }
                    },
                  );
                });
          }
        },
        child: Icon(Feather.getIconData("send")),
      ),
      appBar: AppBar(
        title: Text("Titulo"),
        backgroundColor: Color.fromRGBO(246, 129, 33, 1),
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
        child: SingleChildScrollView(
          child: Form(
            key: _keyValidaForm,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Text(
                      "Tipo: ",
                      style: TextStyle(
                          fontSize: SizeConfig.blockSizeHorizontal * 4.5),
                    ),
                    Padding(
                      padding: EdgeInsets.only(left: 10),
                    ),
                    DropdownButton(
                      value: _incidenteAtual,
                      items: _dropDownMenuItems,
                      onChanged: changedDropDownItem,
                    ),
                  ],
                ),
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 10),
                ),
                TextFormField(
                  controller: descController,
                  keyboardType: TextInputType.multiline,
                  maxLines: null,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(), labelText: "Descrição"),
                  validator: (value) {
                    if (value.length == 0 || value.isEmpty)
                      return "Digite a descrição";
                    else if (value.length < 5) return "Dê uma descrição maior";
                  },
                ),
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 10),
                ),
                Row(
                  children: <Widget>[
                    Container(
                      width: SizeConfig.blockSizeHorizontal * 65,
                      child: TextFormField(
                          controller: endController,
                          keyboardType: TextInputType.multiline,
                          maxLines: null,
                          decoration: InputDecoration(
                              border: OutlineInputBorder(),
                              labelText: "Av/Rua..."),
                          validator: (value) {
                            if (value.length == 0 || value.isEmpty)
                              return "Digite o endereço";
                            else if (value.length < 5)
                              return "Escreva um endereço válido";
                          }),
                    ),
                    Padding(
                      padding: EdgeInsets.only(left: 10),
                    ),
                    Expanded(
                      child: TextFormField(
                          controller: numController,
                          inputFormatters: <TextInputFormatter>[
                            WhitelistingTextInputFormatter.digitsOnly
                          ],
                          keyboardType: TextInputType.number,
                          decoration: InputDecoration(
                              border: OutlineInputBorder(), labelText: "Nº"),
                          validator: (value) {
                            if (value.length == 0 || value.isEmpty)
                              return "Digite o número";
                            else if (value.length < 1)
                              return "Escreva um número válido";
                          }),
                    )
                  ],
                ),
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 10),
                ),
                TextFormField(
                    controller: bairroController,
                    keyboardType: TextInputType.multiline,
                    maxLines: null,
                    decoration: InputDecoration(
                        border: OutlineInputBorder(), labelText: "Bairro"),
                    validator: (value) {
                      if (value.length == 0 || value.isEmpty)
                        return "Digite o bairro";
                      else if (value.length < 2)
                        return "Escreva um bairro válido";
                    }),
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 10),
                ),
                Row(
                  children: <Widget>[
                    Text(
                      "Imagem: ",
                      style: TextStyle(
                          fontSize: SizeConfig.blockSizeHorizontal * 4.5),
                    ),
                    imageUpld == 1
                        ? Text(
                            "Insira pelo menos uma imagem",
                            style: TextStyle(color: Colors.red),
                          )
                        : Container()
                  ],
                ),
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 5),
                ),
                Wrap(
                  children: <Widget>[
                    _image[0] == null
                        ? _imagemVaziaQuadrada(0)
                        : _imagemQuadrada(0, context),
                    Padding(
                      padding: EdgeInsets.only(right: 5),
                    ),
                    _image[1] == null
                        ? _imagemVaziaQuadrada(1)
                        : _imagemQuadrada(1, context),
                    Padding(
                      padding: EdgeInsets.only(right: 5),
                    ),
                    _image[2] == null
                        ? _imagemVaziaQuadrada(2)
                        : _imagemQuadrada(2, context),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  _textoNegrito() {
    return TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: SizeConfig.blockSizeHorizontal * 6);
  }

  _texto() {
    return TextStyle(
        color: Colors.black54,
        fontWeight: FontWeight.w500,
        fontSize: SizeConfig.blockSizeHorizontal * 4.5);
  }

  Widget _imagemQuadrada(int imageNumber, BuildContext context) {
    return GestureDetector(
        child: Hero(
          tag: 'image$imageNumber',
          child: Container(
            height: SizeConfig.blockSizeHorizontal * 30,
            width: SizeConfig.blockSizeHorizontal * 30,
            decoration: new BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                  color: Colors.orange,
                  width: SizeConfig.blockSizeHorizontal * 0.6),
              image: DecorationImage(
                image: FileImage(_image[imageNumber]),
                fit: BoxFit.fill,
              ),
            ),
          ),
        ),
        onTap: () {
          Navigator.push(context, MaterialPageRoute(builder: (_) {
            return DetailScreen(_image, imageNumber);
          }));
        });
  }

  Widget _imagemVaziaQuadrada(int imageNumber) {
    return GestureDetector(
      onTap: () => getImage(imageNumber),
      child: Container(
        height: SizeConfig.blockSizeHorizontal * 30,
        width: SizeConfig.blockSizeHorizontal * 30,
        decoration: new BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
              width: SizeConfig.blockSizeHorizontal * 0.6,
              color: Colors.orange),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Icon(
                Feather.getIconData('camera'),
                size: SizeConfig.blockSizeVertical * 8,
              ),
              Text(
                "+ inserir",
                style: TextStyle(fontSize: SizeConfig.blockSizeHorizontal * 4),
              )
            ],
          ),
        ),
      ),
    );
  }

  void changedDropDownItem(String selectedCity) {
    print("Selected city $selectedCity, we are going to refresh the UI");
    setState(() {
      _incidenteAtual = selectedCity;
    });
  }

  Future getImage(int imageNumber) async {
    var image = await ImagePicker.pickImage(source: ImageSource.camera);

    print(image.path);
    image = await testCompressAndGetFile(image, image.path);
    setState(() {
      if (_image[0] == null)
        _image[0] = image;
      else if (_image[1] == null)
        _image[1] = image;
      else
        _image[imageNumber] = image;
    });
  }

  List<DropdownMenuItem<String>> getDropDownMenuItems() {
    List<DropdownMenuItem<String>> items = new List();
    for (String incidente in _tiposIncidentes) {
      // here we are creating the drop down menu items, you can customize the item right here
      // but I'll just use a simple text for this
      items.add(
          new DropdownMenuItem(value: incidente, child: new Text(incidente)));
    }
    return items;
  }
}

Future<File> testCompressAndGetFile(File file, String targetPath) async {
  print(file.lengthSync());
  var result = await FlutterImageCompress.compressAndGetFile(
    file.absolute.path,
    targetPath,
    quality: 40,
  );

  print(result.lengthSync());
  return result;
}

class DetailScreen extends StatefulWidget {
  List<File> image;
  int imageNumber;

  DetailScreen(this.image, this.imageNumber);

  @override
  _DetailScreenState createState() => _DetailScreenState(image, imageNumber);
}

class _DetailScreenState extends State<DetailScreen>
    with SingleTickerProviderStateMixin {
  TabController _tabController;
  List<File> image;
  int imageNumber;
  int total = 0;
  List<Widget> list = List<Widget>();

  buildWidgets(BuildContext context) {
    print(total);
    print(imageNumber);
    for (int i = 0; i < total; i++) {
      list.add(GestureDetector(
        child: Center(
          child: Hero(
            tag: 'image$imageNumber',
            child: Image.file(
              image[i],
            ),
          ),
        ),
        onTap: () {
          Navigator.pop(context);
        },
      ));
    }
    return list;
  }

  _DetailScreenState(this.image, this.imageNumber);

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < image.length; i++) if (image[i] != null) total++;

    _tabController = new TabController(vsync: this, length: total);
    if (total != 1) _tabController.animateTo(imageNumber);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: total,
      child: Scaffold(
        body: TabBarView(
          controller: _tabController,
          children: buildWidgets(context),
        ),
      ),
    );
  }
}
