import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapPage extends StatefulWidget {
  @override
  State<MapPage> createState() => MapPageState();
}

class MapPageState extends State<MapPage> {
  MapType _defaultMapType = MapType.normal;
  Completer<GoogleMapController> _controller = Completer();

  void _changeMapType() {
    setState(() {
      _defaultMapType = _defaultMapType == MapType.normal
          ? MapType.satellite
          : MapType.normal;
    });
  }

  CameraPosition _initialPosition = CameraPosition(
    target: LatLng(-19.918623, -44.082073),
    zoom: 14.4746,
  );

  void _onMapCreated(GoogleMapController controller) {
    _controller.complete(controller);
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: Stack(children: <Widget>[
        GoogleMap(
          tiltGesturesEnabled: false,
          mapType: _defaultMapType,
          myLocationEnabled: true,
          onMapCreated: _onMapCreated,
          initialCameraPosition: _initialPosition,
        ),
      ]),
      floatingActionButton: FloatingActionButton.extended(
          label: Text('Trocar mapa!'),
          icon: Icon(Icons.map),
          onPressed: () {
            _changeMapType();
          }),
    );
  }
}