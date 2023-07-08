import '@/styles/globals.css';
import SideNavbar from '@/components/SideNavbar';

export default function App({ Component, pageProps }) {
  return (
    <SideNavbar>
      <Component {...pageProps} />
    </SideNavbar>
  )
}
