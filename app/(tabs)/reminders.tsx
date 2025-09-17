import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RemindersTabScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reminders Tab</Text>
        <Text style={styles.subtitle}>Đây là tab cho Reminders.</Text>
        <Text>Nhập gì đó đi</Text>
        <TextInput style= {{
            borderColor: 'red',
            borderWidth: 1,
            padding: 10,
            width: '80%',
        }}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5EBFCF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
  },
});