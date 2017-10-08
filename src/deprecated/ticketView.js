import React from 'react';
import { DrawerNavigator,DrawerItems } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TicketScreen = ({ navigation }) => (
  <MyNavScreen banner={'Tickets Screen'} navigation={navigation} />
);
TicketScreen.navigationOptions = {
  drawerLabel: 'Tickets',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons
      name="move-to-inbox"
      size={24}
      style={{ color: tintColor }}
    />
  ),
};

export default TicketScreen;
