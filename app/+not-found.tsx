import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import ThemedText from '../src/components/ThemedText';
import { ThemedView } from '../src/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '페이지를 찾을 수 없습니다' }} />
      <ThemedView style={styles.container}>
        <ThemedText variant="h1" style={styles.title}>
          페이지를 찾을 수 없습니다.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText variant="body">홈 화면으로 돌아가기</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
