import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { StackNavigator } from 'react-navigation';

import ListsHome from './Views/list_home';
import DetailView from './Views/list_detail';
import EditForm from './Views/testCases/edit_case';
import EditInfo from './Views/basicPage/info_edit';

// const ListsTabView = ({ navigation }) => (
//   <ListsHome title="首页" navigation={navigation} />
// );
//
// const ListsDetailTabView = ({ navigation }) => (
//   <DetailView title="工单详情" navigation={navigation} />
// );

const ListsStack = StackNavigator({
  Home: {
    screen: ListsHome,
    path: '/',
    navigationOptions: () => ({
      title: '首页',
    }),
  },
  Lists_Detail: {
    screen: DetailView,
    path: 'lists_detail',

  },
  Edit_Forms: {
    screen: EditForm,
    path: '/',

  },
  Edit_Infos: {
    screen: EditInfo,
    path: '/',

  },
});



export default ListsStack;
