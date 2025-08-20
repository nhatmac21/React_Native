import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import MedTimeSplash from '@/components/MedTimeSplash';

export default function MedTimeEntryScreen() {
  useEffect(() => {
    // Simulate some loading or initialization time
    const timer = setTimeout(() => {
      // Navigate to the main app after the splash screen
      router.replace('/(tabs)');
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <MedTimeSplash />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
