import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingFlow from '../src/screens/OnboardingFlow';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <OnboardingFlow />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
