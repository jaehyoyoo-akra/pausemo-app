import { Redirect } from 'expo-router';

export default function Index() {
  // 앱 시작 시 항상 onboarding 화면으로 리다이렉트
  return <Redirect href="/onboarding" />;
}
