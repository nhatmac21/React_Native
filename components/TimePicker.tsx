import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
  time: Date;
  onChange: (date: Date) => void;
  show: boolean;
  setShow: (show: boolean) => void;
}

export default function TimePicker({ time, onChange, show, setShow }: Props) {
  const [selectedHour, setSelectedHour] = useState(time.getHours());
  const [selectedMinute, setSelectedMinute] = useState(time.getMinutes());

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleConfirm = () => {
    const newTime = new Date(time);
    newTime.setHours(selectedHour);
    newTime.setMinutes(selectedMinute);
    onChange(newTime);
    setShow(false);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8 }}>Chọn giờ uống thuốc:</Text>
      <Button title={`${selectedHour}:${selectedMinute}`} onPress={() => setShow(true)} />
      {show && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Giờ</Text>
              <Picker
                selectedValue={selectedHour}
                onValueChange={(itemValue) => setSelectedHour(itemValue)}
                style={styles.picker}
           
           
           >
                {hours.map((hour) => (
                  <Picker.Item key={hour} label={hour.toString()} value={hour} />
                ))}
              </Picker>
              <Text style={styles.label}>Phút</Text>
              <Picker
                selectedValue={selectedMinute}
                onValueChange={(itemValue) => setSelectedMinute(itemValue)}
                style={styles.picker}
              >
                {minutes.map((minute) => (
                  <Picker.Item key={minute} label={minute.toString()} value={minute} />
                ))}
              </Picker>
              <Button title="Xác nhận" onPress={handleConfirm} />
              <Button title="Hủy" onPress={() => setShow(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  picker: {
    width: 100,
    height: 150,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
});
