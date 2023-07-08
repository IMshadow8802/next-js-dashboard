import '@/styles/globals.css';
import TestSidebar from './test';
import SidebarNew from '@/components/SidebarNew';
import Sidebar from '@/components/Sidebar';
import SideNavbar from '@/components/SideNavbar';

export default function App({ Component, pageProps }) {
  return (
    <SideNavbar>
      <Component {...pageProps} />
    </SideNavbar>
  )
}
