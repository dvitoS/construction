/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios'
import {useEffect} from 'react'
import {Dropdown} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

interface FormData {
  workProtection: boolean; 
  firstAid: boolean; 
  geda: boolean;
}

const EditWorkersPage: React.FC = () => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [data, setData] = useState ({firstName:'', lastName:'', address:'', oib:'', email:'', mob:'', passport:'', fatherName:"", motherName:"", workingPermit:'', firstAidDate:'', workProtection:false, firstAid:false, geda:false, hr:'', overtimeHr:'',weekendHr:'',dailyWage:'', wage:'',nightHr:'', note:'', tools:''});
  const { id } = useParams();
  const [ischecked, setIsChecked] = useState(false)
  const [checkboxes, setCheckbox] = useState<FormData>({workProtection:false, firstAid:false, geda:false});

//Getting all workers from API
    useEffect(()=>{
      axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers/'+ id)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
      console.log(data);
    },[])
    const handleInput = (event:any) => {
    //setData({...data, [event.target.name]: event.target.value})		
    }
    
   

    const handleChange = (e:any) =>{
      const name = e.target.name;
      const value = e.target.value;
      setData({...data, [name]:value})
  }

  function converttoint(a:string){
    //var x = parseInt(a,10);
    var x = +a;
    if(isNaN(x)){
      console.log("X je",x);
    return null;
    }
    return x;
  }

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      firstName: {value: string};
      lastName: {value: string};
      address: {value: string};
      oib: {value: string};
      passport: {value: string};
      mob: {value: string};
      email: {value: string};
      fatherName:{value: string};
      motherName:{value: string};
      wage:{value: string}; 
      overtimeHr:{value: string}; 
      weekendHr:{value: string}; 
      dailyWage:{value: string};  
      nightHr:{value: string}; 
      workingPermit:{value: string}
      firstAidDate:{value: string};
      note:{value: string};
      tools:{value: string};
    }
    if(e){
      const data = {
      firstName: target.firstName.value,
      lastName: target.lastName.value, 
      address: target.address.value,
      oib: converttoint(target.oib.value),
      passport: converttoint(target.passport.value),
      mob: target.mob.value,
      email: target.email.value,
      fatherName: target.fatherName.value,
      motherName: target.motherName.value,
      wage: converttoint(target.wage.value),
      overtimeHr: converttoint(target.overtimeHr.value),
      weekendHr: converttoint(target.weekendHr.value),
      dailyWage: converttoint(target.dailyWage.value),
      nightHr: converttoint(target.nightHr.value),
      workingPermit: target.workingPermit.value,
      tools:target.tools.value,
      note: target.note.value
      }
      const request = {...data, ...checkboxes};
      /* console.log(request); */
      axios.put('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers/'+ id, request)
      .then(res => {
        window.location.reload()
        window.alert("Dodan novi radnik")
      }).catch(err => console.log(err));
      
    }
}

  const handleChangeCheckbox = (e:any) =>{
    const name = e.target.name;
    const value = e.target.value;
    if(e.target.checked == true){
      setData({...data, [name]:true})
    }else{
      setData({...data, [name]:false})
    }
    setIsChecked(current => !current);
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
                value={data.address}/>
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
                  name="passport"
                  className="form-control"
                  placeholder="Br putovnice"
                  onChange={handleChange}
                  value={data.passport}/>
              </div>

              <div className="col-lg-4">
                <label htmlFor="mob">Broj mobitela:</label>
                  <input type="tel" name="mob" className="form-control" placeholder="Br mobitela"/>
              </div>
               <div className="col-lg-4">
                <label>E-mail:</label>
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
                  name="fatherName"
                  className="form-control"
                  placeholder="Ime oca radnika"
                  onChange={handleChange}
                  value={data.fatherName}/>
              </div>

              <div className="col-lg-4">
                <label>Ime majke:</label>
                  <input type="text"
                  name="motherName"
                  className="form-control"
                  placeholder="Ime majke radnika"
                  onChange={handleChange}
                  value={data.motherName}/>
              </div>
            </div>
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
                  onChange={handleChange}
                  /* value={data.workingPermit} */ />
              </div>

              <div className="col-lg-4">
                <label>Liječnički pregled vrijedi do:</label>
                  <input type="date"
                  name="firstAidDate"
                  className="form-control"
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
                onChange={handleChangeCheckbox}
                className="form-check-input" 
                type="checkbox"  
                checked={data?.workProtection || false}
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
                onChange={handleChangeCheckbox}
                className="form-check-input" 
                type="checkbox" 
                checked={data?.firstAid || false}
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
                onChange={handleChangeCheckbox}
                className="form-check-input" 
                type="checkbox" 
                checked={data?.geda || false}
                
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

export {EditWorkersPage}




