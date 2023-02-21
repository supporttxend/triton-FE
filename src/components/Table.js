import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from "axios";
import env from "react-dotenv";

import './Table.css';


const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true)
    fetchData()
  }, []);
  async function fetchData() {
    try {
      const response = await axios.get(`${env.PYTHON_MAIN_API}/data`)
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
        size: 200,
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
        size: 100,
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
        enablePagination={true}
        enableBottomToolbar={true}
        enableSorting={true}
        showSortIcon={true}
        enableTopToolbar={false}
        enableRowNumbers={true}
        initialState={{ showColumnFilters: true,pagination:{} }}
        state={{ isLoading: loading }}
        muiTableBodyCellProps={{
          sx: {
            
    padding: '0px',
    margin: '0px',
    '&:first-child': {
      paddingLeft: '20px',
    },
    '&:last-child': {
      paddingRight: '20px',
    },
  
          }
          }}
        muiTableBodyRowProps={{
          hover: false,
          sx:{
            '&:hover': {
              backgroundColor: '#B7E5FF',
            },
          }
          
        }}
        muiTableContainerProps={{ sx: { maxWidth: '99%' } }}
      
      
      />
    </>
  )
};
export default Table;
