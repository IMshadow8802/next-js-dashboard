import { Provider } from "react-redux";
import store from "../redux/store"
import '@/styles/globals.css';
import SideNavbar from '@/components/SideNavbar';


export default function App({ Component, pageProps }) {
  if (Component.name === 'SignIn' || Component.name === 'SignUp') {
    return <Component {...pageProps} />;
  }

  return (
    <Provider store={store}>
    <SideNavbar>
      <Component {...pageProps} />
    </SideNavbar>
    </Provider>
  );
}

