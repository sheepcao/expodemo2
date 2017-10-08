import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import colors from 'HSColors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Button,
  Text,
  FormInput,
  FormLabel
} from 'react-native-elements';

class EditForms extends Component {

  constructor(props) {
   super(props);
   this.state =
   {
    //  testData:this.props.navigation.state.params.testData
     testTitle : this.props.navigation.state.params.testData.title,
     testDescription:this.props.navigation.state.params.testData.description

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
     console.log('1111');
     this.props.navigation.state.params.callback({testTitle:this.state.testTitle,testDescription:this.state.testDescription})
     this.props.navigation.goBack();
   }

  render() {
    return (
        <View>
          <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.heading}>
            待测功能
          </FormLabel>
          <FormInput
            ref="form2"
            inputStyle={{fontSize:22,paddingRight:'10%'}}
            containerRef="containerRefYOYO"
            textInputRef="textInputRef"
            // placeholder={this.props.navigation.state.params.title}
            onChangeText={(text)=>this.setState({testTitle:text})}
            value = {this.state.testTitle}
          />
          {
            this.state.testDescription?
            <FormLabel
              textInputRef="textInputRef"
              containerStyle={styles.labelContainerStyle}
              labelStyle={styles.heading}
            >
              功能描述
            </FormLabel>
            :null
          }
          {
            this.state.testDescription?
            <FormInput
              inputStyle={{fontSize:22,paddingRight:'10%'}}
              textInputRef="textInputRef"
              ref="form1"
              onChangeText={(text)=>this.setState({testDescription:text})}
              value = {this.state.testDescription}
            />:null
          }

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
