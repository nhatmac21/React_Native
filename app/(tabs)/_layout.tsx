import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5EBFCF',
        tabBarInactiveTintColor: '#A0A0A0',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#E5E5E5',
          },
          default: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#E5E5E5',
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <FontAwesome name="search" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Medications',
          tabBarIcon: ({ color }) => <FontAwesome name="medkit" size={22} color={color} />,
        }}
      />
       <Tabs.Screen
         name="medications"
         options={{
           title: 'My Medications',
           tabBarIcon: ({ color }) => <FontAwesome name="medkit" size={22} color={color} />,
         }}
       />
        <Tabs.Screen
         name="reminders"
         options={{
           title: 'Reminders',
           tabBarIcon: ({ color }) => <FontAwesome name="medkit" size={22} color={color} />,
         }}
       />
        <Tabs.Screen
         name="history"
         options={{
           title: 'History',
           tabBarIcon: ({ color }) => <FontAwesome name="medkit" size={22} color={color} />,
         }}
       />
    </Tabs>
  );
}
