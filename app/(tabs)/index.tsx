import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MedicationPicker from '../../components/MedicationPicker';
import TimePicker from '../../components/TimePicker';
import { getMedications } from '../../services/medicationService';
import { addReminder } from '../../services/reminderService';
import { Medication } from '../../types/medication';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  // State cho flow chọn thuốc và đặt giờ
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    getMedications().then(setMedications);
  }, []);

  // Đăng ký quyền thông báo khi app khởi động
  React.useEffect(() => {
    Notifications.requestPermissionsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }, []);

  const handleSave = async () => {
    if (!selectedId) {
      alert('Vui lòng chọn thuốc');
      return;
    }
    await addReminder({ medicationId: selectedId, time: time.toISOString() });
    // Đặt báo thức local notification
    const triggerDate = new Date(time);
    if (triggerDate < new Date()) {
      alert('Giờ đã chọn phải lớn hơn thời điểm hiện tại!');
      return;
    }

    const delay = triggerDate.getTime() - new Date().getTime();
    setTimeout(async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Đến giờ uống thuốc!',
          body: `Bạn nhớ uống thuốc: ${medications.find(m=>m.id===selectedId)?.name || ''}`,
          sound: true,
        },
        trigger: null, // Không cần trigger vì đã dùng setTimeout
      });
    }, delay);

    alert('Đã lưu nhắc nhở và đặt báo thức thành công!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MedTime</Text>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          <Text style={styles.subtitleText}>{new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
        {/* Flow chọn thuốc và đặt giờ nhắc uống thuốc */}
        <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <MedicationPicker
            medications={medications}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <TimePicker
            time={time}
            onChange={setTime}
            show={showTime}
            setShow={setShowTime}
          />
          <TouchableOpacity
            style={{ backgroundColor: '#5EBFCF', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 8 }}
            onPress={handleSave}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Lưu nhắc nhở</Text>
          </TouchableOpacity>
        </View>
        {/* ...existing code... */}
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
          
          <TouchableOpacity style={styles.card}
              onPress={()=> router.replace('/(tabs)/reminders')}>
            <View style={styles.cardIconContainer}>
              <View style={styles.cardIcon} />
            </View>
            <Text style={styles.cardTitle}>Reminders</Text>
            <Text style={styles.cardSubtitle}>Set and manage medication reminders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.card}
          onPress={()=> router.replace('/(tabs)/history')}>
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
