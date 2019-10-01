import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:defesa_civil/helpers/constants.dart';
import 'package:defesa_civil/helpers/size_config.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_icons/feather.dart';
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

  bool exibeFuture = false;
  String api_key;
  List<File> _image = new List(3);
  TextEditingController descController = TextEditingController();
  TextEditingController endController = TextEditingController();
  List<DropdownMenuItem<String>> _dropDownMenuItems;
  String _incidenteAtual;
  List _tiposIncidentes = [
    "Alagamento",
    "Queda de Arvore",
    "Deslizamento de Terra",
    "Queda de Muro"
  ];

  @override
  void initState() {
    _tiposIncidentes.sort();
    _dropDownMenuItems = getDropDownMenuItems();
    _incidenteAtual = _dropDownMenuItems[0].value;
    super.initState();
  }

  _fetchData() async {
    await Future.delayed(Duration(seconds: 2));
    return 'REMOTE DATA';
  }

  Future inserir()async {
    List<String> base64Image = List(3);
    for (int i = 0; i < 3; i++) {
      if (_image[i] != null) {
        List<int> imageBytes = _image[i].readAsBytesSync();
        base64Image[i] = base64Encode(imageBytes);
      }
    }

    var url = '$REQ/acesso/chamados';
          var response = await http.post(url, headers: {
            "authorization": "Bearer $api_key"
          }, body: {
            "tipo": "$_incidenteAtual",
            "descricao": "${descController.text}",
            //"foto": "${base64Image[0]}",
          });
          print("CORPO " + response.body);
          if(response.body!=null){
            setState(() {
              exibeFuture=true;
            });
          }
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.orange,
        onPressed: () async {

          showDialog(
              context: context,
              builder: (BuildContext context) {
                return FutureBuilder(
                  future: inserir(),
                  builder: (context,snapshot){
                    if (snapshot.connectionState != ConnectionState.done)
                    return AlertDialog(
                      title: Text("Enviante"),
                      content: Row(
                        children: <Widget>[
                          CircularProgressIndicator(
                            valueColor: AlwaysStoppedAnimation<Color>(
                                Color.fromRGBO(246, 129, 33, 1)),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(horizontal: 10),
                          ),
                          Text("Enviante")
                        ],
                      ),
                    );
                    if (snapshot.hasError) {
                      return Text(
                          "Houve um erro ao carregar.");
                    }
                    else{
                      return AlertDialog(
                        title: Text("Deu bom"),
                        content: Row(
                          children: <Widget>[
                            Icon(Feather.getIconData("check-circle"), color: Color.fromRGBO(246, 129, 33, 1), size: 40,),
                            Padding(
                              padding: EdgeInsets.symmetric(horizontal: 10),
                            ),
                            Text("Deu bom")
                          ],
                        ),
                      );
                    }
                  },
                );
              });
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
                keyboardType: TextInputType.multiline,
                maxLines: null,
                decoration: InputDecoration(
                    border: OutlineInputBorder(), labelText: "Descrição"),
              ),
              Padding(
                padding: EdgeInsets.symmetric(vertical: 10),
              ),
              TextFormField(
                keyboardType: TextInputType.multiline,
                maxLines: null,
                decoration: InputDecoration(
                    border: OutlineInputBorder(), labelText: "Endereço"),
              ),
              Padding(
                padding: EdgeInsets.symmetric(vertical: 10),
              ),
              Text(
                "Imagem: ",
                style:
                    TextStyle(fontSize: SizeConfig.blockSizeHorizontal * 4.5),
              ),
              Padding(
                padding: EdgeInsets.symmetric(vertical: 5),
              ),
              Wrap(
                children: <Widget>[
                  _image[0] == null
                      ? _circuloSemImagem(0)
                      : _circuloComImagem(0),
                  Padding(
                    padding: EdgeInsets.only(right: 5),
                  ),
                  _image[1] == null
                      ? _circuloSemImagem(1)
                      : _circuloComImagem(1),
                  Padding(
                    padding: EdgeInsets.only(right: 5),
                  ),
                  _image[2] == null
                      ? _circuloSemImagem(2)
                      : _circuloComImagem(2),
                ],
              ),


            ],
          ),
        ),
      ),
    );
  }

  Widget _circuloComImagem(int imageNumber) {
    return Container(
      height: SizeConfig.blockSizeVertical * 15,
      width: SizeConfig.blockSizeHorizontal * 30,
      decoration: new BoxDecoration(
        image: DecorationImage(
          image: FileImage(_image[imageNumber]),
          fit: BoxFit.fill,
        ),
        shape: BoxShape.circle,
      ),
    );
  }

  Widget _circuloSemImagem(int imageNumber) {
    return GestureDetector(
      onTap: () => getImage(imageNumber),
      child: Container(
        height: SizeConfig.blockSizeVertical * 15,
        width: SizeConfig.blockSizeHorizontal * 30,
        decoration: new BoxDecoration(
          border: Border.all(width: 3, color: Colors.orange),
          shape: BoxShape.circle,
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

    setState(() {
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
