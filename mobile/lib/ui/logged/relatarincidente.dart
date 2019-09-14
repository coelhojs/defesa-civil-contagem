import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/feather.dart';

class RelatarIncidente extends StatefulWidget {
  @override
  _RelatarIncidenteState createState() => _RelatarIncidenteState();
}

class _RelatarIncidenteState extends State<RelatarIncidente> {
  Future<String> future = Future.delayed(
    Duration(seconds: 2),
        () => "Latest News",
  );


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(onPressed: (){}, child: Icon(Feather.getIconData("plus")),),
      body: Container(
        padding: EdgeInsets.all(10),
        child: Column(
          children: <Widget>[
            Text("Chamados", style: TextStyle(fontSize: 20),),
            FutureBuilder(
              future: future,
              builder: (context,snapshot){
                if(snapshot.connectionState!= ConnectionState.done){
                  return CircularProgressIndicator();
                }
                return Text(snapshot.data);
              },
            )
          ],
        ),
      ),
    );
  }
}
