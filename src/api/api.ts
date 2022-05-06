import axios, { AxiosResponse } from "axios";

const url: string = 'http://localhost:5000/api';

export const fetchSerialNumbers = async () => {
  try {
    const { data } = await axios.get(`${url}/sns`);
    // console.log(data);
    return data;

  } catch (error) {
    console.log(error)
  }
};


// export const fetchDeviceIDs = async () => {
//   try {
//     const { data } = await axios.get(`${url}/id`);
//     // console.log(data);
//     return data;

//   } catch (error) {
//     console.log(error)
//   }
// };


export const fetchData = async ( serialNumber: string ) => {
  let changeableUrl = `${url}/all`;

  if( serialNumber ){
      changeableUrl=`${url}/sn/${serialNumber}`
  }

  try {
      //destructure data from res
      const { data } = await axios.get(changeableUrl);
      
      return data;
  } catch (error) {
      console.log(error)
  }
}