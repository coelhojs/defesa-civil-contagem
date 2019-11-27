
import 'package:onesignal_flutter/onesignal_flutter.dart';

class BlocHome{

  void initOneSignal(){
    OneSignal.shared.init("122af564-4e53-4b67-9abd-e1b6232c05f7");
    OneSignal.shared.setInFocusDisplayType(OSNotificationDisplayType.notification);
  }

  Future<String> getPlayerId()async{
    var status = await OneSignal.shared.getPermissionSubscriptionState();
    return status.subscriptionStatus.userId;
  }


}