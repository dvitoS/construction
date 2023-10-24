/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios'
import {useEffect} from 'react'

const EditWorkersPage: React.FC = () => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [post,setPost] = useState({
    ime:"",
    prezime:"",
    adresa:"",
    oib:"",
    email:"",
    mobitel:"", 
    broj_putovnice:"", 
    ime_oca:"", 
    ime_majke:"", 
    Radna_dozvola:"", 
    Ljecnicki:"", 
    Zastita:'', 
    Prva_pomoc:'', 
    GEDA:''
    })
  
    useEffect(()=>{
      axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers.json').then(res => console.log(res.data))
    },[])
    const handleInput = (event:any) => {
    setPost({...post, [event.target.name]: event.target.value})		
    }
    
    function handleSubmit(event:any){
    event.preventDefault()
    axios.put('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers.json',{post})
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
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
      <label className="form-label">Ime</label>
      <input
      type="text"
      name="ime"
      className="form-control h-40px w-500px"
      placeholder="Ime"
      onChange={handleInput}
  
      />
    </div>
  
    <div className="mb-10">
      <label className="form-label">Prezime</label>
      <input
      type="text"
      name="prezime"
      className="form-control h-40px w-500px"
      placeholder="Prezime"
      onChange={handleInput}
  
      />
    </div>
  
    <div className="mb-10">
      <label className="form-label">Adresa</label>
      <input
      type="text"
      name="adresa"
      className="form-control h-40px w-500px"
      placeholder="Adresa"
      onChange={handleInput}
  
      />
    </div>
  
    <div className="mb-10">
      <label className="form-label">OIB</label>
      <input
      type="number"
      name="oib"
      className="form-control h-40px w-500px"
      placeholder="OIB"
      onChange={handleInput}
      />
    </div>
  
    <div className="mb-10">
      <label className="form-label">Broj mobitela</label>
      <input
      type="tel"
      name="mobitel"
      className="form-control h-40px w-500px"
      placeholder="tel"
      onChange={handleInput}
      />
    </div>
  
    <div className="mb-10">
      <label className="form-label">E-mail adresa</label>
      <input
      type="email"
      name="email"
      className="form-control h-40px w-500px"
      placeholder="email@email.com"
      onChange={handleInput}
  
      />
    </div>
      
    <div className="mb-10">
      <label className="form-label">Broj putovnice</label>
      <input
      type="number"
      name="broj_putovnice"
      className="form-control h-40px w-500px"
      placeholder="Broj putovnice"
      onChange={handleInput}
      />
    </div>
  
    <div className="mb-10">
      <label className="form-label">Ime oca</label>
      <input
      type="text"
      name="ime_oca"
      className="form-control h-40px w-500px"
      placeholder="Ime Oca"
      onChange={handleInput}
  
      />
    </div>
  
    <div className="mb-10">
      <label className="form-label">Ime majke</label>
      <input
      type="text"
      name="ime_majke"
      className="form-control h-40px w-500px"
      placeholder="Ime majke"
      onChange={handleInput}
      />
    </div>
      
    <div className="mb-10">
      <label className="form-label">Radna dozvola (ističe)</label>
      <input
      type="date"
      name="Radna_dozvola"
      className="form-control h-40px w-500px"
      placeholder="Radna dozvola"
      onChange={handleInput}
      />
    </div>
      
    <div className="mb-10">
      <label className="form-label">Liječnički pregled (ističe)</label>
      <input
      type="date"
      name="Ljecnicki"
      className="form-control h-40px w-500px"
      placeholder="Liječnički pregled"
      onChange={handleInput}
      />
    </div>
  
    <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
        <input 
        name="Zastita" 
        className="form-check-input" 
        type="checkbox"  
        id="flexCheckDefault"
        onChange={handleInput}
        />
        <label className="form-check-label" >
          Zaštita na radu
        </label>
      </div>
    </div>
  
    <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
        <input  
        name="Prva_pomoc" 
        className="form-check-input" 
        type="checkbox" 
        id="flexCheckDefault"
        onChange={handleInput}
        />
        <label htmlFor="prvapomoc" className="form-check-label" >
          Prva pomoć
        </label>
      </div>
    </div>
    <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
        <input  
        name="GEDA" 
        className="form-check-input" 
        type="checkbox" 
        id="flexCheckDefault"
        onChange={handleInput}
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

export {EditWorkersPage}
