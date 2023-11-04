import clsx from 'clsx'
import React, {useState} from 'react'
import { useId } from 'react';
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'




const EditCostSheetPage: React.FC = () => {
  const nameInputId = useId();
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState(true);
  const [data, setData] = useState({name:'', bill:'', note:'' })

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

  return (
    <form className="form" method="post" onSubmit={handleSubmit}>
      <h1>Dodavanje troška</h1>
    <div className="form-group row">
        <div className="col-lg-4">
          <label>Naziv:</label>
          <input type="text"
          name="name"
          className="form-control"
          placeholder="Naziv"
          onChange={handleChange}
          value={data.name}/>
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

export {EditCostSheetPage}