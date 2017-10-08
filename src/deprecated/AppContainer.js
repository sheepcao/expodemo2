import React from 'react';
import { Button, Platform, View, StyleSheet,Text,Dimensions,Image } from 'react-native';
import { DrawerNavigator,DrawerItems } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TicketScreen from './ticketView';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = (props) => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View
      style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        source={require('./images/logo.png')}
        style={{ width: SCREEN_WIDTH * 0.57 }}
        resizeMode="contain"
      />
    </View>
    <DrawerItems {...props} />
  </View>
);
const MyNavScreen = ({ navigation, banner }) => (
  <View style={styles.container}>
    <Text>{banner}</Text>
    <Button
      onPress={() => navigation.navigate('DrawerOpen')}
      title="Open drawer"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </View>
);



const DraftsScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
DraftsScreen.navigationOptions = {
  drawerLabel: 'Drafts',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  ),
};

const AppContainer = DrawerNavigator(
  {
    Tickets: {
      path: '/',
      screen: TicketScreen,
    },
    Drafts: {
      path: '/sent',
      screen: DraftsScreen,
    },
  },
  {
    initialRouteName: 'Drafts',
    contentOptions: {
      activeTintColor: '#548ff7',
           activeBackgroundColor: 'transparent',
           inactiveTintColor: '#ffffff',
           inactiveBackgroundColor: 'transparent',
           labelStyle: {
             fontSize: 15,
             marginLeft: 0,
           },

     },
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: CustomDrawerContentComponent,
  }
);


const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default AppContainer;
