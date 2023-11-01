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
  const [d, setD] = useState ({address:"", oib:"", email:"", mob:"", passport:"", fatherName:"", motherName:"", workingPermit:"", firstAidDate:"", workProtection:'', firstAid:'', geda:'', hr:'', overtimeHr:'',weekendHr:'',dailyWage:'',note:''});
  const [data, setData] = useState ({firstName:'', lastName:''});
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState(true);
  

    function handleSubmit(e:any) {
        e.preventDefault()
        if(e){
          axios.post('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers', data)
          .then(res => {
            window.location.reload()
            window.alert("Dodan novi radnik")
          }).catch(err => console.log(err));
        }
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
          name="firstName"
          className="form-control"
          placeholder="Ime radnika"
          onChange={handleChange}
          value={data.firstName}/>
        </div>

        <div className="col-lg-4">
          <label>Prezime:</label>
          <input type="text"
          name="lastName"
          className="form-control"
          placeholder="Prezime radnika"
          onChange={handleChange}
          value={data.lastName}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-lg-4">
          <label>Adresa:</label>
          <input type="text"
          name="address"
          className="form-control"
          placeholder="Prebivalište radnika"
          onChange={handleChange}
          value={d.address}/>
        </div>

          <div className="col-lg-4">
            <label>OIB:</label>
            <input type="number"
            name="oib"
            className="form-control"
            placeholder="OIB"
            onChange={handleChange}
            value={d.oib}/>
          </div>
          

        <div className="col-lg-4">
          <label>Putovnica:</label>
            <input        
            type="number"
            name="passport"
            className="form-control"
            placeholder="Br putovnice"
            onChange={handleChange}
            value={d.passport}/>
        </div>

        <div className="col-lg-4">
          <label>Broj mobitela:</label>
            <input type="tel" name="mob" className="form-control" placeholder="Br mobitela"/>
        </div>
{/*         <div className="col-lg-4">
          <label>E-mail:</label>
            <input type="email"
              name="email"
              className="form-control"
              placeholder="email@email.com"
              onChange={handleChange}
              value={d.email}/>
        </div> */}
      </div>

      <div className="form-group row">
        <div className="col-lg-4">
          <label>Ime oca:</label>
            <input type="text"
            name="fatherName"
            className="form-control"
            placeholder="Ime oca radnika"
            onChange={handleChange}
            value={d.fatherName}/>
        </div>

        <div className="col-lg-4">
          <label>Ime majke:</label>
            <input type="text"
            name="motherName"
            className="form-control"
            placeholder="Ime majke radnika"
            onChange={handleChange}
            value={d.motherName}/>
        </div>
      </div><br/>
        <div>SATNICA</div>
      <div className="form-group row">
        <div className="col-lg-3">
          <label>Normalna satnica:</label>
            <input type="number"
            name="hr"
            className="form-control"
            placeholder="Iznos satnice"
            onChange={handleChange}
            value={d.hr}/>
        </div>

        <div className="col-lg-3">
          <label>Prekovremena satnica:</label>
            <input type="number"
            name="overtimeHr"
            className="form-control"
            placeholder="Satnica prekovremenih"
            onChange={handleChange}
            value={d.overtimeHr}/>
        </div>

        <div className="col-lg-3">
          <label>Vikend satnica:</label>
            <input type="number"
            name="weekendHr"
            className="form-control"
            placeholder="Satnica za vikend"
            onChange={handleChange}
            value={d.weekendHr}/>
        </div>

        <div className="col-lg-3">
          <label>Dnevnica:</label>
            <input type="number"
            name="dailyWage"
            className="form-control"
            placeholder="Dnevnica ako ju ima"
            onChange={handleChange}
            value={d.dailyWage}/>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-lg-4">
          <label>Radna dozvola vrijedi do:</label>
            <input type="date"
            name="workingPermit"
            className="form-control"
            placeholder="Radna dozvola"
            onChange={handleChange}
            value={d.workingPermit} />
        </div>

        <div className="col-lg-4">
          <label>Liječnički pregled vrijedi do:</label>
            <input type="date"
            name="firstAidDate"
            className="form-control"
            placeholder="Liječnički pregled"
            onChange={handleChange}
            value={d.firstAidDate}/>
        </div>
      </div>
    </div>
   <br />
   <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
          <input 
          name="workProtection" 
          value="false"
          onChange={handleChangeCheckbox}
          className="form-check-input" 
          type="checkbox"  
          />
          
          <label className="form-check-label" >
              Zaštita na radu
          </label>
      </div>
    </div>

    <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
          <input  
          name="firstAid" 
          value="false"
          onChange={handleChangeCheckbox}
          className="form-check-input" 
          type="checkbox" 
          />

          <label className="form-check-label" >
              Prva pomoć
          </label>
      </div>
    </div>
    <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
          <input  
          name="geda" 
          value="false"
          onChange={handleChangeCheckbox}
          className="form-check-input" 
          type="checkbox" 
          />

          <label className="form-check-label" >
              GEDA
          </label>
      </div>
    </div>
    <div className="col-lg-4">
      <label>Napomena:</label>
        <textarea
        rows={5}
        cols={50}
        name="note"
        className="form-control"
        placeholder="Unesite napomenu"
        onChange={handleChange}
        value={d.note}/>
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






