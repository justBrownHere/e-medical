import React, { Component } from 'react'
import HighlightCard from './HightLightCard';

const HighLight = ({ totalCountries, report }) => {
    const data = report && report.length ? report[report.length - 1] : []
    console.log(data)
    const summary = [
      {
        title: "Coronavirus Cases",
        count: data.Confirmed,
        image:
          "http://demos.codexcoder.com/labartisan/html/covid-19/assets/images/corona/01.png",
      },
      {
        title: "Recovered Cases",
        count: data.Recovered,
        image:
          "http://demos.codexcoder.com/labartisan/html/covid-19/assets/images/corona/02.png",
      },
      {
        title: "Deaths Cases",
        count: data.Deaths,
        image:
          "http://demos.codexcoder.com/labartisan/html/covid-19/assets/images/corona/03.png",
      },
    ];
  return (
    <div
      className="corona-count-top wow fadeInUp"
      data-wow-delay="0.3s"
      style={{
        visibility: "visible",
        animationDelay: "0.3s",
        animationName: "fadeInUp",
      }}
      >
          
      <div className="row justify-content-center align-items-center">
              {summary.map(data => {
            return(<HighlightCard title={data.title} count={data.count} img={data.image} />)
        })}
        
        <div className="col-xl-3 col-md-6 col-12">
          <div className="corona-item">
            <div className="corona-inner">
              <div className="corona-thumb">
                <img
                  src="http://demos.codexcoder.com/labartisan/html/covid-19/assets/images/corona/04.png"
                  alt="corona"
                />
              </div>
              <div className="corona-content">
                <h3>
                  <span className="count-number">{totalCountries}</span>+
                </h3>
                <p>Total Country</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighLight
