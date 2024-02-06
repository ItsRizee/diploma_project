import '../styles/globals.css';
import {useEffect} from 'react';
import { getAuth } from 'firebase/auth';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import auth, { firestore } from '../firebase';
import { useUserStore } from '../store/userStorage';
import {getUserByEmail, User} from '../services/user';
import {ThemeProvider} from "next-theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }) => {
  const { user, setUser, setIsTouchEnabled } = useUserStore((state) => ({user: state.user, setUser: state.setUser, setIsTouchEnabled: state.setIsTouchEnabled}));

  useEffect(() => {
    setIsTouchEnabled(window.matchMedia("(pointer: coarse)").matches);
    let unsubscribeSnapshot = null
    const unsubscribeAuth = getAuth(auth).onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Store the user data in the global state
        getUserByEmail(currentUser.email).then((userData) => {
          setUser(userData);
          currentUser.getIdToken().then((token) => {
            sessionStorage.setItem('accessToken', token);
          });
        });

        // Fetch user data from Firestore using onSnapshot
        const q = query(collection(firestore, 'users'), where('uid', '==', currentUser.uid));
        unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          let userData = null;

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            userData = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
              uid: data.uid,
              interests: data.interests,
              requests: user.requests,
              craft: data.craft,
              orders: user.orders,
              catalog: data.catalog,
            };
          });

          setUser(userData);
        }, (error) => {
          console.log(error);
        });
      } else {
        setUser(new User());
        sessionStorage.setItem('accessToken', '');
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
        }
      }
    }, (error) => {
      console.log(error);
    });

    // Return a cleanup function to unsubscribe from the AuthStateChanged listener
    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
    };
  }, []);

  return (
      <ThemeProvider defaultTheme="system" attribute="data-theme">
        <Component {...pageProps} />
        <ToastContainer/>
      </ThemeProvider>
  );
};

export default MyApp;