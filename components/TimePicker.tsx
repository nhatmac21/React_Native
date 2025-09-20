import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Dimensions } from 'react-native';

interface Props {
  time: Date;
  onChange: (date: Date) => void;
  show: boolean;
  setShow: (show: boolean) => void;
}

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 50;

export default function TimePicker({ time, onChange, show, setShow }: Props) {
  const [tempHour, setTempHour] = useState(0);
  const [tempMinute, setTempMinute] = useState(0);
  
  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // Khởi tạo giá trị ban đầu chỉ một lần
  useEffect(() => {
    setTempHour(time.getHours());
    setTempMinute(time.getMinutes());
  }, []); // Chỉ chạy một lần khi component mount

  // Effect để đặt ScrollView về vị trí đúng khi mở modal
  useEffect(() => {
    if (show) {
      // Chỉ cập nhật giá trị từ props time khi mở modal lần đầu
      const currentHour = time.getHours();
      const currentMinute = time.getMinutes();
      setTempHour(currentHour);
      setTempMinute(currentMinute);
      
      setTimeout(() => {
        hourScrollRef.current?.scrollTo({
          y: currentHour * ITEM_HEIGHT,
          animated: false,
        });
        minuteScrollRef.current?.scrollTo({
          y: currentMinute * ITEM_HEIGHT,
          animated: false,
        });
      }, 100);
    }
  }, [show]); // Chỉ lắng nghe show, không lắng nghe time

  const handleConfirm = () => {
    const newTime = new Date(time);
    newTime.setHours(tempHour);
    newTime.setMinutes(tempMinute);
    onChange(newTime);
    setShow(false);
  };

  const handleCancel = () => {
    // Reset về giá trị hiện tại khi hủy
    setTempHour(time.getHours());
    setTempMinute(time.getMinutes());
    setShow(false);
  };

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  const onHourScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const selectedIndex = Math.round(y / ITEM_HEIGHT);
    if (selectedIndex >= 0 && selectedIndex < hours.length) {
      setTempHour(selectedIndex);
    }
  };

  const onMinuteScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const selectedIndex = Math.round(y / ITEM_HEIGHT);
    if (selectedIndex >= 0 && selectedIndex < minutes.length) {
      setTempMinute(selectedIndex);
    }
  };

  const ScrollPicker = ({ 
    data, 
    selectedValue, 
    onScroll, 
    scrollRef 
  }: { 
    data: number[], 
    selectedValue: number, 
    onScroll: (event: any) => void,
    scrollRef: React.RefObject<ScrollView | null>
  }) => (
    <View style={styles.scrollPickerContainer}>
      <View style={styles.selectedIndicator} />
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={onScroll}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map((item, index) => (
          <View key={item} style={styles.scrollItem}>
            <Text 
              style={[
                styles.scrollItemText,
                item === selectedValue && styles.selectedItemText
              ]}
            >
              {formatTime(item)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn giờ uống thuốc:</Text>
      <TouchableOpacity 
        style={styles.timeDisplay} 
        onPress={() => setShow(true)}
      >
        <Text style={styles.timeText}>
          {formatTime(time.getHours())}:{formatTime(time.getMinutes())}
        </Text>
      </TouchableOpacity>
      
      {show && (
        <Modal transparent={true} animationType="slide" visible={show}>
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <Text style={styles.modalTitle}>Chọn thời gian</Text>
              <Text style={{ textAlign: 'center', marginBottom: 10, color: '#666' }}>
                Debug: {formatTime(tempHour)}:{formatTime(tempMinute)}
              </Text>
              
              <View style={styles.timePickerRow}>
                <View style={styles.pickerSection}>
                  <Text style={styles.sectionLabel}>Giờ</Text>
                  <ScrollPicker
                    data={hours}
                    selectedValue={tempHour}
                    onScroll={onHourScroll}
                    scrollRef={hourScrollRef}
                  />
                </View>
                
                <Text style={styles.timeSeparator}>:</Text>
                
                <View style={styles.pickerSection}>
                  <Text style={styles.sectionLabel}>Phút</Text>
                  <ScrollPicker
                    data={minutes}
                    selectedValue={tempMinute}
                    onScroll={onMinuteScroll}
                    scrollRef={minuteScrollRef}
                  />
                </View>
              </View>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, styles.confirmButton]} 
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmButtonText}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  timeDisplay: {
    backgroundColor: '#5EBFCF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: width * 0.85,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  timePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  pickerSection: {
    alignItems: 'center',
    flex: 1,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
  },
  timeSeparator: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5EBFCF',
    marginHorizontal: 20,
    marginTop: 20,
  },
  scrollPickerContainer: {
    height: 150,
    position: 'relative',
  },
  selectedIndicator: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(94, 191, 207, 0.1)',
    borderRadius: 8,
    marginTop: -ITEM_HEIGHT / 2,
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#5EBFCF',
  },
  scrollView: {
    height: 150,
  },
  scrollContent: {
    paddingVertical: 50,
  },
  scrollItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollItemText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '500',
  },
  selectedItemText: {
    color: '#5EBFCF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#5EBFCF',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
