/* eslint-disable jsx-a11y/anchor-is-valid */
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




const AddWorkersPage: React.FC = () => {
  const nameInputId = useId();
  const [data, setData] = useState ({ime:"", prezime:"", adresa:"", oib:"", email:"", mobitel:"", broj_putovnice:"", ime_oca:"", ime_majke:"", Radna_dozvola:"", Ljecnicki:"", Zastita:'', Prva_pomoc:'', GEDA:'' });
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState(true);
  

    
    


    function handleSubmit(e:any) {
        e.preventDefault()
        axios.post('https://jsonplaceholder.typicode.com/posts', {data})
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
  
    

    const handleChange = (e:any) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]:value})
    }

    const handleChangeCheckbox = (e:any) =>{
      const name = e.target.name;
      const value = e.target.value;
      if(e.target.checked == true){
        setData({...data, [name]:"true"})
      }else{
        setData({...data, [name]:""})
      }
    }

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

  return (
    <form className="form" method="post" onSubmit={handleSubmit}>
    <div className="card-body">
      <div className="form-group row">
        <div className="col-lg-4">
          <label>Ime:</label>
          <input 
          type="text"
          name="ime"
          className="form-control"
          placeholder="Unesite ime"
          onChange={handleChange}
          value={data.ime}/>
        </div>

        <div className="col-lg-4">
          <label>Prezime:</label>
          <input type="text"
          name="prezime"
          className="form-control"
          placeholder="Unesite prezime"
          onChange={handleChange}
          value={data.prezime}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-lg-4">
          <label>Adresa:</label>
          <input type="text"
          name="adresa"
          className="form-control"
          placeholder="Unesite adresu"
          onChange={handleChange}
          value={data.adresa}/>
        </div>

          <div className="col-lg-4">
            <label>OIB:</label>
            <input type="number"
            name="oib"
            className="form-control"
            placeholder="OIB"
            onChange={handleChange}
            value={data.oib}/>
          </div>
          

        <div className="col-lg-4">
          <label>Putovnica:</label>
            <input        
            type="number"
            name="broj_putovnice"
            className="form-control"
            placeholder="Broj putovnice"
            onChange={handleChange}
            value={data.broj_putovnice}/>
        </div>

        <div className="col-lg-4">
          <label>Broj mobitela:</label>
            <input type="tel" className="form-control" placeholder="Unesite broj mobitela"/>
        </div>

        <div className="col-lg-4">
          <label>Email:</label>
            <input type="email"
              name="email"
              className="form-control"
              placeholder="email@email.com"
              onChange={handleChange}
              value={data.email}/>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-lg-4">
          <label>Ime oca:</label>
            <input type="text"
            name="ime_oca"
            className="form-control"
            placeholder="Unesite ime Oca"
            onChange={handleChange}
            value={data.ime_oca}/>
        </div>

        <div className="col-lg-4">
          <label>Ime majke:</label>
            <input type="text"
            name="ime_majke"
            className="form-control"
            placeholder="Unesite ime majke"
            onChange={handleChange}
            value={data.ime_majke}/>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-lg-4">
          <label>Radna dozvola vrijedi do:</label>
            <input type="date"
            name="Radna_dozvola"
            className="form-control"
            placeholder="Radna dozvola"
            onChange={handleChange}
            value={data.Radna_dozvola} />
        </div>

        <div className="col-lg-4">
          <label>Liječnički pregled vrijedi do:</label>
            <input type="date"
            name="Ljecnicki"
            className="form-control"
            placeholder="Liječnički pregled"
            onChange={handleChange}
            value={data.Ljecnicki}/>
        </div>
      </div>
    </div>
   <br />
   <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
          <input 
          name="Zastita" 
          value="false"
          onChange={handleChangeCheckbox}
          className="form-check-input" 
          type="checkbox"  
          id="flexCheckDefault"/>
          
          <label className="form-check-label" >
              Zaštita na radu
          </label>
      </div>
    </div>

    <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
          <input  
          name="Prva_pomoc" 
          value="false"
          onChange={handleChangeCheckbox}
          className="form-check-input" 
          type="checkbox" 
          id="flexCheckDefault"/>

          <label htmlFor="prvapomoc" className="form-check-label" >
              Prva pomoć
          </label>
      </div>
    </div>
    <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
          <input  
          name="GEDA" 
          value="false"
          onChange={handleChangeCheckbox}
          className="form-check-input" 
          type="checkbox" 
          id="flexCheckDefault"
          />

          <label className="form-check-label" >
              GEDA
          </label>
      </div>
    </div>
    <br/>
    <div className="card-footer">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-8">
          <button type="submit" className="btn btn-primary font-weight-bold mr-2">Potvrdi</button>
        </div>
      </div>
    </div>
  </form>
	
  )
}

export {AddWorkersPage}






