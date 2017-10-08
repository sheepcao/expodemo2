import React, {
  Component
} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  ListView,
  Platform,
  SectionList,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import {
  Text,
  Card,
  Icon,
  List,
  ListItem
} from 'react-native-elements';

import colors from 'HSColors';

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px * deviceW / basePx
}

const informations = [
  {
    id:"1",
    title: '委托单位',
    data: [{
      id:"1",
      titleKey:'单位名称',
      titleValue: '深圳xxxx有限公司'
    }, {
      id:"2",
      titleKey:'详细地址',
      titleValue: '深圳市南山区科技路xxx'
    }]
  },
  {
    id:"2",
    title: '商务联系人',
    data: [{
      id:"1",
      titleKey:'姓名',
      titleValue: '陈先生'
    }, {
      id:"2",
      titleKey:'电话',
      titleValue: '0755-86627xxx'
    },
    {
      id:"3",
      titleKey:'手机',
      titleValue: '18138862xxx'
    }, {
      id:"4",
      titleKey:'传真',
      titleValue: '0755-86627xxx'
    },
    {
      id:"5",
      titleKey:'电子邮件',
      titleValue: 'Anwei.chen@yunyinggu.com'
    }, {
      id:"6",
      titleKey:'邮政编码',
      titleValue: '518057'
    }]
  },
  {
    id:"3",
    title: '技术联系人',
    data: [{
      id:"1",
      titleKey:'姓名',
      titleValue: '罗xx'
    }, {
      id:"2",
      titleKey:'联系电话',
      titleValue: '13761089xxx'
    }]
  },
  {
    id:"4",
    title: '测试信息',
    data: [{
      id:"1",
      titleKey:'测试类型',
      titleValue: '登记测试'
    }, {
      id:"2",
      titleKey:'测试时间',
      titleValue: '2017.02.28'
    },{
      id:"3",
      titleKey:'完成时间',
      titleValue: '2017.03.08'
    },{
      id:"4",
      titleKey:'检测地址',
      titleValue: '深圳市南山区科技路xxx'
    }]
  },{
    id:"5",
    title: '产品信息',
    data: [{
      id:"1",
      titleKey:'开发单位',
      titleValue: '深圳云xxxx'
    },{
      id:"2",
      titleKey:'开发平台',
      titleValue: 'Windows'
    },{
      id:"3",
      titleKey:'开发语言',
      titleValue: 'C、C#'
    },{
      id:"4",
      titleKey:'运行平台',
      titleValue: 'Windows'
    },{
      id:"5",
      titleKey:'应用领域',
      titleValue: '液晶显示'
    },{
      id:"6",
      titleKey:'产品类型',
      titleValue: '应用软件'
    },{
      id:"7",
      titleKey:'软件类别',
      titleValue: '非嵌入式软件'
    },{
      id:"8",
      titleKey:'产品介绍',
      titleValue: '该软件运行于Windows平台上，使用C、C#语言，应用于xxx领域，具有xxx、xxx、xxx等功能....该软件运行于Windows平台上，使用C、C#语言，应用于xxx领域，具有xxx、xxx、xxx等功能....'
    }]
  },

];

const BASICINFO_STORAGE_KEY = 'ASYNC_STORAGE_BASIC_INFO';


export default class BasicInfo extends Component {
  constructor(props) {
      super(props);

      this.state = {
        infos: informations
      };
      this.itemPress = this.itemPress.bind(this);
      this.load = this.load.bind(this);
      this.save = this.save.bind(this);

    }


  componentWillMount() {
    this.load()
    console.log('load');
  }

  load = async () => {
    try {
      const allInfos = await AsyncStorage.getItem(BASICINFO_STORAGE_KEY)
      console.log('infos await');

      if (allInfos !== null) {
        console.log('before setState');
        var infosJson = JSON.parse(allInfos)
        this.setState({infos:infosJson})
        console.log('setState');

      }
    } catch (e) {
      console.log('Failed to load infos.' + e)
    }
  }

  save = async (infos) => {
    try {
      await AsyncStorage.setItem(BASICINFO_STORAGE_KEY, JSON.stringify(infos))
      this.setState({infos})
    } catch (e) {
      console.error('Failed to save infos.' + e)
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "88%",
          backgroundColor: colors.grey4,
          marginLeft: '5%'
        }}
      />
    );
  };

  pressHandler(data,testcase)
  {
    testcase.titleValue = data.infoContent;
    var allInfos = this.state.infos;
    this.save(allInfos)
  }

  itemPress = (itemInfo) => {
    console.log('itemPress' + itemInfo);
    this.props.navigation.navigate('Edit_Infos',{testData: itemInfo,callback:(data,testcase=itemInfo) =>{

      this.pressHandler(data, testcase)

    }})

  }

  render() {
      return (
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>{this.props.ProductName}</Text>
          </View>
          <List containerStyle={{marginTop:5, marginBottom:49+40, borderTopWidth: 0, borderBottomWidth: 0}}>
            <SectionList
              sections={this.state.infos}
              renderSectionHeader={(info) => (
                  <ListItem
                    title={info.section.id + '. ' + info.section.title}
                    titleStyle = {{fontSize: 17,fontWeight:'600'}}
                    titleNumberOfLines = {2}
                    containerStyle={{ borderBottomWidth: 0 }}
                    hideChevron = {true}
                    // onPress={() => this.sectionPress(info.section)}
                  />
              )}
              renderItem={(info) => (
                <ListItem
                  title={info.item.titleKey + ":  "}
                  titleStyle = {{fontSize: 15.5,fontWeight:'400', marginLeft:15}}
                  titleNumberOfLines = {2}
                  rightTitle={info.item.titleValue}
                  rightTitleStyle = {{fontSize:14,color:colors.grey2,marginRight:25,}}
                  rightTitleContainerStyle={{flex: 2,alignItems: 'flex-end',marginLeft:0}}
                  rightTitleNumberOfLines = {10}
                  containerStyle={{ borderBottomWidth: 0 }}
                  hideChevron = {true}
                  onPress={() => this.itemPress(info.item)}
                />
              )}
              keyExtractor={(item,index)=> index}
              ItemSeparatorComponent={this.renderSeparator}
              stickySectionHeadersEnabled= {false}
              // SectionSeparatorComponent = {this.renderSeparator}
            />
           </List>
         </View>
      )}
}


const styles = StyleSheet.create({
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
  name: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginLeft: '5%',
    marginRight: '5%',
    fontSize:14,
    color:colors.grey3,
    fontWeight:'600',
  }
});
