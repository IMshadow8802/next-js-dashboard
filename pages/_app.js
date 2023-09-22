import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider from notistack
import store from '../redux/store';
import '@/styles/globals.css';
import SideNavbar from '@/components/SideNavbar';

function App({ Component, pageProps }) {
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
