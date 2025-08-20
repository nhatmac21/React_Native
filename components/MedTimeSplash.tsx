import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

export default function MedTimeSplash() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.pillIconContainer}>
          <View style={styles.pill}>
            <View style={styles.pillLine} />
          </View>
        </View>
        <Text style={styles.title}>MedTime</Text>
      </View>
      {Platform.OS !== 'web' && (
        <View style={styles.wavesContainer}>
          <View style={[styles.wave, styles.wave1]} />
          <View style={[styles.wave, styles.wave2]} />
        </View>
      )}
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5EBFCF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillIconContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 6,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pillLine: {
    position: 'absolute',
    width: '100%',
    height: 6,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  wavesContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderRadius: 100,
  },
  wave1: {
    backgroundColor: '#4aafbf',
    height: 150,
    bottom: -70,
    left: -20,
    right: -20,
  },
  wave2: {
    backgroundColor: '#3d9cad',
    height: 180,
    bottom: -110,
    left: -40,
    right: -40,
  }
});
