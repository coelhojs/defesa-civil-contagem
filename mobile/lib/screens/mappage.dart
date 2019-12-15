import 'dart:async';

import 'package:defesa_civil/components/drawer.dart';
import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:geojson/geojson.dart';
import 'package:geolocator/geolocator.dart';
import 'package:geopoint/geopoint.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location_permissions/location_permissions.dart';
import 'package:url_launcher/url_launcher.dart';

class MapPage extends StatefulWidget {

  @override
  State<MapPage> createState() => MapPageState();
}

class MapPageState extends State<MapPage>
    {

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
    LocationPermissions().requestPermissions().then((result){
      print(result);
    });
    LocationPermissions().checkPermissionStatus().then((result){
      setState(() {

      });
      print(result.toString());
      print("AAAAAAAAAAAAAAAAAAAAAAAAAAaa");
    });
  }

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
          backgroundColor: Color(0xFF74D0EB),
          label: Text('Abrir Waze'),
          icon: Tab(icon: Image.asset('assets/images/waze.png', height: 30),),
          onPressed: () async {
            //_changeMapType();
            if (await canLaunch('https://waze.com/ul')) {
              await launch('https://waze.com/ul');
            }
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

        Color color;
        if(polygon.name == 'Alto') {
           color =
          Color(0x40FD2A2A);
        }
        else if(polygon.name == 'Inexistente ou Baixo'){
          color =
              Color(0x40FAFF44);
        }
        else if(polygon.name == 'Médio'){
          color =
              Color(0x70F7FF00);
        }
        else if(polygon.name == 'Muito Alto'){
          color =
              Color(0x70CD0000);
        }
        else{
          color =
              Color((math.Random().nextDouble() * 0xFFFFFF).toInt() << 0)
                  .withOpacity(0.0);
        }

        Polygon poly = Polygon(
          consumeTapEvents: true,
          onTap: () {
          },

          strokeColor: color,
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
    final nameProperty = "Grau_de_Ri";
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
