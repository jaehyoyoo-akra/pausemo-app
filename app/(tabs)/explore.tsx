import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedText from '../../src/components/ThemedText';
import { ThemedView } from '../../src/components/ThemedView';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="h1">탐색</ThemedText>
        <ThemedText variant="body" style={styles.description}>
          Pausemo 앱의 탐색 기능을 개발 중입니다.
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
  description: {
    marginTop: 20,
    textAlign: 'center',
  },
});
