import React, {
  Component
} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  ListView,
  Platform,
} from 'react-native';

import {
  Text,
  Card,
  Icon,
  List,
  ListItem
} from 'react-native-elements';

import colors from 'HSColors';



const testPoints = [
  {
    title: '寄存器读写',
    subTask: [{
      title: '单地址读写',
      description: '单独修改某地址的寄存器值'
    }, {
      title: '单页面修改读写',
      description: '读取写入某一片区的寄存器值'
    }, {
      title: '全部读取写入',
      description: '读取写入整个寄存器'
    }, {
      title: '保存读取文件',
      description: '从文件写入寄存器、将读取的寄存器值保存为文本'
    }]
  },
  {
    title: '自动ACC',
    description: '连接Ca310设备，完成自动ACC功能'
  }
];


export default class TestCase extends Component {

  renderLastNode(testcase, index) {
    return (
      <Card title={testcase.title}>
        <View key={index+1} style={styles.card}>
          <Text style={styles.name}>{testcase.description}</Text>
        </View>
      </Card>
    )
  }
  renderTwoCards(testcase1, index1,testcase2,index2) {
    return (
      <Card title={testcase1.title}>
        <View key={index1+1} style={styles.innerCard}>
            <Card title={testcase2.title}>
              <View key={(index1+1)*100+index2} style={styles.innerCard}>
                <Text style={styles.name}>{testcase2.description}</Text>
              </View>
            </Card>
        </View>
      </Card>
    )
  }

  renderCards(testcase, index) {
    var subtasks = testcase.subTask;

    return (
      <Card title={testcase.title} containerStyle={styles.card_container} dividerStyle= {styles.card_divider}>
        <View key={index+1} style={styles.innerCard}>
          {
            testcase.description?
              <Text style={styles.name}>{testcase.description}</Text>:
              subtasks.map((tc,i)=>{
                return this.renderCards(tc, i)
              })
          }
        </View>
      </Card>
    )
  }


  render() {
    const {
      navigation
    } = this.props;
    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          {/* <Icon color="white" name="invert-colors" size={22} /> */}
          <Text style={styles.heading}>{this.props.ProductName}</Text>
        </View>
        <View >
          {testPoints.map((tc, i) => {
              return this.renderCards(tc, i)
            })
          }
          {/* {testPoints.map((tc, i) => {
            if (!tc.subTask) {
              return this.renderLastNode(tc,i)
            }
            // if (tc.subTask) {
            //   var node = tc.subTask.map((tc2, i2) => {
            //     if (!tc2.subTask) {
            //       // return this.renderTwoCards(tc,i,tc2,i2)
            //       return <Text style={styles.name}>{tc2.description}</Text>
            //     }
            //   })
            //   return node;
            // }
            var node = tc.subTask.map((tc2, i2) => {
              if (!tc2.subTask) {
                return this.renderTwoCards(tc,i,tc2,i2)
              }
              var node2 = tc2.subTask.map((tc3, i3) => {
                if (!tc3.subTask) {
                  return this.renderLastNode(tc3,i3)
                }
              })
              return node2;
            })
            return node;
          })
        } */}
        </View>

      </ScrollView>
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
    backgroundColor: colors.secondary,
  },
  heading: {
    color: 'white',
    fontSize: 18,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 6,
    padding:3
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
  name: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    marginTop: 5,
    // backgroundColor:'yellow'
  },
  card_container: {
    padding: 5,
    margin: 6,
    marginBottom: 10
  },
  card_divider:{
    margin: 12,
  }
});
