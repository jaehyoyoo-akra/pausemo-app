import React from 'react';
import { OnboardingProvider } from './contexts/OnboardingContext';
import OnboardingFlow from './screens/OnboardingFlow';

export default function App() {
  return (
    <OnboardingProvider>
      <OnboardingFlow />
    </OnboardingProvider>
  );
}
