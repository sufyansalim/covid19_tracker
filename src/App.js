import React, { useState, useEffect } from "react";
import { Cards, CountryPicker, Chart } from "./components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchData } from "./api/";
import styles from "./App.module.css";
import image from "./images/covid.png";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [country, setCountry] = useState();

  useEffect(() => {
    async function loadData() {
      const data = await fetchData();
      setData(data);
    }
    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setCountry(country);
    setData(data);
  };

  return (
    <div className={styles.container}>
      {!!loading ? (
        <>
          <img className={styles.image} src={image} alt="COVID-19" />
          <CircularProgress />
        </>
      ) : (
        <>
          <img className={styles.image} src={image} alt="COVID-19" />
          <Cards data={data} />
          <CountryPicker handleCountryChange={handleCountryChange} />
          <Chart data={data} country={country} />
        </>
      )}
    </div>
  );
};

export default App;
