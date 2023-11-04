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




const AddCostSheetPage: React.FC = () => {
  const nameInputId = useId();
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)

  const [data, setData] = useState({name:'', bill:'', note:'' })

  const [constructions, setConstructions] = useState([]);
  const [selectedConstruction, setSelectedConstruction] = useState('');

  

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

  function handleSubmit(e:any) {
    e.preventDefault()
    
    console.log(data)
    if(e){
      axios.post('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/costsheet', data)
      .then(response => {
        window.location.reload()
        window.alert("Dodan novi troškovnik")
        }).catch(error => {console.log(error.response)})
   }
  }
  

  const handleChange = (e:any) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]:value})
}

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

  return (
    <form className="form" method="post" onSubmit={handleSubmit}>
      <h1>Dodavanje troška</h1>
    <div className="form-group row">
        <div>
          <label>Select a construction:</label>
          
          <select
            value={selectedConstruction}
            onChange={(e) => setSelectedConstruction(e.target.value)}
          >
            <option value="">Select a construction</option>
            {constructions.map((construction:any) => (
              <option key={construction.id} value={construction.id}>
                {construction.name}
              </option>
            ))}
          </select>
        </div>


        <div className="col-lg-4">
          <label>Trošak:</label>
            <input type="number"
            name="bill"
            className="form-control"
            placeholder="Trošak"
            onChange={handleChange}
            value={data.bill}/>
        </div>
        <div className="col-lg-4">
        <label>Opis troška:</label>
          <textarea
          rows={5}
          cols={50}
          name="note"
          className="form-control"
          placeholder="Opis troška"
          onChange={handleChange}
          value={data.note}/>
          </div>
        </div>
    
       

    <br/>
    <div className="card-footer">
          <button type="submit" className="btn btn-primary font-weight-bold mr-2">Potvrdi</button>
        </div>
  </form>
  )
}

export {AddCostSheetPage}