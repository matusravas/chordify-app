import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, {FC} from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableNativeFeedback } from 'react-native';
import Icon, { Icons } from '../icons/icons';
import tabs from './BottomBarTabs';


const BottomBar = () => {
  const Tab = createBottomTabNavigator();
  const { width, height } = Dimensions.get("window")
  console.log(width, height)
  return (
    <View style={{
      width,
      height
    }}>
      {/* <Tab.Navigator screenOptions={{tabBarStyle: {...styles.shadow, ...styles.navBar}, headerShown: false, tabBarShowLabel: false}}> */}
      <Tab.Navigator screenOptions={{tabBarStyle: {...styles.navBar}, headerShown: false, tabBarShowLabel: false}}>
        
        {tabs.map(screen => (
          // 
            // <Tab.Screen key={screen.name} name={screen.name} children={()=>
            // <Surface>
              // <screen.component/>
            // </Surface>
        // } 
            <Tab.Screen key={screen.name} name={screen.name} component={screen.component}
            options={{
                tabBarLabel: screen.label,
                // tabBarActiveBackgroundColor: '#425F50',
                tabBarIcon: ({focused, color}) => (
                  <Icon type={screen.iconType} name={focused? screen.iconFocused: screen.iconNotFocused} color={focused? '#E5E5E5' : '#FFFFFF22'}/>
                    // <Icon type={screen.iconType} name={focused? screen.iconFocused: screen.iconNotFocused}/>
                    // <View>
                    //     <Icon type={screen.iconType} name={focused? screen.iconFocused: screen.iconNotFocused} color={focused? '#FFFFFF' : '#FFFFFF55'}/>
                    //     <Text
                    //     style={{color: focused? '#FFFFFF' : '#FFFFFF55', fontSize: 15}}
                    //     >{screen.label}
                    //     </Text>
                    // </View>
                    )
                
                }} />
        ))}
      </Tab.Navigator>
      </View>
  );
}

const styles = StyleSheet.create({
    navBar: {
      // borderRadius: 15, 
      // overflow: 'visible',
      height: 60, 
      position: 'absolute',
      backgroundColor: "#425F57",
      elevation: 0},
      // bottom: 5, left: 10, right: 10, elevation: 0},
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

export default BottomBar
