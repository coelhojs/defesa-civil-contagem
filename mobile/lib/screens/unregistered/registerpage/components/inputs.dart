import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class Input extends StatelessWidget {
  Input({
    @required this.focusNode,
    @required this.controller,
    @required this.tamanho,
    inputFormatters,
    @required this.tipoTeclado,
    @required this.label,
    this.validator
  });
  FocusNode focusNode;
  TextEditingController controller;
  int tamanho;
  var inputFormatters;
  TextInputType tipoTeclado;
  String label;
  Function validator;


  @override
  Widget build(BuildContext context) {
    return Theme(
      child: TextFormField(
        style: TextStyle(fontWeight: FontWeight.w500),
        focusNode: focusNode,
        controller: controller,
        maxLength: tamanho,
        inputFormatters: inputFormatters ?? this.inputFormatters,
        keyboardType: tipoTeclado,
        decoration: InputDecoration(
          border: UnderlineInputBorder(),
          labelText: label,
        ),
        validator: validator ?? this.validator,
      ),
      data: Theme.of(context).copyWith(
        primaryColor: Color.fromRGBO(246, 129, 33, 1),
      ),
    );
  }
}
