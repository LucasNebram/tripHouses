import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading";

export default function Account() {
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  if (hasLogged === null)
    return <Loading isVisible={true} text="Cargando..." />;

  return hasLogged ? <UserLogged /> : <UserGuest />;
}
