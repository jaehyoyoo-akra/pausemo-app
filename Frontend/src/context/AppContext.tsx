import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Quest, CategoryType, UserTypeEnum } from '../types';
import { AuthService } from '../services/auth';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  activeQuests: Quest[];
  loading: boolean;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_ONBOARDED'; payload: boolean }
  | { type: 'SET_ACTIVE_QUESTS'; payload: Quest[] }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isOnboarded: false,
  activeQuests: [],
  loading: true,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload,
        isOnboarded: !!(action.payload?.userType?.primary),
      };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_ONBOARDED':
      return { ...state, isOnboarded: action.payload };
    case 'SET_ACTIVE_QUESTS':
      return { ...state, activeQuests: action.payload };
    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (user: User, token: string) => void;
  logout: () => void;
  completeOnboarding: (userType: { primary: UserTypeEnum; secondary?: UserTypeEnum }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const isAuthenticated = await AuthService.isAuthenticated();
      
      if (isAuthenticated) {
        const user = await AuthService.getCurrentUser();
        dispatch({ type: 'SET_USER', payload: user });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      }
    } catch (error) {
      console.error('앱 초기화 오류:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = (user: User, token: string) => {
    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
  };

  const logout = async () => {
    try {
      await AuthService.signOut();
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  };

  const completeOnboarding = (userType: { primary: UserTypeEnum; secondary?: UserTypeEnum }) => {
    if (state.user) {
      const updatedUser = {
        ...state.user,
        userType,
      };
      dispatch({ type: 'SET_USER', payload: updatedUser });
    }
  };

  const value: AppContextType = {
    state,
    dispatch,
    login,
    logout,
    completeOnboarding,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

