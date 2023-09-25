import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider from notistack
import store from '../redux/store';
import '@/styles/globals.css';
import SideNavbar from '@/components/SideNavbar';
import useAuthStore from '@/zustand/useAuthStore';
import { useRouter } from 'next/router';

function App({ Component, pageProps }) {

  const router = useRouter(); // Initialize the router
  const authStore = useAuthStore(); // Access the Zustand store

  // Use useEffect to check if the user is authenticated
  useEffect(() => {
    if (!authStore.isAuthenticated && Component.name !== 'SignIn' && Component.name !== 'SignUp') {
      router.push('/SignIn');
    }
  }, [authStore.isAuthenticated, Component.name, router]);

  if (Component.name === 'SignIn' || Component.name === 'SignUp') {
    return <Component {...pageProps} />;
  }

  return (
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        maxSnack={3} // Adjust maxSnack to control the number of notifications shown at once
      >
        <SideNavbar>
          <Component {...pageProps} />
        </SideNavbar>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
