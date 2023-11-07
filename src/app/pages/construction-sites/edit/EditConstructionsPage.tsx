/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import {useEffect} from 'react'
import ReactDom from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'


const EditConstructionsPage: React.FC = () => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [data, setData] = useState({name:'', id:'', proof:'', bill:'', adress:'', note:'', charged:''})
  const [gradiliste, setGradiliste] = useState([])
  const [dokaznica, setDokaznica] =useState('');
  const [racun, setRacun] =useState('');
  const [adresa_gradilista, setAdresa_gradilista] =useState('');
  const { id } = useParams();

  
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

  useEffect(()=>{
    axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/constructions/'+ id)
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[])
  const handleInput = (event:any) => {
  //setData({...data, [event.target.name]: event.target.value})		
  }
  
  function handleSubmit(event:any){
  event.preventDefault()
  axios.put('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/constructions.json', data)
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
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
          <label>Ime:</label>
          <input type="text"
          name="name"
          className="form-control"
          placeholder="Unesite ime gradilišta"
          onChange={handleChange}
          value={data.name}/>
        </div>

        <div className="col-lg-4">
        <label>Adresa:</label>
        <input type="text"
        name="adress"
        className="form-control"
        placeholder="Unesite adresu gradilišta"
        onChange={handleChange}
        value={data.adress}/>
      </div>
    </div>
    <div className="form-group row">
      <div className="col-lg-4">
        <label>Dodaj dokaznicu:</label>
          <input type="date"
          name="proof"
          className="form-control"
          placeholder="Dokaznica"
          onChange={handleChange}
          value={data.proof}/>
      </div>

        <div className="col-lg-4">
          <label>Dodaj račun:</label>
            <input type="date"
            name="bill"
            className="form-control"
            placeholder="Racun"
            onChange={handleChange}
            value={data.bill}/>
        </div>


        <div className="col-lg-2">
      <label>Naplaćeno:</label>
      <div className="input-group">
        <input type="number"
        name="charged"
        className="form-control"
        placeholder="Naplaćeno"
        onChange={handleChange}
        value={data.charged}/>
      <div className="input-group-append"><span className="input-group-text">€</span></div>
    </div>
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
        value={data.note}/>
    </div>

       

    <br/>
    <div className="card-footer">
          <button type="submit" className="btn btn-primary font-weight-bold mr-2">Potvrdi</button>
        </div>
  </form>
  
  )
}

export {EditConstructionsPage}
