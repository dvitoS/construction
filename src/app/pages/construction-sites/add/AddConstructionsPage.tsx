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
  const [data ,setData] = useState({name:'', proof:'', bill:'', address:'', charged:'', description:'', started:'', finished:''})


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
      axios.post('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/constructions', data)
      .then(response => {
        window.location.reload()
        window.alert("Dodano novo gradilište")
        }).catch(error => {console.log(error.response)})
   }
  }
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData((prevdata) => ({
      ...prevdata,
      [name]: name === ''  ? parseInt(value, 10) : value,        

    }));
    console.log(value)
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <div className="card-title m-0"><h3 className="fw-bolder m-0">Unos Gradilišta </h3></div>
      </div>
      <div className='card-body'>
      <form className="form" method="post" onSubmit={handleSubmit}>
          <div className="form-group row">
              <div className="col-lg-3">
                <label>Naziv:</label>
                <input type="text"
                name="name"
                className="form-control"
                placeholder="Naziv gradilišta"
                onChange={handleChange}
                value={data.name}/>
              </div>

              <div className="col-lg-3">
              <label>Adresa:</label>
              <input type="text"
              name="address"
              className="form-control"
              placeholder="Adresa gradilišta"
              onChange={handleChange}
              value={data.address}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-2">
              <label>Dodaj dokaznicu:</label>
                <input type="date"
                name="proof"
                className="form-control"
                placeholder="Dokaznica"
                onChange={handleChange}
                value={data.proof}/>
            </div>

              <div className="col-lg-2">
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
            <div className="col-lg-2">
              <label>Početak:</label>
                <input type="date"
                name="started"
                className="form-control"
                placeholder="Početak"
                onChange={handleChange}
                value={data.started}/>
            </div>

            <div className="col-lg-2">
              <label>Kraj:</label>
                <input type="date"
                name="finished"
                className="form-control"
                placeholder="Kraj"
                onChange={handleChange}
                value={data.finished}/>
            </div>
           </div>
    
           <div className="col-lg-4">
            <label>Opis/Napomena:</label>
              <textarea
              rows={5}
              cols={50}
              name="description"
              className="form-control"
              placeholder="Unesite napomenu"
              onChange={handleChange}
              value={data.description}/>
          </div>

       

          <br/>
          <div className="card-footer">
                <button type="submit" className="btn btn-primary font-weight-bold mr-2">Potvrdi</button>
              </div>
        </form>
      </div>
  </div>
  )
}

export {AddConstructionsPage}
