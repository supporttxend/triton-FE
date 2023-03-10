import React, { useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from "axios";
import './Table.css';
import { DataGrid } from '@mui/x-data-grid';


const column = [
    { field: 'Job_ID', headerName: 'Job ID', width: 160,},
    { field: 'Line_ID', headerName: 'Line ID', width: 160 },
    { field: 'Ansible_Hostname', headerName: 'Ansible Hostname', width: 160 },
    { field: 'inventory_hostname', headerName: 'Inventory Hostname', width: 160 },
    { field: 'distribution', headerName: 'Distribution', width: 160 },
    { field: 'distribution_version', headerName: 'Distribution Version', width: 160 },
    { field: 'os_family', headerName: 'Os Family', width: 160 },
    { field: 'processor_type', headerName: 'Processor Type', width: 160 },
    { field: 'processor_model', headerName: 'Processor Model', width: 160 },
];



const AssetTable = () => {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(false);
    let dataArr = [];
    useEffect(() => {
        setloading(true)
        fetchData()
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PYTHON_MAIN_API}/data`)
            if (response.data.status === 200) {
                setData(response.data.data)
            }
            setloading(false)
        } catch (error) {
            setloading(false)
        }
    }

    const columns = [
        {
            accessorKey: 'Asset_ID',
            header: 'Asset ID',
            size: 5,
        },
        {
            accessorKey: 'Enabled',
            header: 'Enabled',
            size: 20,
        },
        {
            accessorKey: 'Asset_Name',
            header: 'Asset Name',
            size: 50,
        },
        {
            accessorKey: 'Created_At',
            header: 'Created Date',
            size: 50,
        },
        {
            accessorKey: 'Last_Update_Date',
            header: 'Last Updated Date',
            size: 200,
        },
    ]

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
                    pagination: {}
                }}
                state={{ isLoading: loading }}
                muiTableBodyRowProps={{
                    hover: false,
                    sx: {
                        '&:hover': {
                            backgroundColor: '#B7E5FF',
                        },

                    },

                }}

                muiTableBodyCellProps={{
                    sx: {
                        padding: "0.5rem"
                    }
                }}
                muiTableContainerProps={{ sx: { maxWidth: '99%' } }}

                filterFromLeafRows
                renderDetailPanel={
                    ({ row }) => (
                    dataArr = row.original.subRow?.map((subRows,index) => { return { ...subRows, id: index}; }),
                    <div style={{ height:'400px' ,width: '100%' }}>
                        <DataGrid
                        rows={dataArr}
                        columns={column}
                        pageSize={10}
                        rowsPerPageOptions={[10]}

                      />
                      </div>

                )}
                muiTableDetailPanelProps={{
                    sx: {
                        '&:hover': {
                            backgroundColor: 'white',
                        },

                    },
                }}
            />
        </>
    )
};
export default AssetTable;


