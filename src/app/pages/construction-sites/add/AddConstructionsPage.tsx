/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios';

const AddConstructionsPage: React.FC = () => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [d, setD] = useState({dokaznica:'', racun:'', adresa_gradilista:'', opis:''})
  const [data ,setData] = useState({name:''})


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
    axios.post('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/constructions', data)
    .then(response => {console.log(response)})
    .catch(error => {console.log(error.response)})
  }

  

  const handleChange = (e:any) =>{
      const name = e.target.name;
      const value = e.target.value;
      setData({...data, [name]:value})
  }

  return (
    <form className="form" method="post" onSubmit={handleSubmit}>
      <div className="form-group row">
          <div className="col-lg-4">
            <label>Adresa:</label>
            <input type="text"
            name="name"
            className="form-control"
            placeholder="Unesite adresu gradilišta"
            onChange={handleChange}
            value={data.name}/>
          </div>
      </div>
      <div className="form-group row">
        <div className="col-lg-4">
          <label>Dodaj dokaznicu:</label>
            <input type="date"
            name="dokaznica"
            className="form-control"
            placeholder="Dokaznica"
            onChange={handleChange}
            value={d.dokaznica}/>
        </div>

          <div className="col-lg-4">
            <label>Dodaj račun:</label>
              <input type="date"
              name="racun"
              className="form-control"
              placeholder="Racun"
              onChange={handleChange}
              value={d.racun}/>
          </div>
       </div>
       <div className="form-group row">
          <div className="col-lg-4">
            <label>Opis:</label>
              <input type="text"
              name="opis"
              className="form-control"
              placeholder="Opis"
              onChange={handleChange}
              value={d.opis}/>
          </div>
       </div>

       

      <br/>
      <div className="card-footer">
            <button type="submit" className="btn btn-primary font-weight-bold mr-2">Potvrdi</button>
          </div>
    </form>
    
  )
}

export {AddConstructionsPage}
