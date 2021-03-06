import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import "./App.css";
import Dropdown from "./components/Dropdown/Dropdown";
import Chart from "./components/Chart/Chart";
import Paginate from "./components/Pagination";
import * as API from "./api/api";
import { IPoint } from "./components/Chart/Chart";

function App() {
  //
  const [serialNumbers, setSerialNumbers] = useState<string[] | null>(null);
  const [deviceIDs, setDeviceIDs] = useState<string[] | null>(null);
  const [serialNumber, setSerialNumber] = useState("");
  const [deviceID, setDeviceID] = useState("");
  const [data, setData] = useState<IPoint[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(7);

  // fetch serial numbers when load page
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

  // fetch initial data, which contain Wattage consumptions of all serial numbers
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        setLoading(true);
        setData(await API.fetchData(page));
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchInitData();
  }, []);

  // handle serial number change
  const handleSerialNumberChange = async (SN: string) => {
    try {
      setLoading(true);
      setSerialNumber(SN);
      setPage(1);
      setDeviceIDs([]);
      setDeviceID("")
      // handle choose default value '' for serial number
      if (SN !== "") {
        setData(await API.fetchData(page, SN));
        setDeviceIDs(await API.fetchDeviceIDs(SN));
      } else {
        setData(await API.fetchData(page));
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  // handle device ID change
  const handleDeviceIDChange = async (DID: string) => {
    try {
      setLoading(true);
      setDeviceID(DID);
      setPage(1);
      setData(await API.fetchData(page, serialNumber, DID));      
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  // handle paginate page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ): void => {    
    setPage(newPage);
  };

  // fetch data when page change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setData(await API.fetchData(page, serialNumber, deviceID));
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [page])
  

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
      <div className="paginateContainer">
        <Paginate
          setPage={setPage}
          page={page}
          numberOfPages={numberOfPages}
          handlePageChange={handlePageChange}
        />
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
