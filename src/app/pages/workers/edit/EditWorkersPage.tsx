/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios'
import {useEffect} from 'react'
import {Dropdown} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'


const EditWorkersPage: React.FC = () => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [d, setD] = useState ({adress:"", oib:"", email:"", mob:"", passport:"", fatherName:"", motherName:"", workingPermit:"", firstAidDate:"", workProtection:'', firstAid:'', GEDA:'', hr:'', overtimehr:'',weekendhr:'',dailywage:'',note:''});
  //const [data, setData] = useState ({firstName:'', lastName:''});
  const [data, setData] = useState({firstName:'', lastName:''})
  const [workers, setWorkers] = useState<any[]>([])
  const { id } = useParams();
//Getting all workers from API
    useEffect(()=>{
      axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers/'+ id)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    },[])
    const handleInput = (event:any) => {
    //setData({...data, [event.target.name]: event.target.value})		
    }
    
    function handleSubmit(event:any){
    event.preventDefault()
    axios.put('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers.json', data)
    .then(res => console.log(res.data))
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
    
    <div>
      <form className="form" method="post" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-group row">
              <div className="col-lg-4">
                <label>Ime:</label>
                <input 
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Unesite ime"
                onChange={handleChange}
                value={data.firstName}/>
              </div>

              <div className="col-lg-4">
                <label>Prezime:</label>
                <input type="text"
                name="lastName"
                className="form-control"
                placeholder="Unesite prezime"
                onChange={handleChange}
                value={data.lastName}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-4">
                <label>Adresa:</label>
                <input type="text"
                name="adress"
                className="form-control"
                placeholder="Unesite adresu"
                onChange={handleChange}
                value={d.adress}/>
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
                  placeholder="Broj putovnice"
                  onChange={handleChange}
                  value={d.passport}/>
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
                    value={d.email}/>
              </div> 
            </div>

            <div className="form-group row">
              <div className="col-lg-4">
                <label>Ime oca:</label>
                  <input type="text"
                  name="fatherName"
                  className="form-control"
                  placeholder="Unesite ime Oca"
                  onChange={handleChange}
                  value={d.fatherName}/>
              </div>

              <div className="col-lg-4">
                <label>Ime majke:</label>
                  <input type="text"
                  name="motherName"
                  className="form-control"
                  placeholder="Unesite ime majke"
                  onChange={handleChange}
                  value={d.motherName}/>
              </div>
            </div>
              <div>Satnica</div>
            <div className="form-group row">
              <div className="col-lg-3">
                <label>Normalna satnica:</label>
                  <input type="number"
                  name="hr"
                  className="form-control"
                  placeholder="Unesite satnicu"
                  onChange={handleChange}
                  value={d.hr}/>
              </div>

              <div className="col-lg-3">
                <label>Prekovremena satnica:</label>
                  <input type="number"
                  name="overtimehr"
                  className="form-control"
                  placeholder="Unesite prekovremenu satnicu"
                  onChange={handleChange}
                  value={d.overtimehr}/>
              </div>

              <div className="col-lg-3">
                <label>Vikend satnica:</label>
                  <input type="number"
                  name="weekendhr"
                  className="form-control"
                  placeholder="Unesite vikend satnicu"
                  onChange={handleChange}
                  value={d.weekendhr}/>
              </div>

              <div className="col-lg-3">
                <label>Dnevnica:</label>
                  <input type="number"
                  name="dailywage"
                  className="form-control"
                  placeholder="Unesite dnevnicu"
                  onChange={handleChange}
                  value={d.dailywage}/>
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
                id="flexCheckDefault"/>
          
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
    </div>
  )
}

export {EditWorkersPage}




