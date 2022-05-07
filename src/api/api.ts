import axios from "axios";

const url: string = 'http://localhost:5000/api';

// fetch serial number for dropdown menu
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
  let changeableUrl = `${url}/all`;

  if( serialNumber ){
      changeableUrl=`${url}/dids/${serialNumber}`
  }

  try {
      
      const { data } = await axios.get(changeableUrl);
      
      return data;
  } catch (error) {
      console.log(error)
  }
}




export const fetchData = async ( serialNumber?: string, deviceID?: string ) => {

  let changeableUrl = `${url}/data?serialNumber=${serialNumber}&deviceID=${deviceID}`


  try {
      const { data } = await axios.get(changeableUrl);
      
      return data;
  } catch (error) {
      console.log(error)
  }
}