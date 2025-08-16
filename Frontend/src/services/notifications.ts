import { Alert, Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export class NotificationService {
  static isInitialized = false;

  static async initialize() {
    if (this.isInitialized) return;

    try {
      // 알림 권한 요청
      await this.requestPermissions();

      // 푸시 알림 설정
      PushNotification.configure({
        onRegister: function (token) {
          console.log('FCM Token:', token);
          // 서버에 토큰 전송 로직 추가 가능
        },

        onNotification: function (notification) {
          console.log('알림 수신:', notification);
          
          // 로컬 알림인 경우 처리
          if (notification.userInteraction) {
            // 사용자가 알림을 탭한 경우
            console.log('사용자가 알림을 탭함');
          }
        },

        onAction: function (notification) {
          console.log('알림 액션:', notification.action);
        },

        onRegistrationError: function (err) {
          console.error('알림 등록 실패:', err);
        },

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        popInitialNotification: true,
        requestPermissions: true,
      });

      // 채널 생성 (Android)
      this.createNotificationChannels();
      
      this.isInitialized = true;
      console.log('알림 서비스 초기화 완료');
    } catch (error) {
      console.error('알림 서비스 초기화 실패:', error);
    }
  }

  static async requestPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.NOTIFICATION);
        return result === RESULTS.GRANTED;
      } else {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        return result === RESULTS.GRANTED;
      }
    } catch (error) {
      console.error('알림 권한 요청 실패:', error);
      return false;
    }
  }

  static createNotificationChannels() {
    // Android 알림 채널 생성
    PushNotification.createChannel(
      {
        channelId: 'pausemo-default',
        channelName: 'Pausemo 기본 알림',
        channelDescription: 'Pausemo 앱의 기본 알림입니다.',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`기본 채널 생성: ${created}`)
    );

    PushNotification.createChannel(
      {
        channelId: 'pausemo-intervention',
        channelName: 'Pausemo 패턴 개입',
        channelDescription: '패턴 개입 알림입니다.',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`개입 채널 생성: ${created}`)
    );
  }

  // 패턴 개입 알림 스케줄링
  static scheduleInterventionNotification(
    title: string = '패턴 체크',
    message: string = '지금 상황을 확인해볼까요?',
    delayMinutes: number = 30
  ) {
    const notificationId = Math.floor(Math.random() * 1000000);
    
    PushNotification.localNotificationSchedule({
      id: notificationId,
      channelId: 'pausemo-intervention',
      title,
      message,
      date: new Date(Date.now() + delayMinutes * 60 * 1000),
      playSound: true,
      soundName: 'default',
      vibrate: true,
      vibration: 300,
      actions: ['열기'],
      invokeApp: true,
      userInfo: {
        type: 'intervention',
        scheduledTime: new Date().toISOString(),
      },
    });

    console.log(`개입 알림 스케줄됨: ${delayMinutes}분 후, ID: ${notificationId}`);
    return notificationId;
  }

  // 일일 리마인더 설정
  static scheduleDailyReminders() {
    // 아침 9시 알림
    this.scheduleDailyNotification(
      '좋은 아침입니다! 🌅',
      '오늘도 새로운 선택을 만들어보세요',
      9, 0
    );

    // 오후 2시 알림
    this.scheduleDailyNotification(
      '오후 체크 💭',
      '잠시 멈춰서 지금을 확인해보세요',
      14, 0
    );

    // 저녁 8시 알림
    this.scheduleDailyNotification(
      '하루 마무리 🌙',
      '오늘의 패턴은 어떠셨나요?',
      20, 0
    );
  }

  static scheduleDailyNotification(
    title: string,
    message: string,
    hour: number,
    minute: number = 0
  ) {
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hour, minute, 0, 0);

    // 오늘 시간이 지났으면 내일로 설정
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const notificationId = Math.floor(Math.random() * 1000000);

    PushNotification.localNotificationSchedule({
      id: notificationId,
      channelId: 'pausemo-intervention',
      title,
      message,
      date: scheduledTime,
      repeatType: 'day', // 매일 반복
      playSound: true,
      soundName: 'default',
      vibrate: true,
      vibration: 300,
      userInfo: {
        type: 'daily_reminder',
        hour,
        minute,
      },
    });

    console.log(`일일 알림 설정: ${hour}:${minute}, ID: ${notificationId}`);
    return notificationId;
  }

  // 성취 알림
  static showAchievementNotification(
    title: string = '성취 달성! 🎉',
    message: string,
    delaySeconds: number = 1
  ) {
    const notificationId = Math.floor(Math.random() * 1000000);

    setTimeout(() => {
      PushNotification.localNotification({
        id: notificationId,
        channelId: 'pausemo-default',
        title,
        message,
        playSound: true,
        soundName: 'default',
        vibrate: true,
        vibration: 300,
        userInfo: {
          type: 'achievement',
        },
      });
    }, delaySeconds * 1000);

    return notificationId;
  }

  // 모든 알림 취소
  static cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
    console.log('모든 알림이 취소되었습니다');
  }

  // 특정 알림 취소
  static cancelNotification(notificationId: number) {
    PushNotification.cancelLocalNotification(notificationId);
    console.log(`알림 ${notificationId} 취소됨`);
  }

  // 배지 숫자 설정 (iOS)
  static setBadgeNumber(number: number) {
    if (Platform.OS === 'ios') {
      PushNotification.setApplicationIconBadgeNumber(number);
    }
  }

  // 배지 숫자 초기화
  static clearBadge() {
    this.setBadgeNumber(0);
  }

  // 알림 권한 상태 확인
  static async checkPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        const result = await check(PERMISSIONS.IOS.NOTIFICATION);
        return result === RESULTS.GRANTED;
      } else {
        const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        return result === RESULTS.GRANTED;
      }
    } catch (error) {
      console.error('알림 권한 확인 실패:', error);
      return false;
    }
  }

  // 스마트 알림 스케줄링 (사용자 패턴 기반)
  static scheduleSmartInterventions(userType?: string) {
    // 사용자 유형에 따른 맞춤 알림
    const interventionMessages = {
      '성과-증명형': [
        '성과에 의존하지 않는 나를 발견해보세요',
        '지금 이 순간의 가치를 느껴보세요',
      ],
      '관계-의존형': [
        '타인의 시선에서 잠시 벗어나보세요',
        '나 자신과의 시간을 가져보세요',
      ],
      '완벽-가면형': [
        '완벽하지 않아도 괜찮습니다',
        '불완전한 지금을 받아들여보세요',
      ],
      default: [
        '잠시 멈춰서 지금을 확인해보세요',
        '이 순간을 선택하는 나를 느껴보세요',
      ],
    };

    const messages = interventionMessages[userType as keyof typeof interventionMessages] || interventionMessages.default;
    
    // 랜덤한 시간에 알림 스케줄 (2-4시간 간격)
    for (let i = 0; i < 3; i++) {
      const randomHours = 2 + Math.random() * 2; // 2-4시간
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      this.scheduleInterventionNotification(
        '패턴 체크',
        randomMessage,
        randomHours * 60
      );
    }
  }
}

