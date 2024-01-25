import clsx from 'clsx'
import React, {useState, useEffect} from 'react'
import { useId } from 'react';
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import { Link } from 'react-router-dom'




const ListHourlyRatePage: React.FC = () => {
  const nameInputId = useId();
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState(true);

  //const [data, setData] = useState({ idWorker:'lfekfe', idConstruction:'32mpkmfpekw32', wage:'2', overtimeHr:'3',weekendHr:'4',dailyWage:'5',  nightHr:''})

  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [filter, setFilter] = useState('');

  const [constructions, setConstructions] = useState([]);
  const [selectedConstruction, setSelectedConstruction] = useState([]);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);

  const dummyData = [
    {
      id: '1',
      workerName: 'John Doe',
      constructionSite: 'Site A',
      wage: '100',
      overtimeHours: '2',
      weekendHours: '5',
      dailyWage: '120',
      nightHours: '3'
    },
    {
      id: '2',
      workerName: 'Jane Smith',
      constructionSite: 'Site B',
      wage: '110',
      overtimeHours: '3',
      weekendHours: '4',
      dailyWage: '130',
      nightHours: '2'
    },
    {
      id: '3',
      workerName: 'Jim Beam',
      constructionSite: 'Site C',
      wage: '105',
      overtimeHours: '1',
      weekendHours: '6',
      dailyWage: '115',
      nightHours: '4'
    }
  ];
  const [data, setData] = useState(dummyData);


  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateConfig = () => {
    setConfigLoading(true)
    try {
      LayoutSetup.setConfig(config)
      window.location.reload()
    } catch (error) {
      setConfig(getLayoutFromLocalStorage())
      setConfigLoading(false)
    }
  }

  const reset = () => {
    setResetLoading(true)
    setTimeout(() => {
      setConfig(getLayoutFromLocalStorage())
      setResetLoading(false)
    }, 1000)
  }



  useEffect(() => {
    const url = 'https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/hourlyrate';
    axios.get(url)
      .then((response) => {
        setWorkers(response.data); // Set the response directly, assuming it's an array
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleChange = (e:any) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]:value})
  }


  const handleDelete = (id:any) => {
    const confirm = window.confirm("Jeste li sigurni da želite izbrisati stavku?");
    if(confirm){
      axios.delete('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/hourlyrate/' + id)
      .then(res => {
        window.location.reload();
      }).catch(err => console.log(err));
    }
  } 


/*   const filteredData = data.filter(
    (d) =>
      d.name.toLowerCase().includes(filter.toLowerCase()) ||
      d.address.toLowerCase().includes(filter.toLowerCase())
  ).filter(filterByDate); */
  

  return (
    <div className='d-flex flex-column align-items-center bg-light vh-100'>
      <h1>Lista radnih sati</h1>
      <div className='w-100 rounded bg-white border shadow p-4 '>
        <div className='col-lg-3'>
          <input
              type="text"
              className='form-control me-3'
              placeholder="Pretraži po imenu ili adresi"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Br.</th>
              <th>Radnik</th>
              <th>Gradilište</th>
              <th>Plaća</th>
              <th>Prekovremeni</th>
              <th>Vikend sati</th>
              <th>Dnevncica</th>
              <th>Noćni sati</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.workerName}</td>
                <td>{d.constructionSite}</td>
                <td>{d.wage} €</td>
                <td>{d.overtimeHours} h</td>
                <td>{d.weekendHours} h</td>
                <td>{d.dailyWage} €</td>
                <td>{d.nightHours} h</td>
                <td>
                  <button className='btn btn-sm btn-primary me-2'>Otvori</button>
                  <Link to={`/edit/${d.id}`} className="btn btn-sm btn-info me-2">Izmijeni</Link>
                  <button onClick={() => handleDelete(d.id)} className='btn btn-sm btn-danger'>Izbriši</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='col-lg-1'>
          <select
            className='form-select me-3'
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className='d-flex justify-content-center'>
          <nav>
            <ul className='pagination'>
              {Array.from({ length: Math.ceil(dummyData.length / itemsPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className='page-link' onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export {ListHourlyRatePage}