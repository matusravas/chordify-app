import { Text } from '@react-native-material/core';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Icon, { Icons } from '../res/icons/icons';
import routes from './Routes';


const Router = () => {
  const { width, height } = Dimensions.get("window")
  const TabBar = createBottomTabNavigator();
  console.log('Bottom bar')
  return (
    // <View style={{
    //   width,
    //   height
    // }}>
      <TabBar.Navigator screenOptions={{ tabBarStyle: { ...styles.navBar}, headerShown: false, tabBarShowLabel: false }}>

        {routes.map(screen => (
          <TabBar.Screen key={screen.name} name={screen.name} component={screen.component}
            options={{
              tabBarIcon: ({ focused, color }) => (
                <View style={{ alignItems: 'center' }}>
                  <Icon type={screen.iconType} name={focused ? screen.iconFocused : screen.iconNotFocused} color={focused ? '#F7F7F7AA' : '#FFFFFF22'} size={focused ? 26 : 24} />
                  <Text
                    variant='caption'
                    style={{ color: focused ? '#F7F7F7AA' : '#FFFFFF55', fontSize: focused ? 11 : 10 }}
                  >{screen.label}
                  </Text>
                </View>
              ),
              unmountOnBlur: screen.unmountOnBlur
            }} />
        ))}
      </TabBar.Navigator>
    // </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    // borderRadius: 15, 
    // overflow: 'visible',
    height: 60,
    position: 'absolute',
    // backgroundColor: "#212024",
    backgroundColor: "#111317",
    borderTopWidth: 0,
    // elevation: 0},
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    // marginTop: 60,
    // left: 10, right: 10, 
    elevation: 0
  },
  // shadow: {
  //   shadowColor: "#7f5df0",
  //   shadowOffset: {
  //     height: 10,
  //     width: 0
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 10.5,
  //   elevation: 5
  // }
})

export default Router
