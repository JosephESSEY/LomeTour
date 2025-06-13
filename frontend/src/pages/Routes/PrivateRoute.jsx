import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const [ok, setOk] = useState(null); // null = loading, true = OK, false = Not allowed

  const authCheck = async () => {
    try {
      const res = await fetch("/api/users/user-auth", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include", // 👈 indispensable pour envoyer le cookie JWT
      });

      const data = await res.json();
      setOk(data?.check === true);
    } catch (err) {
      console.error("Erreur auth user:", err);
      setOk(false);
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      authCheck();
    } else {
      setOk(false);
    }
  }, [currentUser]);

  if (ok === null) return <Spinner />;
  return ok ? <Outlet /> : <Navigate to="/login" />;
}
