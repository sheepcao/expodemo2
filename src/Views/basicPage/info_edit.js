import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import colors from 'HSColors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Button,
  Text,
  FormInput,
  FormLabel,
  CheckBox,
  SearchBar,
} from 'react-native-elements';

class EditForms extends Component {

  constructor(props) {
   super(props);
   this.state =
   {
    //  testData:this.props.navigation.state.params.testData
     infoTitle : this.props.navigation.state.params.testData.titleKey,
     infoContent:this.props.navigation.state.params.testData.titleValue

   };
 }

   static navigationOptions = ({
     navigation,
     screenProps
   }) => ({
     // headerTitle:navigation.state.params?navigation.state.params.item.title:'工单详情',
     headerTitle: '内容整改'

   });

   confirmModify = () =>{
     console.log('confirmModify');
     this.props.navigation.state.params.callback({infoContent:this.state.infoContent})
     this.props.navigation.goBack();
   }

  render() {
    return (
        <View>
          <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.heading}>
            {this.state.infoTitle}
          </FormLabel>
          <FormInput
            ref="form3"
            inputStyle={{fontSize:22,paddingRight:'10%'}}
            containerRef="containerRefInfo"
            textInputRef="textInputRefInfof"
            onChangeText={(text)=>this.setState({infoContent:text})}
            value = {this.state.infoContent}
          />


          <Button
            onPress={() => this.confirmModify()}
            icon={{ name: 'done' }}
            buttonStyle={{ marginTop: 15 ,backgroundColor:colors.secondary2}}
            title="确认修改"
          />

        </View>
      );
  }
}


const styles = StyleSheet.create({
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.secondary2,
  },
  heading: {
    color: colors.grey2,
    marginTop: 10,
    fontSize: 21,
  },
  labelContainerStyle: {
    margin:12,
  },
});

export default EditForms;
