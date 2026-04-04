import { createContext, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUser,
  setRole,
  setLoading,
  logout as logoutAction
} from '../store/authSlice';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        dispatch(setUser(currentUser));

        if (currentUser) {
          const role = await authService.getUserRole(currentUser.id);
          dispatch(setRole(role));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch(setUser(null));
      }
    };

    initAuth();
  }, [dispatch]);

  const signUp = async (email, password, role = 'viewer') => {
    dispatch(setLoading(true));
    try {
      await authService.signUp(email, password, role);

      
      dispatch(setUser({ email }));
      dispatch(setRole(role));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signIn = async (email, password) => {
    dispatch(setLoading(true));
    try {
      const { user } = await authService.signIn(email, password);

      if (user) {
        dispatch(setUser(user));
        const role = await authService.getUserRole(user.id);
        dispatch(setRole(role));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signOut = async () => {
    await authService.signOut();
    dispatch(logoutAction());
  };

  const switchRole = async (role) => {
    if (user) {
      await authService.updateUserRole(user.id, role);
      dispatch(setRole(role));
    }
  };

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, switchRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}