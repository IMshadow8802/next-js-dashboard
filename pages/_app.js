import '@/styles/globals.css';
import TestSidebar from './test';
import SidebarNew from '@/components/SidebarNew';

export default function App({ Component, pageProps }) {
  return (
    <SidebarNew>
      <Component {...pageProps} />
    </SidebarNew>
  )
}
