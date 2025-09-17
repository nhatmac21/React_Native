import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Medication } from '../types/medication';

interface Props {
  medications: Medication[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function MedicationPicker({ medications, selectedId, onSelect }: Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8 }}>Chọn thuốc:</Text>
      <Picker
        selectedValue={selectedId}
        onValueChange={onSelect}
        style={{ backgroundColor: '#fff', borderRadius: 8 }}
      >
        <Picker.Item label="-- Chọn thuốc --" value="" />
        {medications.map(med => (
          <Picker.Item key={med.id} label={med.name} value={med.id} />
        ))}
      </Picker>
    </View>
  );
}
