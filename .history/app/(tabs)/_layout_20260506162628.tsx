import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Monstros"
        options={{
          title: 'Monstros',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="flutter-dash" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="MonstrosListScreen"
        options={{
          title: 'Lista de Monstros',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="MonstrosYugioh"
        options={{
          title: 'Monstros Yu-Gi-Oh',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="card-giftcard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="FeiticosListScreen"
        options={{
          title: 'Feitiços',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="bolt" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Creats/CreateFeiticoScreen"
        options={{
          title: 'Criar Feitiço',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="add" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Creats/CreatMonstroScreen"
        options={{
          title: 'Criar Monstro',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="add" color={color} />,
        }}
      />
    </Tabs>
  );
}
