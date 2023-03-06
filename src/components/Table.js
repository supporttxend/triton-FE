import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from "axios";
import env from "react-dotenv";



import './Table.css';



const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [showExpandedColumns, setVisibilityExpandedColumns] = useState(true)

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
        accessorKey: 'Asset_ID',
        header: 'Asset ID',
        size: 5,

        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'Enabled',
        header: 'Enabled',
        size: 20,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'Asset_Name',
        header: 'Asset Name',
        size: 50,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'Created_At',
        header: 'Created Date',
        size: 50,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'Last_Update_Date',
        header: 'Last Updated Date',
        size: 200,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'Ansible_Hostname',
        header: 'Last Updated Date',
        size: 200,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'Job_ID',
        header: 'Last Updated Date',
        size: 200,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'Line_ID',
        header: 'Last Updated Date',
        size: 200,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'distribution',
        header: 'Last Updated Date',
        size: 200,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'distribution_version',
        header: 'Last Updated Date',
        size: 200,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'inventory_hostname',
        header: 'Last Updated Date',
        size: 200,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'os_family',
        header: 'Last Updated Date',
        size: 200,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'processor_model',
        header: 'Last Updated Date',
        size: 200,
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'processor_type',
        header: 'Last Updated Date',
        size: 200,
        muiTableBodyCellProps: {
          align: 'center',
        },
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
        enableRowNumbers={false}

        initialState={{
          showColumnFilters: true,
          pagination: {},
          columnVisibility: {
            Asset_ID: !showExpandedColumns,
            Asset_Name:!showExpandedColumns,
            Created_At: !showExpandedColumns,
            Enabled: !showExpandedColumns,
            Last_Update_Date: !showExpandedColumns,
            Ansible_Hostname: showExpandedColumns,
            Job_ID: showExpandedColumns,
            Line_ID: showExpandedColumns,
            distribution: showExpandedColumns,
            distribution_version: showExpandedColumns,
            inventory_hostname: showExpandedColumns,
            os_family: showExpandedColumns,
            processor_model: showExpandedColumns,
            processor_type: showExpandedColumns,
          }
        }}
        state={{ isLoading: loading }}
        muiTableBodyRowProps={{
          hover: false,
          sx: {
            '&:hover': {
              backgroundColor: '#B7E5FF',
            },

          }

        }}
        // onExpandedChange={() => {
        //  g
        //   setVisibilityExpandedColumns(false)
        //   console.log(showExpandedColumns)
        // }}
        // getIsRowExpanded={() => {
        //   setVisibilityExpandedColumns(true)
        // }}
        getIsRowExpanded={(row)=>{console.log("dddddd",row)}}
        muiTableBodyCellProps={{
          sx: {
            padding: "0.5rem"
          }
        }}
        muiTableContainerProps={{ sx: { maxWidth: '99%' } }}
        enableExpanding
      />
    </>
  )
};
export default Table;




