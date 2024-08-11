import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

const  Pagination = ({
  totalCount,
  contentPerPage,
  page,
  onRowsPerPageChange,
  onPageChange,

})=> {
  return (
    <>
    <TablePagination
      component="div"
      count={totalCount}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={contentPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
    />
    </>
  );
}
export default Pagination
