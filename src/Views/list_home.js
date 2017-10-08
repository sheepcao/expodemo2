import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator,Button,StyleSheet } from "react-native";
import { List, ListItem, SearchBar,Icon } from "react-native-elements";
import { StackNavigator } from 'react-navigation';

import colors from 'HSColors';

// const ListsHome = ({ navigation, banner }) => (
//   <FlatListDemo Navi= {() => navigation.navigate('Lists_Detail')} banner={banner} />
// );

const list = [
  {
    title: '云英谷UHD USIT屏幕控制及色彩调节软件',
    clientName: '深圳xxxx有限公司',
    status: '待确认',
  },
  {
    title: '金蝶HRP专业版',
    clientName: 'xx软件科技有限公司',
    status: '待确认',
  }
];


class TicketList extends Component {


  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: list,
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    // this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = 'https://randomuser.me/api/?seed=${seed}&page=${page}&results=20';
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "92%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      />
    );
  };

  // renderHeader = () => {
  //   return (<Button onPress={() => this.props.navigation.navigate('Lists_Detail',{ item: {name:{first:'Jane'} }})} title={this.props.ticketTitle}/>);
  // };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View>
      <View style={styles.headerContainer}>
        <Icon color="white" name="invert-colors" size={62} />
        <Text style={styles.heading}>测试工单</Text>
      </View>
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0}}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar = {false}
              title={item.title}
              titleStyle = {{fontSize: 15}}
              titleNumberOfLines = {2}
              subtitle={'委托单位: '+item.clientName}
              subtitleStyle = {{fontSize:13}}
              rightTitle={item.status}
              rightTitleStyle={{color:'orange'}}
              rightTitleContainerStyle={{flex: 0.5,alignItems: 'flex-end',marginLeft:0}}
              // avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.props.navigation.navigate('Lists_Detail',{ item: item,headerTitle:'123'} )}
            />
          )}
          keyExtractor={(item,index)=> index}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          // onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          // onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}


        />
       </List>
     </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.secondary,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
});
export default TicketList;
