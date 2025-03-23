import { ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase-connection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export const Private = ({ children }: PrivateProps) => {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    // não é necessário chamar unsub() para ser executado
    // apenas para remover o listerner
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };

        localStorage.setItem("@reactlinks", JSON.stringify(userData));
        setSigned(true);
        setLoading(false);
      } else {
        setSigned(false);
        setLoading(false);
      }
    });

    return () => unsub(); // remove o listener quando o componente for desmontado - função de cleanup evita perda de perfomance
  }, []);

  if (loading) {
    return <></>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
};
