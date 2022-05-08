import axios from "axios";

const url: string = 'http://localhost:5000/api';

// fetch serial numbers for dropdown menu
export const fetchSerialNumbers = async () => {
  try {
    const { data } = await axios.get(`${url}/sns`);
    return data;
  } catch (error) {
    console.log(error)
  }
};

// fetch device ID of current serial number for dropdown menu
export const fetchDeviceIDs = async ( serialNumber: string ) => {
  try {      
      const { data } = await axios.get(`${url}/dids/${serialNumber}`);      
      return data;
  } catch (error) {
      console.log(error)
  }
}

// fetch data for line chart
export const fetchData = async ( page: number, serialNumber: string = "", deviceID: string = "" ) => {
  try {
      const { data } = await axios.get(`${url}/data?page=${page}&serialNumber=${serialNumber}&deviceID=${deviceID}`);      
      return data;
  } catch (error) {
      console.log(error)
  }
}