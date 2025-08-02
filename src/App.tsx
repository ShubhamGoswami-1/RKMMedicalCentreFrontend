import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { setAuthFromToken } from './store/slices/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    // Check if user has a valid token on app load
    if (token && !isLoggedIn) {
      // In a real app, you would validate the token with your backend
      // For now, we'll mock a user based on the token
      const mockUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@clinic.com',
        userName: 'johndoe',
        role: 'doctor' as const
      };
      
      dispatch(setAuthFromToken({ user: mockUser }));
    }
  }, [token, isLoggedIn, dispatch]);

  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;