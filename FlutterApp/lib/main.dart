import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(

        body: MyWebView(),
      ),
    );
  }
}

class MyWebView extends StatefulWidget {
  @override
  _MyWebViewState createState() => _MyWebViewState();
}

class _MyWebViewState extends State<MyWebView> {
  final String webURL = 'https://7224-105-67-6-241.ngrok-free.app/login';

  @override
  Widget build(BuildContext context) {
    return WebView(
      initialUrl: webURL,
      javascriptMode: JavascriptMode.unrestricted,
    );
  }
}
