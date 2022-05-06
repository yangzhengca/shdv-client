import React, { useState, useEffect } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown/Dropdown";
import Chart from "./components/Chart/Chart";
import * as API from "./api/api";
import { Typography, Grid } from "@mui/material";


interface IData {
  Wattage: string;
  DateTime: string;
  Device_ID: string;
}


function App() {
  const [ serialNumbers, setSerialNumbers ] = useState<string[] | null>(null);
  const [ serialNumber, setSerialNumber ] = useState('');
  const [ deviceID, setDeviceID ] = useState('');
  const [ data, setData ] = useState<IData[] | null>(null);

  useEffect(() => {

    const fetchSN = async () => {
      setSerialNumbers(await API.fetchSerialNumbers())
    }
    fetchSN();
    // console.log(serialNumbers)

  }, [])
  
  const handleSNChange = async ( SN: string ) => {
    const fetchedData = await API.fetchData( SN );

    setData(fetchedData);
    setSerialNumber(SN);
    console.log(serialNumber);
  }
  // API.fetchSerialNumbers();
  // console.log(serialNumbers)
  // const SNProps = {
  //   data: serialNumbers
  // }
  

  return (
    <div className="container">
      <Typography align="center" variant="h2">
        Smart Homes Data Visualization
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Dropdown data={serialNumbers} title="Serial Number" handleChange={handleSNChange} />
        </Grid>
        <Grid item xs={5}>
          {/* <Dropdown /> */}
        </Grid>
      </Grid>

      <Chart />
    </div>
  );
}

export default App;
