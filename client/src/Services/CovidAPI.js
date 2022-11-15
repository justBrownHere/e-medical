import axios from "axios"
import moment from 'moment'

export const getCountries = async() => {
    return await axios.get("https://api.covid19api.com/countries");
}

export const getReportByCountry = (slug) =>
  axios.get(
    `https://api.covid19api.com/dayone/country/${slug}`
  );

  export const getMapDataByCountryId = (countryId) =>
    import(
      `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
    );