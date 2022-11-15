import React, { useEffect, useState } from "react";


import { getMapDataByCountryId } from "../../../../../Services/CovidAPI";

import LineChart from "./LineCharts.js/LineCharts";
import HighMaps from "./HighMaps/HighMaps";

const Summary = ({ report, countryId }) => {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (countryId) {
      getMapDataByCountryId(countryId)
        .then((res) => {
          setMapData(res);
        })
        .catch((err) => console.log({ err }));
    }
  }, [countryId]);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-6 col-12">
          <div className="corona-left">
            <div className="cl-title d-flex flex-wrap align-items-center justify-content-between"></div>
            <div className="cl-thumb bg-f9">
              <LineChart data={report} />
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-12">
          <HighMaps mapData={mapData} />
        </div>
      </div>
    </>
  );
};

export default Summary;
