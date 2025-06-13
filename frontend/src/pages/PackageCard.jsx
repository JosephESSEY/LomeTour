import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const PackageCard = ({ packageData }) => {
  return (
    <Link to={`/package/${packageData._id}`} className="w-full">
      <div className="w-full bg-white border flex flex-col items-center p-3 rounded shadow-md overflow-hidden">
        <img
          className="w-full h-[220px] rounded border hover:scale-110  transition-all duration-300"
          src={`http://localhost:5000${packageData.imageurl}`}
          alt={`${packageData.nom}`}
        />
        <div className="w-full flex flex-col my-2">
          <p className="font-semibold text-lg capitalize w-[90%] xsm:w-[250px] truncate">
            {packageData.nom}
          </p>
          <p className="text-green-700 text-lg capitalize">
            {packageData.adresse}
          </p>
          {/* price & rating */}
          <div className="flex flex-wrap justify-between">
            
              <p className="flex items-center text-lg">
                <Rating
                  value={12}
                  size="medium"
                  readOnly
                  precision={0.1}
                />
                12
              </p>
            
              <p className="flex gap-1">           
                <span className="font-medium text-green-700">
                  {packageData.description}
                </span>
              </p>
          </div>
          
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
