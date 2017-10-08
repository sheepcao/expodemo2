import React, {
  Component
} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  ListView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  Text,
  Card,
  List,
  ListItem,
  FormInput,
  FormLabel,
  normalize
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'


import Picker from 'react-native-picker';


import colors from 'HSColors';

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px * deviceW / basePx
}

const configInfo = [
  {
    id:'1',
    title: '项目标识号',
    content: [{
      title: '年份',
      type: 'edit',
      keyboardType:'numeric'
    }, {
      title: '测试类型编号',
      type: 'choose',
      options:['登记测试-01','确认测试-02','功能符合性-03']
    }, {
      title: '项目编号',
      type: 'edit',
    }]
  },
  {
    id:'2',
    title: '任务要求',
    content: [{
      title: '签发日期',
      type: 'date'
    }, {
      title: '开始测试日期',
      type: 'date',
    }, {
      title: '项目负责人',
      type: 'edit&choose',
      options:['黄晓昆','谭坚']
    },{
      title: '项目组长',
      type: 'edit',
    },{
      title: '项目成员',
      type: 'edit',
    }]
  },
  {
    id:'3',
    title: '产品类型',
    content: [{
      title: '类型',
      type: 'choose',
      options:['系统软件','支持软件','应用软件']
    }]
  },
  {
    id:'4',
    title: '测试类型',
    content: [{
      title: '类型',
      type: 'choose',
      options:['登记测试','确认测试','功能符合性测试']
    }]
  },
  {
    id:'5',
    title: '合同信息',
    content: [{
      title: '检测费用',
      type: 'edit',
      unit: '元'
    },{
      title: '差旅费用',
      type: 'edit',
      unit: '元'
    },{
      title: '签订地点',
      type: 'edit',
      unit: '元'
    },{
      title: '支付方式',
      type: 'choose',
      options:['乙方自行承担差旅费','甲方按合同价款的金额支付给乙方','甲方负责报销或承担甲方的差旅及食宿']
    },{
      title: '签订日期',
      type: 'date',
    }]
  },
  {
    id:'6',
    title: '测试地点类型',
    content: [{
      title: '类型',
      type: 'choose',
      options:['现场测试','用户方测试','实验室测试']
    }]
  }
];

// const TESTCASE_STORAGE_KEY = 'ASYNC_STORAGE_TEST_CASES'


export default class ConfigurationView extends Component {
  constructor(props) {
    super(props);

    let dateNow = new Date();
    let selectedValue = [
          [dateNow.getFullYear()],
          [dateNow.getMonth()+1],
          [dateNow.getDate()]
      ];

    configInfo.map((data, i) => {
      data.content.map((content, i) => {
        content['userInput'] = 'N/A';
        // if (content.type ==='date') {
        //   content['userInput'] = (selectedValue[0]+'年'+selectedValue[1]+'月'+selectedValue[2]+'日');
        // }
      })
    })
    this.state = {
      configs: configInfo,
      pickerSelectData:''
    };
  }

  _inputHandler(data,inputValue)
  {
    var finalValue = '';
    console.log(Array.isArray(inputValue));

    if(Array.isArray(inputValue))
    {
      for(var i = 0; i<inputValue.length ; i++)
      {
        if (inputValue[i].split('-').length>1) {
          finalValue = finalValue + inputValue[i].split('-')[1]
        }else {
          finalValue = finalValue + inputValue[i]
        }
      }
    }else {
      finalValue = inputValue
    }
    data.userInput = finalValue
    var allConfigs = this.state.configs
    this.setState({configs:allConfigs})
  }

  _showContentPicker(dataSource) {

        Picker.init({
            pickerData: dataSource.options,
            selectedValue: [dataSource.options[0]],

            onPickerConfirm: pickedValue => {
                console.log('onPickerConfirm', pickedValue);
                this._inputHandler(dataSource,pickedValue[0])
            },
            onPickerCancel: pickedValue => {
                console.log('onPickerCancel', pickedValue);
            },
            onPickerSelect: pickedValue => {
                console.log('onPickerSelect', pickedValue);
            }
        });
        Picker.show();
    }


    _createDateData() {
      let date = {};
   for(let i=1950;i<2050;i++){
       let month = {};
       for(let j = 1;j<13;j++){
           let day = [];
           if(j === 2){
               for(let k=1;k<29;k++){
                   day.push(k+'日');
               }
           }
           else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
               for(let k=1;k<32;k++){
                   day.push(k+'日');
               }
           }
           else{
               for(let k=1;k<31;k++){
                   day.push(k+'日');
               }
           }
           month[j+'月'] = day;
       }
       date[i+'年'] = month;
   }
   return date;
   }

   _showDatePicker(dataSource) {
     let date = new Date();
     let selectedValue = [
           [date.getFullYear()]+'年',
           [date.getMonth()+1]+'月',
           [date.getDate()]+'日'
       ];
       Picker.init({
           pickerData: this._createDateData(),
           selectedValue:selectedValue,
          //  pickerToolBarFontSize: 16,
          //  pickerFontSize: 16,
          //  pickerFontColor: [255, 0 ,0, 1],
           onPickerConfirm: (pickedValue, pickedIndex) => {
               console.log('date', pickedValue, pickedIndex);
               this._inputHandler(dataSource,(pickedValue[0]+pickedValue[1]+pickedValue[2]))
           },
           onPickerCancel: (pickedValue, pickedIndex) => {
               console.log('date', pickedValue, pickedIndex);
           },
           onPickerSelect: (pickedValue, pickedIndex) => {
               console.log('date', pickedValue, pickedIndex);
           }
       });
       Picker.show();
   }

   _popupDatePicker(data)
   {
     this.setState({pickerSelectData:data})


    //  this.state.configs.map((data, i) => {
    //    data.content.map((content, i) => {
    //      if (content.title === data.title) {
    //        this.setState({pickerSelectData:})
    //      }
         // if (content.type ==='date') {
         //   content['userInput'] = (selectedValue[0]+'年'+selectedValue[1]+'月'+selectedValue[2]+'日');
         // }
    //    })
    //  })

     this.datePicker.toggle();

   }

   setupDataSource()
   {
     if(!this.state.pickerSelectData.type)
     return ['test'];

     return  (this.state.pickerSelectData.type === 'date')?this._createDateData():this.state.pickerSelectData.options
   }
   setupselectedValue()
   {
     let date = new Date();
     let selectedValue = [
           [date.getFullYear()]+'年',
           [date.getMonth()+1]+'月',
           [date.getDate()]+'日'
       ];

     if(!this.state.pickerSelectData.type)
     {
       return ['test'];
     }else {

       var finalValue = (this.state.pickerSelectData.type==='date')?[selectedValue[0], selectedValue[1], selectedValue[2]]:[this.state.pickerSelectData.options[0]];
       return finalValue;
     }
   }

  renderCardConent(config, index) {
    var content = config.content;
    return(
      content.map((data, i) => {

      // data['options'].push('请选择');
      var inputComp;

      if (data.type ==='edit') {
          inputComp =
          <TextInput textAlign='center' style = {{flex:2,alignItems:'flex-end',fontSize:normalize(14),marginLeft: 5, marginBottom:0, color:'black'}}
            placeholder='点击输入'
            placeholderTextColor = {colors.grey3}
            keyboardType = {data.keyboardType}
            onChangeText={(text)=>
              {
                this._inputHandler(data,text)
              }
            }
          />
      }else if (data.type ==='choose')
      {
        inputComp =
        <TouchableOpacity style={{flex:2, marginLeft: 5,alignItems:'center',justifyContent:'center'}} onPress={()=>this._popupDatePicker(data)}>
            <Text style = {{fontSize:normalize(14), color:(data['userInput'] ==='N/A')?colors.grey3:'black' }} textAlign='center'>
              {
                data['userInput'] ==='N/A'?'点击选择':data['userInput']
              }
            </Text>
        </TouchableOpacity>


      }else if (data.type ==='edit&choose')
      {
        inputComp =
        <View style = {{flex:2, flexDirection:'row'}}>
          <TextInput textAlign='center' style = {{flex:4,alignItems:'flex-end',fontSize:normalize(14),marginLeft: 5, marginBottom:0, color:'black'}}
            placeholder= {(data.userInput==='N/A')?'点击输入':null}
            placeholderTextColor = {colors.grey3}
            keyboardType = {data.keyboardType}
            onChangeText={(text)=>
              {
                this._inputHandler(data,text)
              }
            }
            defaultValue = {(data.userInput==='N/A')?null:data.userInput}
          />
          <Icon containerStyle={{justifyContent:'center',alignItems:'center'}} color={colors.grey2} name="caret-down" size={25} style={{flex:1, marginLeft: 5}} onPress={()=>this._popupDatePicker(data)} />
        </View>

      }else if (data.type ==='date')
      {
        let dateNow = new Date();
        let selectedValue = [
              [dateNow.getFullYear()]+'年',
              [dateNow.getMonth()+1]+'月',
              [dateNow.getDate()]+'日'
          ];
        inputComp =
        <TouchableOpacity style={{flex:2, marginLeft: 5,alignItems:'center',justifyContent:'center'}} onPress={()=>this._popupDatePicker(data)}>
            <Text style = {{fontSize:normalize(14), color:(data['userInput'] ==='N/A')?colors.grey3:'black' }} textAlign='center'>
              {
                data['userInput'] ==='N/A'?'点击选择':data['userInput']
                // data['userInput'] ==='N/A'?(selectedValue[0]+'年'+selectedValue[1]+'月'+selectedValue[2]+'日'):data['userInput']
              }
            </Text>

        </TouchableOpacity>


      }


        return (
          <View style = {{flexDirection:'row',marginBottom:10,marginTop:10,marginLeft:0,justifyContent:'center'}}>
            <Text style = {{flex:1,paddingLeft:3,color: colors.grey1,fontSize:normalize(14),marginLeft:5}} textAlign='bottom'>
              {data.title}
            </Text>
             {inputComp}
         </View>
        )
      })
    )

  }

  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{this.props.ProductName}</Text>
        </View>
        <ScrollView style = {{marginTop:5, marginBottom:49}}>
            {
              this.state.configs.map((config, i) => {
                return (
                  <Card title={config.id + '.' + config.title} titleStyle = {{margin:8,marginBottom:6}}  containerStyle={styles.card_container} dividerStyle= {styles.card_divider}>
                    { this.renderCardConent(config, i)}

                    {/* <TouchableOpacity onPress={() => this._onPressTitle(tc)} style={{marginLeft:'5%',marginTop:-45, width:'90%',height:40}} /> */}
                  </Card>
                )
              })
            }
        </ScrollView>
        <Picker
                ref={picker => this.datePicker = picker}
                style={{height: 260}}
                pickerBtnText = '确认'
                pickerCancelBtnText = '取消'
                showMask={true}
                showDuration={300}
                pickerData={this.setupDataSource()}
                selectedValue={this.setupselectedValue()}
                onPickerDone={(pickedValue) => {
                  this._inputHandler(this.state.pickerSelectData,pickedValue)
                }}
            />

    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop:5,
    height:40,
    backgroundColor: colors.secondary,
  },
  heading: {
    color: 'white',
    fontSize: px2dp(17),
  },
  innerCard:{
    // justifyContent: 'center',
    margin:0,
    alignItems: 'stretch',
    flexDirection: 'column',
    marginBottom: 8,
    padding:1,
    // backgroundColor:'red'
  },
  card_container: {
    padding: 5,
    margin: 6,
    marginBottom: 10,
    marginTop:0,
  },
  card_divider:{
    margin: 10,
    marginTop:1,
    marginBottom:5,
    height:1.5
  },
  labelContainerStyle: {
    margin:2,
  },
  content: {
    color: colors.grey1,
    fontSize:normalize(14)
  },
});
