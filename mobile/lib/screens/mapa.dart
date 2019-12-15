import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class Mapa extends StatefulWidget {
  @override
  _MapaState createState() => _MapaState();
}

class _MapaState extends State<Mapa> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  bool _isLoading = true;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        WebView(
          initialUrl:
              'https://www.google.com/maps/d/u/0/viewer?mid=1jGk3R86ZSeiSnjptYkHVfD1af5Ktk_uH&ll=-19.89133549861764%2C-44.08374249999997&z=11&t=m',
          javascriptMode: JavascriptMode.unrestricted,
          onPageFinished: (e) {
            setState(() {
              _isLoading = false;
            });
          },
        ),
        _isLoading
            ? Center(
                child: CircularProgressIndicator(
                    valueColor: new AlwaysStoppedAnimation<Color>(
                        Color.fromRGBO(246, 129, 33, 1))))
            : Container(),
      ],
    );
  }
}
