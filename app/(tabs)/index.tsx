import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HelloWave } from '../../src/components/HelloWave';
import ThemedText from '../../src/components/ThemedText';
import { ThemedView } from '../../src/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <HelloWave />
        <ThemedText variant="h1" style={styles.title}>
          Pausemo에 오신 것을 환영합니다!
        </ThemedText>
        <ThemedText variant="body" style={styles.description}>
          3초의 멈춤이 만드는 평생의 변화
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    textAlign: 'center',
  },
});
