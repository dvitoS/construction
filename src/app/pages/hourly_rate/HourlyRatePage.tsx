import clsx from 'clsx'
import React, {useState, useEffect} from 'react'
import { useId } from 'react';
import {KTIcon, toAbsoluteUrl} from '../../../../src/_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../src/_metronic/layout/core'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'




const HourlyRatePage: React.FC = () => {
  const nameInputId = useId();
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState(true);

  const [data, setData] = useState('')

  const [constructions, setConstructions] = useState([]);
  const [selectedConstruction, setSelectedConstruction] = useState([]);

  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);


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
    const url = 'https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers';
    axios.get(url)
      .then((response) => {
        setWorkers(response.data); // Set the response directly, assuming it's an array
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const url = 'https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/constructions';
    axios.get(url)
      .then((response) => {
        setConstructions(response.data); // Set the response directly, assuming it's an array
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function handleSubmit(e:any) {
    e.preventDefault()
    
    console.log(data)
    if(e){
      axios.post('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/hourlyrate', data)
      .then(response => {
        window.location.reload()
        window.alert("Dodana nova satnica")
        }).catch(error => {console.log(error.response)})
   }
  }
  

  return (
    <form className="form" method="post" onSubmit={handleSubmit}>
      <h1>Dodavanje troška</h1>
      <div className="form-group row">
        <div className="col-lg-3">
          <label>Radnik</label>
            <select className="form-select form-select-solid" aria-label="Odabir gridlista">
            <option>Odaberite radnika</option>
            {workers.map((worker:any) => (
              <option key={worker.id} value={worker.id}>{worker.firstName}</option>
              ))}
            </select>
            <div/>
        </div> 
        <div className="col-lg-3">
          <label>Gradilište</label>
            <select className="form-select form-select-solid" aria-label="Odabir gridlista">
            <option>Odaberite gradilište</option>
            {constructions.map((construction:any) => (
              <option key={construction.id} value={construction.id}>{construction.name}</option>
              ))}
            </select>
          <div/>
        </div> 
      </div>
    <br/>
      <div className="card-footer">
        <button type="submit" className="btn btn-primary font-weight-bold mr-2">Potvrdi</button>
      </div>
    </form>
  )
}

export {HourlyRatePage}