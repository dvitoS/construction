import clsx from 'clsx'
import React, {useState, useRef, useEffect} from 'react'
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
import Flatpickr from 'flatpickr';
import jquery from 'jquery';




interface JQueryStatic {
  slideUp: any;
  this:any;
  jQuery:any;
}

interface FormData {
  workProtection: boolean; 
  firstAid: boolean; 
  geda: boolean;
}


const AddWorkersPage: React.FC = () => {
  const nameInputId = useId();
  const [checkboxes, setCheckbox] = useState<FormData>({workProtection:false, firstAid:false, geda:false});
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState(true);
  const repeaterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [formFields, setFormFields] = useState([
    {
      id: 1,
    },
  ]);



  const handleCreateClick = () => {
    // Create a new form field and add it to the state
    const newField = {
      id: formFields.length + 1,
    };

    setFormFields([...formFields, newField]);
  };

  const handleDeleteClick = () => {
    // Delete the last form field
    setFormFields(formFields.slice(0, -1));
  };

  

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
          nightHr:{value: string}; 
          workingPermit:{value: string};
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
          nightHr: converttoint(target.nightHr.value),
          workingPermit: target.workingPermit.value,
          firstAidDate: target.firstAidDate.value,
          tools:target.tools.value,
          note: target.note.value
          }
          const request = {...data, ...checkboxes};
          /* console.log(request); */
          axios.post('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers', request)
          .then(res => {
            window.location.reload()
            window.alert("Dodan novi radnik")
          }).catch(err => console.log(err));
        
        }
    }
  

    const handleChangeCheckbox = (e:any) =>{
      const name = e.target.name;
      if(e.target.checked == true){
        setCheckbox({...checkboxes, [name]:true})
      }else{
        setCheckbox({...checkboxes, [name]:false})
      }
    }

  return (
<div className='card'>
    <div className='card-header'>
      <div className="card-title m-0"><h3 className="fw-bolder m-0">Unos Radnika</h3></div>
    </div>
    <div className='card-body'>
      <div>
      <div id="kt_docs_repeater_advanced">
      <div data-repeater-list="kt_docs_repeater_advanced">
      <div>
        {formFields.map((field) => (
          <div key={field.id} data-repeater-list="kt_docs_repeater_advanced">
            <div data-repeater-item>
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
                      />
                    </div>

                    <div className="col-lg-4">
                      <label>Prezime:</label>
                      <input type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Prezime radnika"
                      required
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
                      required/>
                    </div>

                      <div className="col-lg-4">
                        <label>OIB:</label>
                        <input 
                        type="number"
                        name="oib"
                        min="0"
                        max="99999999999"
                        className="form-control"
                        placeholder="OIB"/>
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
                        />
                    </div>

                    <div className="col-lg-4">
                      <label>Broj mobitela:</label>
                        <input
                          type="tel"
                          name="mob"
                          className="form-control"
                          placeholder="Br mobitela"
                          />
                    </div>
                    <div className="col-lg-4">
                      <label>E-mail:</label>
                        <input type="email"
                          name="email"
                          className="form-control"
                          placeholder="email@email.com"/>
                    </div> 
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label>Ime oca:</label>
                        <input type="text"
                        name="fatherName"
                        className="form-control"
                        placeholder="Ime oca radnika"/>
                    </div>

                    <div className="col-lg-4">
                      <label>Ime majke:</label>
                        <input type="text"
                        name="motherName"
                        className="form-control"
                        placeholder="Ime majke radnika"/>
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
                        placeholder="Plaća"/>
                        <div className="input-group-append"><span className="input-group-text">€</span></div>
                    </div>
                    </div>

                    <div className="col-lg-2">
                      <label>Prekovremeno:</label>
                      <div className="input-group">
                        <input type="number"
                        name="overtimeHr"
                        className="form-control"
                        placeholder="€"/>
                      <div className="input-group-append"><span className="input-group-text">€</span></div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <label>Vikend satnica:</label>
                      <div className="input-group">
                        <input type="number"
                        name="weekendHr"
                        className="form-control"
                        placeholder="€"/>
                        <div className="input-group-append"><span className="input-group-text">€</span></div>
                    </div>
                    </div>

                    <div className="col-lg-2">
                    <label>Noćni rad:</label>
                    <div className="input-group">
                      <input type="number"
                      name="nightHr"
                      className="form-control"
                      placeholder="€"/>
                      <div className="input-group-append"><span className="input-group-text">€</span></div>
                  </div>
                  </div>
                </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label>Radna dozvola vrijedi do:</label>
                        <input type="date"
                        name="workingPermit"
                        data-kt-repeater="datepicker"
                        className="form-control"
                        placeholder="Radna dozvola"
                        required
                         />
                    </div>

                    <div className="col-lg-4">
                      <label>Liječnički pregled vrijedi do:</label>
                        <input type="date"
                        name="firstAidDate"
                        data-kt-repeater="datepicker"
                        className="form-control"
                        placeholder="Liječnički pregled"
                        required
                        />
                    </div>
                  </div>
                </div>
                <br />
                <div className="mb-10">
                  <div className="form-check form-check-custom form-check-solid">
                      <input 
                      name="workProtection" 
                      className="form-check-input" 
                      type="checkbox"  
                      onChange={handleChangeCheckbox}
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
                      className="form-check-input" 
                      type="checkbox" 
                      onChange={handleChangeCheckbox}
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
                      value="true"
                      className="form-check-input" 
                      type="checkbox" 
                      onChange={handleChangeCheckbox}
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
                    placeholder="Alat"/>

                    <label>Napomena:</label>
                    <textarea
                    rows={5}
                    cols={50}
                    name="note"
                    id='note'
                    className="form-control"
                    placeholder="Unesite napomenu"/> 
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>
        
      <div className="form-group">
        <a data-repeater-create onClick={handleCreateClick} className="btn btn-flex btn-light-primary">
          <i className="ki-duotone ki-plus fs-3"></i>
          Add
        </a>
        {formFields.length > 1 && (
          <a onClick={handleDeleteClick} className="btn btn-flex btn-light-danger ml-2">
            <i className="ki-duotone ki-trash fs-3"></i>
            Delete Last
          </a>
        )}
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
      </div>
      </div>
      
      </div>
  </div>
</div>
  )
}
export {AddWorkersPage}
