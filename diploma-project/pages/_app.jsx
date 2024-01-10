import '../styles/globals.css';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import auth, { firestore } from '../firebase';
import { useUserStore } from '../store/userStorage';
import {getUserByEmail, User} from '../services/user';

const MyApp = ({ Component, pageProps }) => {
  const { setUser } = useUserStore((state) => ({setUser: state.setUser}));
  const { user } = useUserStore((state) => ({user: state.user}));

  useEffect(() => {
    console.log(user.theme);
    document.querySelector('html').setAttribute('data-theme', user.theme);
    document.querySelector('html').setAttribute('class', user.theme);
  }, [user.theme]);

  useEffect(() => {
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
              requests: data.requests,
              craft: data.craft,
              orders: data.orders,
              catalog: data.catalog,
              theme: data.theme,
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

  return <Component {...pageProps} />;
};

export default MyApp;