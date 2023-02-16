import React, { useMemo,useState,useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
     setloading(true)
    fetchData()
  }, []);
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:2001/data')
      if(response.data.status === 200){
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
        header: 'Job Id',
      },
      
      {
        accessorKey: 'Line_ID',
        header: 'Line Id',
      },
      {
        accessorKey: 'Asset_ID',
        header: 'Asset Id',
      },
      {
        accessorKey: 'Ansible_Hostname',
        header: 'Ansible Hostname	',
      },
      {
        accessorKey: 'inventory_hostname',
        header: 'Inventory Hostname	',
      },
      {
        accessorKey: 'distribution',
        header: 'Distribution',
      },
      {
        accessorKey: 'distribution_version',
        header: 'Distribution Version',
      },
      {
        accessorKey: 'os_family',
        header: 'Os Family',
      },
      {
        accessorKey: 'processor_type',
        header: 'Processor Type',
      },
      {
        accessorKey: 'processor_model',
        header: 'Processor Model',
      },
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} state={{ isLoading:loading }}/>;
};

export default Table;
