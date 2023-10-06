import '../styles/globals.css'
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import auth from "../firebase";

const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = getAuth(auth).onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <Component {...pageProps} user={user} />
}

export default MyApp
