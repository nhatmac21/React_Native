import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const medications = [
  { id: '1', name: 'Ibuprofen', dosage: '200mg', time: '8:00 AM', color: '#FFD6D6' },
  { id: '2', name: 'Vitamin D', dosage: '1000 IU', time: '9:00 AM', color: '#D6EAFF' },
  { id: '3', name: 'Lisinopril', dosage: '10mg', time: '8:00 PM', color: '#D6FFE1' },
  { id: '4', name: 'Simvastatin', dosage: '20mg', time: '9:00 PM', color: '#F2E5FF' },
];

export default function MedicationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Medications</Text>
        <TouchableOpacity style={styles.addButton}>
          <FontAwesome name="plus" size={18} color="white" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.medicationCard, { borderLeftColor: item.color, borderLeftWidth: 6 }]}>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{item.name}</Text>
              <Text style={styles.medicationDetails}>{item.dosage} · {item.time}</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#CCCCCC" />
          </TouchableOpacity>
        )}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#888',
  },
});
