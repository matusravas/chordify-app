import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, {FC} from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { Surface } from 'react-native-paper';
import tabs from './BottomBarTabs';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window")


const BottomBar = () => {
  return (
    <View style={{
      width,
      height,
    }}>
      {/* <Surface> */}
      <Tab.Navigator screenOptions={{tabBarStyle: {...styles.shadow, ...styles.navBar}, headerShown: false, tabBarShowLabel: false}}>
        
        {tabs.map(screen => (
          // 
            // <Tab.Screen key={screen.name} name={screen.name} children={()=>
            // <Surface>
              // <screen.component/>
            // </Surface>
        // } 
            <Tab.Screen key={screen.name} name={screen.name} component={screen.component}
            options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        {/* <Image 
                        source={require("as")}
                        resizeMode='contain'
                        style={{width: 25, height: 25, tintColor: focused ? '#e32f45' : '#748c94'}}
                        /> */}
                        <Text
                        style={{color: focused? '#FFFFFF' : '#FFFFFF55', fontSize: 15}}
                        >
                            {screen.label}
                        </Text>
                    </View>
                    )
                
                }} />
        ))}
      </Tab.Navigator>
      {/* </Surface> */}
      </View>
  );
}

const styles = StyleSheet.create({
    navBar: {
      borderRadius: 15, 
      // overflow: 'visible',
      height: 70, 
      position: 'absolute',
      backgroundColor: "#425F57",
      bottom: 5, left: 10, right: 10, elevation: 0},
    shadow: {
      shadowColor: "#7f5df0",
      shadowOffset: {
        height: 10,
        width: 0
      },
      shadowOpacity: 0.25,
      shadowRadius: 10.5,
      elevation: 5
    }
  })

export default BottomBar
