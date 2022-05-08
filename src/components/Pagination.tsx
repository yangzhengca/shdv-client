import React from 'react'
import { Pagination } from '@mui/material';

interface IPaginate {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  numberOfPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void
}

const Paginate: React.FC<IPaginate> = ({ page, setPage, numberOfPages, handlePageChange }) => {
  
  return (
    <Pagination 
      count={numberOfPages} 
      page={page}
      variant="outlined" 
      onChange={handlePageChange} 
    />
  )
}

export default Paginate