import 'dart:convert';

import 'dart:typed_data';

class Aviso{
  String status;
  String tipo;
  String descricao;
  Map<String, dynamic> coordenadas = { // Coordenada do cidadão
    "latitude": "",
    "longitude": ""
  };
  Map<String, dynamic> endereco = {
  "rua": "",
  "numero": "",
  "bairro": ""
  };
  List fotos;
  List<Uint8List> fotos2 = [];
  String url;


  Map<String, dynamic> toJson() => {
    'status': status,
    'tipo': tipo,
    'descricao': descricao,
    'coordenadas': coordenadas,
    'endereco': endereco,
    'fotos': fotos,
    'url': url
  };

  Aviso.fromJson(Map<String, dynamic> json)
      : status = json['status'],
        tipo = json['tipo'],
        descricao = json['descricao'],
        coordenadas = json['coordenadas'],
        endereco = json['endereco'],
        fotos = json['fotos'],
        url = json['url'];

  @override
  String toString() {
    Map<String, dynamic> json = toJson();
    return jsonEncode(json);
  }


}