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
import axios from 'axios';
import internal from 'stream';

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  oib: number;
  passport: number;
  mob: string;
  email: string;
  fatherName:string;
  motherName:string;
  wage:number; 
  overtimeHr:number; 
  weekendHr:number; 
  dailyWage:number;  
  nightHr:number; 
  workingPermit:any
  firstAidDate:string;
  workProtection:boolean; 
  firstAid:boolean; 
  geda:boolean;
  note:string;
  tools:string;
}

const AddWorkersPage: React.FC = () => {
  const nameInputId = useId();
  const [data, setData] = useState<FormData>({firstName:'', lastName:'', address:'', oib:0, passport:0, mob:'', email:'', fatherName:"", motherName:"", wage:0, overtimeHr:0, weekendHr:0, dailyWage:0,  nightHr:0, workingPermit:'' , firstAidDate:'', workProtection:false, firstAid:false, geda:false, note:'', tools:''});
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState(true);
  

    function handleSubmit(e:React.FormEvent) {
        e.preventDefault()
        if(e){
          axios.post('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers', data)
          .then(res => {
            window.location.reload()
            window.alert("Dodan novi radnik")
          }).catch(err => console.log(err));

        }
    }
  
    
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;

      setData((prevdata) => ({
        ...prevdata,
        [name]: name === 'oib, passport'  ? parseInt(value, 10) : value,        
      }));
      console.log(value)
    };
    


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
  <div>
    <h1>Unos Radnika</h1>
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
          required
          onChange={handleChange}
          value={data.firstName}/>
        </div>

        <div className="col-lg-4">
          <label>Prezime:</label>
          <input type="text"
          name="lastName"
          className="form-control"
          placeholder="Prezime radnika"
          required
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
          required
          onChange={handleChange}
          value={data.address}/>
        </div>

          <div className="col-lg-4">
            <label>OIB:</label>
            <input 
            type="number"
            name="oib"
            min="0"
            max="99999999999"
            step="1"
            className="form-control"
            placeholder="OIB"
            
            onChange={handleChange}
            value={data.oib}/>
          </div>
          

        <div className="col-lg-4">
          <label>Putovnica:</label>
            <input        
            type="number"
            name="passport"
            min="0"
            max="999999999999"
            step="1"
            className="form-control"
            placeholder="Br putovnice"
            required
            onChange={handleChange}
            value={data.passport}/>
        </div>

        <div className="col-lg-4">
          <label>Broj mobitela:</label>
            <input
             type="tel"
              name="mob"
              className="form-control"
              placeholder="Br mobitela"
              required
              onChange={handleChange}
              value={data.mob}
              />
        </div>
        <div className="col-lg-4">
          <label>E-mail:</label>
            <input type="email"
              name="email"
              className="form-control"
              placeholder="email@email.com"
              required
              onChange={handleChange}
              value={data.email}/>
        </div> 
      </div>

      <div className="form-group row">
        <div className="col-lg-4">
          <label>Ime oca:</label>
            <input type="text"
            name="fatherName"
            className="form-control"
            placeholder="Ime oca radnika"
            required
            onChange={handleChange}
            value={data.fatherName}/>
        </div>

        <div className="col-lg-4">
          <label>Ime majke:</label>
            <input type="text"
            name="motherName"
            className="form-control"
            placeholder="Ime majke radnika"
            required
            onChange={handleChange}
            value={data.motherName}/>
        </div>
      </div><br/>
        <div>PLAĆA I SATNICA</div>
        <div className="form-group row">
        <div className="col-lg-2">
          <label>Plaća:</label>
          <div className="input-group">
            <input type="number"
            name="wage"
            className="form-control"
            placeholder="Plaća"
            onChange={handleChange}
            value={data.wage}/>
            <div className="input-group-append"><span className="input-group-text">€</span></div>
        </div>
        </div>


        <div className="col-lg-2">
          <label>Prekovremeno:</label>
          <div className="input-group">
            <input type="number"
            name="overtimeHr"
            className="form-control"
            placeholder="€"
            onChange={handleChange}
            value={data.overtimeHr}/>
          <div className="input-group-append"><span className="input-group-text">€</span></div>
          </div>
        </div>
        <div className="col-lg-2">
          <label>Vikend satnica:</label>
          <div className="input-group">
            <input type="number"
            name="weekendHr"
            className="form-control"
            placeholder="€"
            onChange={handleChange}
            value={data.weekendHr}/>
            <div className="input-group-append"><span className="input-group-text">€</span></div>
        </div>
        </div>

        <div className="col-lg-2">
          <label>Dnevnica:</label>
          <div className="input-group">
            <input type="number"
            name="dailyWage"
            className="form-control"
            placeholder="€"
            onChange={handleChange}
            value={data.dailyWage}/>
            <div className="input-group-append"><span className="input-group-text">€</span></div>

        </div>
        </div>

        <div className="col-lg-2">
        <label>Noćni rad:</label>
        <div className="input-group">
          <input type="number"
          name="nightHr"
          className="form-control"
          placeholder="€"
          onChange={handleChange}
          value={data.nightHr}/>
          <div className="input-group-append"><span className="input-group-text">€</span></div>
      </div>
      </div>
       
      

      
    </div>
      <div className="form-group row">
        <div className="col-lg-4">
          <label>Radna dozvola vrijedi do:</label>
            <input type="date"
            name="workingPermit"
            className="form-control"
            placeholder="Radna dozvola"
            required
            onChange={handleChange}
            value={data.workingPermit} />
        </div>

        <div className="col-lg-4">
          <label>Liječnički pregled vrijedi do:</label>
            <input type="date"
            name="firstAidDate"
            className="form-control"
            placeholder="Liječnički pregled"
            required
            onChange={handleChange}
            value={data.firstAidDate}/>
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
          required

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
          required

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
          required

          />

          <label className="form-check-label" >
              GEDA
          </label>
      </div>
    </div>
    <div className="col-lg-4">
      <label>Posuđeni alat:</label>
        <textarea
        rows={5}
        cols={50}
        name="tools"
        className="form-control"
        placeholder="Alat"
        onChange={handleChange}
        value={data.tools}/>

        <label>Napomena:</label>
        <textarea
        rows={5}
        cols={50}
        name="note"
        id='note'
        className="form-control"
        placeholder="Unesite napomenu"
        onChange={handleChange}
        value={data.note}/> 
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
</div>
  )
}

export {AddWorkersPage}






