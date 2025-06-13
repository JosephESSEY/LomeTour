import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function AdminRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const [ok, setOk] = useState(null); // null = loading

  const authCheck = async () => {
    try {
      const res = await fetch("/api/users/admin-auth", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include", // ⚠️ Important pour envoyer le cookie HttpOnly
      });

      const data = await res.json();
      setOk(data?.check === true); // ok = true si check est true, sinon false
    } catch (err) {
      console.error("Erreur auth admin:", err);
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
