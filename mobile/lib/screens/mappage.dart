import 'dart:async';

import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:pedantic/pedantic.dart';
import 'package:geojson/geojson.dart';
import 'package:geopoint/geopoint.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapPage extends StatefulWidget {
  @override
  State<MapPage> createState() => MapPageState();
}

class MapPageState extends State<MapPage> {
  MapType _defaultMapType = MapType.normal;
  GoogleMapController mapController;

  int teste=0;
  bool _result = false;

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


  @override
  void initState() {
    super.initState();
    processData().then((result){
      setState(() {
        _result=true;
      });
    });
  }

  List<LatLng> _points = <LatLng>[
    new LatLng(-47.900390625, -9.622414142924805),
    new LatLng(-50.71289062499999, -17.056784609942543),
    new LatLng(-47.28515625, -18.396230138028812),
    new LatLng(-47.900390625, -9.622414142924805),
  ];

  List<LatLng> _points2 = <LatLng>[
    new LatLng(-19.918623, -50.082073),
    new LatLng(-22.918623, -60.082073),
    new LatLng(-25.918623, -40.082073),
  ];

  @override
  Widget build(BuildContext context) {
    if (!_result) {
      // This is what we show while we're loading
      return Scaffold(
        body: GoogleMap(
          tiltGesturesEnabled: false,
          mapType: _defaultMapType,
          myLocationEnabled: true,
          onMapCreated: _onMapCreated,
          initialCameraPosition: _initialPosition,
          polygons: Set<Polygon>.of(polygons),

        ),
      );
    }

    return Scaffold(
      body: Stack(children: <Widget>[
        GoogleMap(
          tiltGesturesEnabled: false,
          mapType: _defaultMapType,
          myLocationEnabled: true,
          onMapCreated: _onMapCreated,
          initialCameraPosition: _initialPosition,
          polygons: Set<Polygon>.of(polygons),

        )
      ]),
      floatingActionButton: FloatingActionButton.extended(
          backgroundColor: Colors.black54,
          label: Text('Trocar mapa!'),
          icon: Icon(Icons.map),
          onPressed: () async {
            _changeMapType();
          }),
    );
  }

  final polygons = <Polygon>[];

  Future<bool> processData() async {
    final geojson = GeoJson();
    geojson.processedPolygons.listen((GeoJsonPolygon multiPolygon) {
      for (final polygon in multiPolygon.geoSeries) {
        final geoSerie = GeoSerie(
            type: GeoSerieType.polygon,
            name: polygon.name,
            geoPoints: <GeoPoint>[]);

        geoSerie.geoPoints.addAll(polygon.geoPoints);


        final color =
        Color((math.Random().nextDouble() * 0xFFFFFF).toInt() << 0)
            .withOpacity(0.3);
        final poly = Polygon(
          polygonId: PolygonId('Nice one'),
          fillColor: color,
          points: toLatLng(geoSerie.geoPoints, ignoreErrors: true),
        );
        setState(() => polygons.add(poly));
      }
    });
    geojson.endSignal.listen((bool _) => geojson.dispose());
    // The data is from https://datahub.io/core/geo-countries
    final data = await rootBundle.loadString('assets/coordinates/risco.geojson');
    final nameProperty = "Name";
    await geojson.parse(data, nameProperty: nameProperty, verbose: true);

    return true;
  }

  List<LatLng> toLatLng(List<GeoPoint> geoPoints,{bool ignoreErrors = false}) {
    final points = <LatLng>[];
    for (final geoPoint in geoPoints) {
      try {
        points.add(LatLng(geoPoint.latitude,geoPoint.longitude));
      } catch (_) {
        if (!ignoreErrors) {
          rethrow;
        }
      }
    }
    return points;
  }
}
