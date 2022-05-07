import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
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
  const [deviceIDs, setDeviceIDs] = useState<string[] | null>(null);

  const [serialNumber, setSerialNumber] = useState("");
  // const [deviceID, setDeviceID] = useState("");
  const [data, setData] = useState<IPoint[] | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    const fetchSNs = async () => {
      try {
        setLoading(true);
        setSerialNumbers(await API.fetchSerialNumbers());
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchSNs();
  }, []);

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        setLoading(true);
        setData(await API.fetchData());
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchInitData();
  }, []);


  const handleSerialNumberChange = async (SN: string) => {
    try {
      setLoading(true);
      // handle choose default value '' for serial number
      if (SN !== "") {
        setData(await API.fetchData(SN));
        setDeviceIDs(await API.fetchDeviceIDs(SN));
      } else {
        setData(await API.fetchData());
        setDeviceIDs([]);
      }
      setSerialNumber(SN);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleDeviceIDChange = async (DID: string) => {
    try {
      setLoading(true);
      // handle choose default value '' for device ID
      if (DID !== "") {
        setData(await API.fetchData(serialNumber, DID));
      } else {
        setData(await API.fetchData(serialNumber));
      }
      // setDeviceID(DID);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Box className="container">
      <Typography
        align="center"
        variant="h4"
        className="title"
        gutterBottom={true}
      >
        Smart Homes Data Visualization
      </Typography>
      <div className="dropdownsContainer">
        <div>
          <Dropdown
            data={serialNumbers}
            title="Serial Number"
            handleChange={handleSerialNumberChange}
          />
        </div>
        <div>
          <Dropdown
            data={deviceIDs}
            title="Devive ID"
            handleChange={handleDeviceIDChange}
          />
        </div>
      </div>

      {loading && (
        <Box className="spinnerContainer">
          <CircularProgress />
        </Box>
      )}
      {error && "Error! Could not fetch data from server."}

      <Chart data={data} />
    </Box>
  );
}

export default App;
