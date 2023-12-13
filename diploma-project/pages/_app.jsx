import '../styles/globals.css';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import auth, { firestore } from '../firebase';
import { useUserStore } from '../store/userStorage';
import {getUser, User} from '../services/user';

const MyApp = ({ Component, pageProps }) => {
  const { user: user, setUser: setUser } = useUserStore((state) => ({setUser: state.setUser}));

  useEffect(() => {
    console.log("zustand user");
    console.log(user);
    const unsubscribeAuth = getAuth(auth).onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Fetch user data from Firestore using onSnapshot
        const q = query(collection(firestore, 'users'), where('uid', '==', currentUser.uid));
        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
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
        }, (error) => console.log(error));

        // Store the user data in the global state
        getUser(currentUser.email).then((userData) => {
          setUser(userData);
          currentUser.getIdToken().then((token) => {
            sessionStorage.setItem('accessToken', token);
          });
        });

        // Return a cleanup function to unsubscribe from the onSnapshot listener
        return () => {
          unsubscribeSnapshot();
        };
      } else {
        setUser(new User());
        sessionStorage.setItem('accessToken', '');
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