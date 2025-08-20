import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MedTime</Text>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Tuesday, August 19</Text>
          <Text style={styles.subtitleText}>15:00</Text>
        </View>
        
        <View style={styles.cardContainer}>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.replace('/(tabs)/medications')}
          >
            <View style={styles.cardIconContainer}>
              <View style={styles.cardIcon} />
            </View>
            <Text style={styles.cardTitle}>My Medications</Text>
            <Text style={styles.cardSubtitle}>View and manage your medications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardIconContainer}>
              <View style={styles.cardIcon} />
            </View>
            <Text style={styles.cardTitle}>Reminders</Text>
            <Text style={styles.cardSubtitle}>Set and manage medication reminders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardIconContainer}>
              <View style={styles.cardIcon} />
            </View>
            <Text style={styles.cardTitle}>Medication History</Text>
            <Text style={styles.cardSubtitle}>Track your medication adherence</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#5EBFCF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  welcomeContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    justifyContent: 'center',
  },
  subtitleText: {
    fontSize: 30,
    color: '#666',
    justifyContent: 'center',
  },
  cardContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EDF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#5EBFCF',
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
