import React, { useCallback, useEffect, useState } from "react";
import "./styles/Home.css";
import { FaCalendar, FaSearch, FaStar } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { LuBadgePercent } from "react-icons/lu";
import PackageCard from "./PackageCard";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [allSites, setAllSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getAllSites = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/sites");
      const data = await res.json();
      console.log("Données reçues:", data);
      setAllSites(data); // Assure-toi que c'est bien `data.data`

    } catch (error) {
      console.error("Erreur fetch:", error);
      alert("Erreur lors de la récupération des sites.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllSites();
  }, [getAllSites]);

  return (
    <div className="main w-full">
      <div className="w-full flex flex-col">
        <div className="backaground_image w-full"></div>
        <div className="top-part w-full gap-2 flex flex-col">
          <h1 className="text-white text-4xl text-center font-bold underline mb-2">
            Un Voyage dans la région des maritimes
          </h1>
          <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
            Rends ton rêve touristique réel avec cette visite des quelques sites touristiques
          </h1>
          <div className="w-full flex justify-center items-center gap-2 mt-8">
            <input
              type="text"
              className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
              placeholder="Rechercher site touristique..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => navigate(`/search?searchTerm=${search}`)}
              className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
            >
              Go
            </button>
          </div>

          <div className="w-[90%] max-w-xl flex justify-center mt-10">
            <button
              onClick={() => navigate("/search?offer=true")}
              className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-e border-white rounded-s-full flex-1 hover:scale-105 transition-all duration-150"
            >
              Meilleures offres
              <LuBadgePercent className="text-2xl" />
            </button>
            <button
              onClick={() => navigate("/search?sort=packageTotalRatings")}
              className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-s border-white rounded-e-full flex-1 hover:scale-105 transition-all duration-150"
            >
              Les plus visités
              <FaRankingStar className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="main p-6 flex flex-col gap-5">
          {loading ? (
            <h1 className="text-center text-2xl">Chargement...</h1>
          ) : allSites.length === 0 ? (
            <h1 className="text-center text-2xl">Pas de site touristique disponible</h1>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Les lieux Touristiques</h1>
              <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
                {allSites.map((site, i) => (
                  <PackageCard key={i} packageData={site} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
