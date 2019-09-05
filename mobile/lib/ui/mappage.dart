import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:geojson/geojson.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapPage extends StatefulWidget {
  @override
  State<MapPage> createState() => MapPageState();
}

class MapPageState extends State<MapPage> {
  MapType _defaultMapType = MapType.normal;
  GoogleMapController mapController;

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
    mapController = controller;
  }

  List<LatLng> _points = <LatLng>[
    new LatLng(-19.918623, -50.082073),
    new LatLng(-22.918623, -60.082073),
    new LatLng(-25.918623, -40.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),
    new LatLng(-27.918623, -44.082073),

  ];
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
          polygons: Set<Polygon>.of(<Polygon>[
            new Polygon(
                polygonId: PolygonId('Nice one'),
                fillColor: Colors.blue.withOpacity(0.1),
                points: _points)
          ]),
        ),
      ]),
      floatingActionButton: FloatingActionButton.extended(
          label: Text('Trocar mapa!'),
          icon: Icon(Icons.map),
          onPressed: () async {
            _changeMapType();
            String teste = await loadAsset();
            GeoJsonFeatureCollection test = await featuresFromGeoJson(teste, verbose: true);
            //print(test.collection);
          }),
    );
  }

  Future<String> loadAsset() async {
    return await rootBundle.loadString('assets/coordinates/ocorrencias.geojson');
  }

  Future<GeoJsonFeatureCollection> featuresFromGeoJson(String data,
      {String nameProperty, bool verbose = false}) async {
    final featureCollection = GeoJsonFeatureCollection();
    final geojson = GeoJson();
    await geojson.parse(data, nameProperty: nameProperty, verbose: verbose);
    for (final feature in geojson.features) {
      featureCollection.collection.add(feature);
    }
    geojson.dispose();
    return featureCollection;
  }
}
