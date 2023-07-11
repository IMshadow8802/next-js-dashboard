// import '@/styles/globals.css';
// import SideNavbar from '@/components/SideNavbar';

// export default function App({ Component, pageProps }) {
//   return (
//     <SideNavbar>
//       <Component {...pageProps} />
//     </SideNavbar>
//   )
// }

import '@/styles/globals.css';
import SideNavbar from '@/components/SideNavbar';

export default function App({ Component, pageProps }) {
  if (Component.name === 'SignIn' || Component.name === 'SignUp') {
    return <Component {...pageProps} />;
  }

  return (
    <SideNavbar>
      <Component {...pageProps} />
    </SideNavbar>
  );
}

