import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData, {
        withCredentials: true, // si tu utilises les cookies pour la session
      });

      navigate("/login");

    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: "100%",
        height: "90vh",
        background:
          "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col border border-black rounded-lg p-4 w-72 gap-4 sm:w-[320px] bg-white bg-opacity-60">
          <h1 className="text-3xl text-center font-semibold">Signup</h1>

          <div className="flex flex-col">
            <label htmlFor="nom" className="font-semibold">
              Nom :
            </label>
            <input
              type="text"
              id="nom"
              required
              className="p-2 rounded border border-black bg-white bg-opacity-80"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              Email :
            </label>
            <input
              type="email"
              id="email"
              required
              className="p-2 rounded border border-black bg-white bg-opacity-80"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold">
              Mot de passe :
            </label>
            <input
              type="password"
              id="password"
              required
              className="p-2 rounded border border-black bg-white bg-opacity-80"
              onChange={handleChange}
            />
          </div>

          <p className="text-blue-700 text-sm hover:underline">
            <Link to="/login">Déjà un compte ? Connectez-vous</Link>
          </p>

          <button
            type="submit"
            className="p-3 text-white bg-slate-700 rounded hover:opacity-95"
          >
            S’inscrire
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
