import React, { useState, useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";
import "./App.css";
import Dropdown from "./components/Dropdown/Dropdown";
import Chart from "./components/Chart/Chart";
import * as API from "./api/api";

import { IPoint } from "./components/Chart/Chart";

// interface IData {
//   Wattage: string;
//   DateTime: string;
//   Device_ID: string;
// }

function App() {
  const [serialNumbers, setSerialNumbers] = useState<string[] | null>(null);
  const [serialNumber, setSerialNumber] = useState("");
  const [deviceID, setDeviceID] = useState("");
  const [data, setData] = useState<IPoint[] | null>(null);

  useEffect(() => {
    const fetchSN = async () => {
      setSerialNumbers(await API.fetchSerialNumbers());
    };
    fetchSN();
    // console.log(serialNumbers)
  }, []);

  const handleSNChange = async (SN: string) => {
    const fetchedData = await API.fetchData(SN);
    // console.log(fetchedData);
    setData(fetchedData);
    setSerialNumber(SN);
  };
  // API.fetchSerialNumbers();
  // console.log(serialNumbers)
  // const SNProps = {
  //   data: serialNumbers
  // }

  return (
    <div className="container">
      <div className="headerWrapper">
        <Typography
          align="center"
          variant="h2"
          className="title"
          gutterBottom={true}
        >
          Smart Homes Data Visualization
        </Typography>

        <Grid
          container
          spacing={3}                 
        >
          <Grid item xs={6} >
            <Dropdown
              data={serialNumbers}
              title="Serial Number"
              handleChange={handleSNChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Dropdown
              data={serialNumbers}
              title="Serial Number"
              handleChange={handleSNChange}
            />
          </Grid>
        </Grid>

        {/* <div className="filterWapper">
          <Dropdown
            data={serialNumbers}
            title="Serial Number"
            handleChange={handleSNChange}
          />
          <Dropdown
            data={serialNumbers}
            title="Serial Number"
            handleChange={handleSNChange}
          />
        </div> */}

      </div>

      <Chart data={data} />
    </div>
  );
}

export default App;
