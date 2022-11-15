import React, { useEffect, useMemo } from "react";
import { sortBy } from "lodash";
import CountrySelector from "./CountrySelector/CountrySelector";
import {
  getCountries,
  getReportByCountry,
} from "../../../../Services/CovidAPI";
import Summary from "./Summary/Summary";
import Highlight from "./HighLight/HighLight";
import { Container, Typography } from "@material-ui/core";
import "@fontsource/roboto";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");
const CovidTracker = () => {
  const [countries, setCountries] = React.useState([]);
  const [selectedCountryId, setSelectedCountryId] = React.useState("");
  const [report, setReport] = React.useState([]);
  const [totalCountries, setTotalCountries] = React.useState("");
  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data, "Country");
      setCountries(countries);
      setSelectedCountryId("vn");
      setTotalCountries(data.length);
    });
  }, []);

  const handleOnChange = React.useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectedCountryId.toUpperCase()
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
        console.log("getReportByCountry", { res });
        // remove last item = current date
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [selectedCountryId, countries]);

  // const summary = useMemo(() => {
  //   if (report && report.length) {
  //     const latestData = report[report.length - 1];
  //     return [
  //       {
  //         title: "Số ca nhiễm",
  //         count: latestData.Confirmed,
  //         type: "confirmed",
  //       },
  //       {
  //         title: "Khỏi",
  //         count: latestData.Recovered,
  //         type: "recovered",
  //       },
  //       {
  //         title: "Tử vong",
  //         count: latestData.Deaths,
  //         type: "death",
  //       },
  //     ];
  //   }
  //   return [];
  // }, [report]);
  return (
    <section className="corona-count-section home-4 bg-corona padding-tb pt-0">
      <div className="container">
        <div>
          {/* Button trigger modal */}

          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="corona-count-bottom wow fadeInUp">
                    <div className="row justify-content-center mb-5">
                      <CountrySelector
                        handleOnChange={handleOnChange}
                        countries={countries}
                        value={selectedCountryId}
                      />
                    </div>
                    <Summary countryId={selectedCountryId} report={report} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="corona-wrap">
          <Highlight report={report} totalCountries={totalCountries} />
          <div className="corona-count-bottom wow fadeInUp">
            <div className="row mb-3">
              <div className="col-6">
                <CountrySelector
                  handleOnChange={handleOnChange}
                  countries={countries}
                  value={selectedCountryId}
                />
              </div>
               <div className="col-6">
              <button
                  type="button"
                  style={{display: 'block'}}
                className="btn btn-primary mt-5 float-right"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                View Covid Tracker
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CovidTracker;
