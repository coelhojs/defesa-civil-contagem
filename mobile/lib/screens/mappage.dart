import 'dart:async';

import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:geojson/geojson.dart';
import 'package:geopoint/geopoint.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapPage extends StatefulWidget {

  @override
  State<MapPage> createState() => MapPageState();
}

class MapPageState extends State<MapPage>
    with AutomaticKeepAliveClientMixin{

  @override
  bool get wantKeepAlive => true;

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

  @override
  void initState() {
    super.initState();
    processData();
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
    return Scaffold(
      body: Stack(children: <Widget>[
        GoogleMap(
          tiltGesturesEnabled: false,
          mapType: _defaultMapType,
          myLocationEnabled: true,
          onMapCreated: _onMapCreated,
          initialCameraPosition: _initialPosition,
          polygons: Set<Polygon>.of(polygons),
          markers: Set<Marker>.of(markers),
        )
      ]),
      floatingActionButton: FloatingActionButton.extended(
          backgroundColor: Colors.black54,
          label: Text('Trocar mapa!'),
          icon: Icon(Icons.map),
          onPressed: () async {
            //_changeMapType();

            i++;
            final color =
                Color((math.Random().nextDouble() * 0xFFFFFF).toInt() << 0)
                    .withOpacity(0.3);
            Polygon poly = Polygon(
              consumeTapEvents: true,
              onTap: () {
                print("OI");
              },
              polygonId: PolygonId(
                  "${(math.Random().nextDouble() * 0xFFFFFF).toInt() << 0}"),
              fillColor: color,
              points: _points,
            );
            Polygon poly2 = Polygon(
              consumeTapEvents: true,
              onTap: () {
                print(i.toString());
              },
              polygonId: PolygonId(
                  "${(math.Random().nextDouble() * 0xFFFFFF).toInt() << 0}"),
              fillColor: color,
              points: _points2,
            );
            setState(() => polygons.add(poly));
            setState(() => polygons.add(poly2));
            i++;
            print(i);
          }),
    );
  }

  final polygons = <Polygon>[];
  final markers = <Marker>[];
  int i = 0;

  Future<bool> processData() async {
    final geojson = GeoJson();

    final data =
        await rootBundle.loadString('assets/coordinates/mapaNovo.geojson');

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
        Polygon poly = Polygon(
          consumeTapEvents: true,
          onTap: () {
          },
          polygonId: PolygonId(
              "${(math.Random().nextDouble() * 0xFFFFFF).toInt() << 0}"),
          fillColor: color,
          points: toLatLng(geoSerie.geoPoints, ignoreErrors: true),
        );
        setState(() => polygons.add(poly));
      }
    });

    geojson.processedPoints.listen((GeoJsonPoint point) {
      Marker mark = Marker(
        position: LatLng(point.geoPoint.latitude, point.geoPoint.longitude),
        markerId:
            MarkerId("${(math.Random().nextDouble() * 0xFFFFFF).toInt() << 0}"),
        icon: BitmapDescriptor.defaultMarker,
        infoWindow: InfoWindow(
          title: 'Really cool place',
          snippet: '5 Star Rating',
        ),
      );
      setState(() => markers.add(mark));
    });
    geojson.endSignal.listen((bool _) => geojson.dispose());
    // The data is from https://datahub.io/core/geo-countries
    final nameProperty = "Name";
    await geojson.parse(data, nameProperty: nameProperty, verbose: true);
    return true;
  }

  List<LatLng> toLatLng(List<GeoPoint> geoPoints, {bool ignoreErrors = false}) {
    final points = <LatLng>[];
    for (final geoPoint in geoPoints) {
      try {
        points.add(LatLng(geoPoint.latitude, geoPoint.longitude));
      } catch (_) {
        if (!ignoreErrors) {
          rethrow;
        }
      }
    }
    return points;
  }

  _showModal(BuildContext context) {
    showModalBottomSheet(
        context: context,
        builder: (BuildContext context) {
          return Container(
            child: Wrap(
              children: <Widget>[
                ListTile(
                    leading: Icon(Icons.music_note),
                    title: Text('Music'),
                    onTap: () {}),
                ListTile(
                  leading: Icon(Icons.videocam),
                  title: Text('Video'),
                  onTap: () {},
                ),
              ],
            ),
          );
        });
  }
}
