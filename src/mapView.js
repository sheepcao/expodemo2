import React, { Component } from 'react';
import {
  Image,
  WebView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
 } from 'react-native';

var DEFAULT_URL = 'http://cgx.nwpu.info/demo/map.php';

export default class MapViewExample extends Component {

  render() {
    return (
      <View style={{flex:1}}>
          <Text style={{height:40,marginTop:20}}>简单的网页显示</Text>
          <WebView style={styles.webview_style}
            source={{uri: 'www.baidu.com'}}
            startInLoadingState={true}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            onLoad={(e) => console.log('onLoad')}
            onLoadEnd={(e) => console.log('onLoadEnd')}
            onLoadStart={(e) => console.log('onLoadStart')}
            // renderError={() => {
            //             console.log('renderError')
            //             return <View><Text>renderError回调了，出现错误</Text></View>
            //         }}
            renderLoading={() => {
                        return <View style = {{justifyContent:'center',alignItems:'center'}}><Text>Loading...</Text></View>
                    }}
            >
          </WebView>
        </View>
    );
  }
}
var styles =StyleSheet.create({
    webview_style:{
       backgroundColor:'transparent',
    }
});
