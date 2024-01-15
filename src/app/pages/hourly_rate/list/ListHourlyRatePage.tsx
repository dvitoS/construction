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

  const [data, setData] = useState({ idWorker:'', idConstruction:'', wage:'', overtimeHr:'',weekendHr:'',dailyWage:'',  nightHr:''})

  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  const [constructions, setConstructions] = useState([]);
  const [selectedConstruction, setSelectedConstruction] = useState([]);




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
  

  return (
    <div className='d-flex flex-column  align-items-center bg-light vh-100'>
    <h1>Lista radnih sati</h1>
    <div className='w-75 rounded bg-white border shadow p-4'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Br.</th>
            <th>Naziv</th>
            <th>Adresa</th>
          </tr>
        </thead>
        <tbody>
            {
              /* data.map((d, i) => (
                <tr key={i}>
                  <td>{i+1+"."}</td>
                  <td>{d.firstName}</td>
                  <td>{d.lastName}</td>
                  <td>
                    <button className='btn btn-sm btn-primary me-2'>Otvori</button>
                    <Link to={'/edit/'+ d.id} className="btn btn-sm btn-info me-2">Izmijeni</Link>
                    <button onClick={e => handleDelete(d.id)}  className='btn btn-sm btn-danger'>Izbriši</button>
                  </td>
                </tr>
              )) */
            }
        </tbody>
      </table>
        

    </div>
  </div>  )
}

export {ListHourlyRatePage}