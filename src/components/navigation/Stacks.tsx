import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import SearchPage from '@/screens/SearchPage';
import LoginPage from '@/screens/LoginPage';
import { useColorScheme } from 'nativewind';
import ProductPage from '../ProductPage';
import CategoryPage from '../CategoryPage';
import SignupPage from '@/screens/SignupPage';
const RootStack = createNativeStackNavigator();

const Stacks = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name="TabsHome" component={Tabs} options={{ headerShown: false }} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen
            name="SearchPage"
            component={SearchPage}
            options={{
              presentation: 'modal',
              // headerShown: isArabic ? false : true,
              title: 'Search',
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
            }}
          />
          <RootStack.Screen
            name="ProductPage"
            component={ProductPage}
            options={({ route }: { route: any }) => ({
              title: `Product ${route?.params?.item?.id + 1}`,
              presentation: 'modal',
              headerShown: true,
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
            })}
          />
          <RootStack.Screen
            name="CategoryPage"
            component={CategoryPage}
            options={({ route }: { route: any }) => ({
              title: route?.params?.category,
              presentation: 'modal',
              headerShown: true,
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
            })}
          />
          <RootStack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{
              title: "Login",
              presentation: 'modal',
              headerShown: true,              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
              // animation: 'fade',
            }}
          />
            <RootStack.Screen
            name="SignupPage"
            component={SignupPage}
            options={{
              title: "Signup",
              presentation: 'modal',
              headerShown: true,              
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
              // animation: 'fade',
            }}
          />
          {/*   <RootStack.Screen
            name="SignupModal"
            component={SignupModal}
            options={{
              // presentation: 'modal',
              // headerShown: isArabic ? false : true,
              title: t('button.signup'),
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
            }}
          />
     
          <RootStack.Screen
            name="ResetPassModal"
            component={ResetPassModal}
            options={{
              // presentation: 'card',
              title: t('form.resetPassword'),
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
            }}
          />
          <RootStack.Screen
            name="ContactUsModal"
            component={ContactUsModal}
            options={{
              // presentation: 'card',
              title: t('property.contactUs'),
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
            }}
          />
          <RootStack.Screen
            name="EditProfileModal"
            component={EditProfileModal}
            options={{
              // presentation: 'card',
              title: t('main.userProfile'),
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
            }}
          />
          <RootStack.Screen
            name="AddProperty"
            component={AddProperty}
            options={{
              // presentation: 'card',
              title: t('button.addProperty'),
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
            }}
          />
          <RootStack.Screen
            name="EditPropertyModal"
            component={EditProperty}
            options={{
              // presentation: 'card',
              title: t('button.editAd'),
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
            }}
          />
          <RootStack.Screen
            name="ChatScreen"
            component={ChatsScreen}
            options={{
              // presentation: 'modal',
              headerShown: false,
              title: t('rn.chat'),
              headerStyle: {
                backgroundColor: isDarkMode ? '#495057' : '#74C0FC',
              },
              headerTintColor: isDarkMode ? 'white' : 'white',
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'white',
                fontWeight: 'bold',
              },
              // animation: 'slide_from_bottom',
            }}
          />*/}
        </RootStack.Group>
      </RootStack.Navigator>
    </>
  );
};

export default Stacks;
