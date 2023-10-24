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
import {useForm} from 'react-hook-form'
import axios from 'axios'




const AddWorkersPage: React.FC = () => {
  const nameInputId = useId();
  const [data, setData] = useState ({ime:"", prezime:"", adresa:"", oib:"", email:"", mobitel:"", broj_putovnice:"", ime_oca:"", ime_majke:"", Radna_dozvola:"", Ljecnicki:"", Zastita:'', Prva_pomoc:'', GEDA:'' })
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
        setChecked(current => !current);
    
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
    <div className="mb-10">
      <label htmlFor={nameInputId} className="form-label">Ime</label>
      <input
        id={nameInputId}
        type="text"
        name="ime"
        className="form-control h-40px w-500px"
        placeholder="Ime"
        onChange={handleChange}
        value={data.ime}
      />
    </div>

    <div className="mb-10">
      <label className="form-label">Prezime</label>
      <input
        type="text"
        name="prezime"
        className="form-control h-40px w-500px"
        placeholder="Prezime"
        onChange={handleChange}
        value={data.prezime}
      />
    </div>

    <div className="mb-10">
      <label className="form-label">Adresa</label>
      <input
        type="text"
        name="adresa"
        className="form-control h-40px w-500px"
        placeholder="Adresa"
        onChange={handleChange}
        value={data.adresa}
      />
    </div>

    <div className="mb-10">
      <label className="form-label">OIB</label>
      <input
        type="number"
        name="oib"
        className="form-control h-40px w-500px"
        placeholder="OIB"
        onChange={handleChange}
        value={data.oib}
      />
    </div>

    <div className="mb-10">
      <label className="form-label">Broj mobitela</label>
      <input
        type="tel"
        name="mobitel"
        className="form-control h-40px w-500px"
        placeholder="tel"
        onChange={handleChange}
        value={data.mobitel}
      />
    </div>

    <div className="mb-10">
      <label className="form-label">E-mail adresa</label>
      <input
        type="email"
        name="email"
        className="form-control h-40px w-500px"
        placeholder="email@email.com"
        onChange={handleChange}
        value={data.email}
      />
    </div>
    
    <div className="mb-10">
      <label className="form-label">Broj putovnice</label>
      <input
        type="number"
        name="broj_putovnice"
        className="form-control h-40px w-500px"
        placeholder="Broj putovnice"
        onChange={handleChange}
        value={data.broj_putovnice}
      />
    </div>

    <div className="mb-10">
      <label className="form-label">Ime oca</label>
      <input
        type="text"
        name="ime_oca"
        className="form-control h-40px w-500px"
        placeholder="Ime Oca"
        onChange={handleChange}
        value={data.ime_oca}
      />
    </div>

    <div className="mb-10">
      <label className="form-label">Ime majke</label>
      <input
        type="text"
        name="ime_majke"
        className="form-control h-40px w-500px"
        placeholder="Ime majke"
        onChange={handleChange}
        value={data.ime_majke}
      />
    </div>
    
    <div className="mb-10">
      <label className="form-label">Radna dozvola (ističe)</label>
      <input
        type="date"
        name="Radna_dozvola"
        className="form-control h-40px w-500px"
        placeholder="Radna dozvola"
        onChange={handleChange}
        value={data.Radna_dozvola}
      />
    </div>
    
    <div className="mb-10">
      <label className="form-label">Liječnički pregled (ističe)</label>
      <input
        type="date"
        name="Ljecnicki"
        className="form-control h-40px w-500px"
        placeholder="Liječnički pregled"
        onChange={handleChange}
        value={data.Ljecnicki}
      />
    </div>

    <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
          <input 
          name="Zastita" 
          value={ "ima"}
          onChange={handleChange}
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
          value={ "ima"}
          onChange={handleChange}
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
          value={ "ima"}
          onChange={handleChange}
          className="form-check-input" 
          type="checkbox" 
          id="flexCheckDefault"
          />

          <label className="form-check-label" >
              GEDA
          </label>
      </div>
    </div>
    <button type="submit" className="btn btn-primary font-weight-bold mr-2">Potvrdi</button>

  </form>
	
  )
}

export {AddWorkersPage}







{/* 




<form className="form">
  <div className="card-body">
    <div className="form-group row">
      <div className="col-lg-4">
        <label>Ime:</label>
        <input type="text" className="form-control" placeholder="Ime"/>
      </div>
      <div className="col-lg-4">
        <label>Prezime:</label>
        <input type="text" className="form-control" placeholder="Prezime"/>
        <span className="form-text text-muted">Prezime</span>
      </div>
      <div className="col-lg-4">
        <label>Email:</label>
        <input type="email" className="form-control" placeholder="Enter email"/>
        <span className="form-text text-muted">email</span>
      </div>
    </div>
    <div className="form-group row">
      <div className="col-lg-4">
        <label>Contact:</label>
        <input type="email" className="form-control" placeholder="Enter contact number"/>
        <span className="form-text text-muted">Please enter your contact</span>
      </div>
      <div className="col-lg-4">
        <label>Fax:</label>
        <div className="input-group">
          <div className="input-group-prepend"><span className="input-group-text"><i className="la la-info-circle"></i></span></div>
          <input type="text" className="form-control" placeholder="Fax number"/>
        </div>
        <span className="form-text text-muted">Please enter fax</span>
      </div>
      <div className="col-lg-4">
        <label>Address:</label>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Enter your address"/>
          <div className="input-group-append"><span className="input-group-text"><i className="la la-map-marker"></i></span></div>
        </div>
        <span className="form-text text-muted">Please enter your address</span>
      </div>
    </div>
    <div className="form-group row">
      <div className="col-lg-4">
        <label>Postcode:</label>
        <div className="input-group">
          <div className="input-group-append"><span className="input-group-text"><i className="la la-bookmark-o"></i></span></div>
          <input type="text" className="form-control" placeholder="Enter your postcode"/>
        </div>
        <span className="form-text text-muted">Please enter your postcode</span>
      </div>
    </div>
  </div>
  <div className="card-footer">
    <div className="row">
      <div className="col-lg-4"></div>
      <div className="col-lg-8">
        <button type="reset" className="btn btn-primary mr-2">Submit</button>
        <button type="reset" className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
</form>




<form onSubmit={handleSubmit(onSubmit)}>
<input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
<input type="text" placeholder="Last Name" {...register} />
<input type="text" placeholder="OIB" {...register("OIB", {})} />
<input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
<input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
<input type="number" placeholder="Passport number" {...register("Passport number", {})} />
<input type="text" placeholder="Parents names" {...register("Parents names", {})} />
<input type="datetime" placeholder="Work permit expiration date" {...register("Work permit expiration date", {})} />
<input type="datetime" placeholder="Health certificate expiration date" {...register("Health certificate expiration date", {})} />
<input type="checkbox" placeholder="Workplace safety certificate" {...register} />
<input type="checkbox" placeholder="First aid" {...register("First aid", {})} />
<input type="checkbox" placeholder="GEDA" {...register("GEDA", {})} />
<input type="text" placeholder="Hourly wage" {...register("Hourly wage", {})} />

<input type="submit" />
</form> */}