// pages/_app.js
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import store from "../redux/store";
import '@/styles/globals.css';
import SideNavbar from '@/components/SideNavbar';

function App({ Component, pageProps }) {
  if (Component.name === 'SignIn' || Component.name === 'SignUp') {
    return <Component {...pageProps} />;
  }

  return (
    <Provider store={store}>
      <ToastContainer position="top-center" /> {/* Add ToastContainer */}
      <SideNavbar>
        <Component {...pageProps} />
      </SideNavbar>
    </Provider>
  );
}

export default App;

