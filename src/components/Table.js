import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from "axios";
import env from "react-dotenv";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  customTableRow: {
    '&:hover': {
      backgroundColor: '#B7E5FF',
    },
  },
  
});

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setloading(true)
    fetchData()
  }, []);
  async function fetchData() {
    try {
      const response = await axios.get(`${env.PYTHON_MAIN_API}data`)
      if (response.data.status === 200) {
        setData(response.data.data)
      }
      setloading(false)
    } catch (error) {
      setloading(false)
    }


  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'job_ID',
        header: 'Job ID',
        size: 5,
        enableGlobalFilter: true,
        enableSorting: true,
        showSortIcon: true,
        
      },

      {
        accessorKey: 'Line_ID',
        header: 'Line ID',
        size: 5,
      },
      {
        accessorKey: 'Asset_ID',
        header: 'Asset ID',
        size: 5,
      },
      {
        accessorKey: 'Ansible_Hostname',
        header: 'Ansible Hostname	',
        size: 20,
      },
      {
        accessorKey: 'inventory_hostname',
        header: 'Inventory Hostname	',
        size: 50,
      },
      {
        accessorKey: 'distribution',
        header: 'Distribution',
        size: 50,
      },
      {
        accessorKey: 'distribution_version',
        header: 'Distribution Version',
        size: 160,
      },
      {
        accessorKey: 'os_family',
        header: 'Os Family',
        size: 50,
      },
      {
        accessorKey: 'processor_type',
        header: 'Processor Type',
        size: 50,
      },
      {
        accessorKey: 'processor_model',
        header: 'Processor Model',
        size: 50,
      },
    ],
    [],
  );

  return (
    <>
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnActions={false}
      enableGlobalFilter={false}
      enableColumnFilters={true}
      enablePagination={false}
      enableSorting={true}
      showSortIcon={true}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      initialState={{ showColumnFilters: true }}
      // muiTableHeadCellFilterTextFieldProps={{
      //   sx: { m: '0.2rem 0', width: '100%' },
      //   variant: 'outlined',
        
      // }}
      muiTableBodyRowProps={{
        className: classes.customTableRow,
        hover: false,
      }}

    />
    </>
  )
};
// state={{ isLoading:loading }} enableRowNumbers
export default Table;
