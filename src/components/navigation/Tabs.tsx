import React, { ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsMain from '@/screens/settings/SettingsMain';
import HomeMain from '@/screens/home/HomeMain';
import AddItem from '@/screens/AddItem/AddItem';
import { Text } from '../ui/text';
import { Home, PlusCircle, Settings } from 'lucide-react-native';
import colors from 'tailwindcss/colors';

const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel(props: { focused: boolean; children: ReactNode }) {
          return (
            <Text
              style={{ paddingBottom: 5 }}
              className={`${props.focused ? 'text-white' : 'text-black'}`}
            >
              {props.children}
            </Text>
          );
        },
        //Tab bar styles can be added here
        tabBarStyle: {
          borderRadius: 30,
          paddingTop: 10,
          left: 20,
          right: 20,
          bottom: 20,
          backgroundColor: "#f97316ee",
          position: 'absolute',
          height: 55,
          elevation: 5,
          borderTopColor: 'transparent',
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="AddItem"
        component={AddItem}
        options={{
          title: 'Add Item',
          tabBarIcon: ({ focused }) => (
            <PlusCircle size={20} color={focused ? colors.white : colors.black} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Add"
        component={AddPropertyMain}
        options={{
          // headerShown: false,
          title: t('main.addProperty'),
          tabBarIcon: props => (
            <Icon name="plus-circle-outline" {...props} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Home"
        component={HomeMain}
        // listeners={resetTabStacksOnBlur}
        options={{
          // headerShown: false,
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Home size={20} color={focused ? colors.white : colors.black} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsMain}
        options={{
          // headerShown: false,
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Settings size={20} color={focused ? colors.white : colors.black} />
          ),
        }}
      />
    </Tab.Navigator>
    // </View>
  );
}
