import {create} from 'zustand';

const useAuthStore = create((set) => {
  const isClient = typeof window !== 'undefined'; // Check if running in the browser

  return {
    user: isClient ? JSON.parse(localStorage.getItem('user')) || null : null,
    isAuthenticated: isClient ? !!localStorage.getItem('user') : false,

    login: (user) => {
      set((state) => ({
        user,
        isAuthenticated: true,
      }));

      if (isClient) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    },

    logout: () => {
      set((state) => ({
        user: null,
        isAuthenticated: false,
      }));

      if (isClient) {
        localStorage.removeItem('user');
      }
    },
  };
});

export default useAuthStore;
