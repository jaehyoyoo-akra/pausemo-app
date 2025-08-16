/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// 알림 서비스를 위한 백그라운드 핸들러 등록
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
