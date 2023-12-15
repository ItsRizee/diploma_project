import '../styles/globals.css';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import auth, { firestore } from '../firebase';
import { useUserStore } from '../store/userStorage';
import {getUser, User} from '../services/user';

const MyApp = ({ Component, pageProps }) => {
  const { setUser: setUser } = useUserStore((state) => ({setUser: state.setUser}));

  useEffect(() => {
    let unsubscribeSnapshot = null
    const unsubscribeAuth = getAuth(auth).onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Store the user data in the global state
        getUser(currentUser.email).then((userData) => {
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
            };
          });

          setUser(userData);
        });
      } else {
        setUser(new User());
        sessionStorage.setItem('accessToken', '');
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
        }
      }
    });

    // Return a cleanup function to unsubscribe from the AuthStateChanged listener
    return () => {
      unsubscribeAuth();
    };
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;