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
import jquery from 'jquery';
import { useForm } from 'react-hook-form';
import { useFormik } from 'formik';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'



interface JQueryStatic {
  slideUp: any;
  this:any;
  jQuery:any;
}

interface inputField {
  endpointId: string;
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  oib: string;
  email: string;
  mob: string;
  passport: string;
  fathersName: string;
  mothersName: string;
  workPermitDate: string;
  physicalExamDate: string;
  workProtection: boolean;
  firstAid: boolean;
  geda: boolean;
  hr: string;
  overtimeHr: string;
  weekendHr: string;
  wage: string;
  nightHr: string;
  note: string;
  tools: string;
}

interface UserSubmitForm {
  firstName: string;
  lastName: string;
  address: string;
  oib: string;
  email: string;
  mob: string;
  passport: string;
  fathersName: string;
  mothersName: string;
  workPermitDate: string;
  physicalExamDate: string;
  hr: string;
  overtimeHr: string;
  weekendHr: string;
  wage: string;
  nightHr: string;
  note: string;
  tools: string;
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
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const handleEmailChange = (e:any) => {
    const enteredEmail = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(enteredEmail);
    setValidEmail(emailRegex.test(enteredEmail));
  };
  const [inputFields, setInputFields] = useState<inputField[]>([
    {
      endpointId: '',
      id: new Date().getTime().toString(),
      firstName: '',
      lastName: '',
      address: '',
      oib: '',
      email: '',
      mob: '',
      passport: '',
      fathersName: '',
      mothersName: '',
      workPermitDate: '',
      physicalExamDate: '',
      workProtection: false,
      firstAid: false,
      geda: false,
      hr: '',
      overtimeHr: '',
      weekendHr: '',
      wage: '',
      nightHr: '',
      note: '',
      tools: '',
    },
  ]);


  const addFields = () => {
    let newfield = {
      endpointId: '',
      id: new Date().getTime().toString(),
      firstName: '',
      lastName: '',
      address: '',
      oib: '',
      email: '',
      mob: '',
      passport: '',
      fathersName: '',
      mothersName: '',
      workPermitDate: '',
      physicalExamDate: '',
      workProtection: false,
      firstAid: false,
      geda: false,
      hr: '',
      overtimeHr: '',
      weekendHr: '',
      wage: '',
      nightHr: '',
      note: '',
      tools: '',
    };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (id: string) => {
    // Only remove the field if it's not the first one
    if (id !== inputFields[0].id) {
      let updatedFields = inputFields.filter(field => field.id !== id);
      setInputFields(updatedFields);
    }
  }

   const validationSchema = Yup.object().shape({
    endpointId: Yup.string(),
    id: Yup.string(),
    firstName: Yup.string()
    .required('First name is required')
    .min(2,'First name must be at least 2 characters')
    .max(14,'First name must not exceed 24 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 30 characters'),
    address:Yup.string()
      .required('Address is required')
      .min(2,'Address must be at least 2 characters')
      .max(20,'Address must not exceed 20 characters'),
    oib:Yup.string()
      .required('OIB is required')
      .min(11,'OIB must be at least 11 characters')
      .max(11,'OIB must not exceed 11 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    mob: Yup.string()
      .required('Mobile number is required')
      .min(6, 'Mobile number must be at least 6 characters')
      .max(20, 'Mobile number must not exceed 16 characters'),
    passport:Yup.string()
      .required('Passport is required')
      .min(10,'Passport must be at least 2 characters')
      .max(20,'Passport must not exceed 20 characters'),
    fathersName: Yup.string()
      .required('Fathers name is required')
      .min(2,'Fathers name must be at least 2 characters')
      .max(20,'Fathers name must not exceed 20 characters'),
    mothersName: Yup.string()
      .required('Mothers name is required')
      .min(2,'Mothers name must be at least 2 characters')
      .max(20,'Mothers name must not exceed 20 characters'),
    workPermitDate: Yup.string()
      .required('Work permit date is requred'),
    physicalExamDate: Yup.string()
      .required('Physical exam date is requred'),
    hr: Yup.string()
      .required('Hourly rate is required')
      .min(1,'Hourly rate must be at least 1 character')
      .max(4,'Hourly rate must not exceed 4 characters'),
    overtimeHr: Yup.string()
      .required('Overtime hourly rate is required')
      .min(1,'Overtime hourly rate must be at least 1 characters')
      .max(4,'Overtime hourly rate must not exceed 4 characters'),
    weekendHr: Yup.string()
      .required('Weekend hourly rate is required')
      .min(1,'Weekend hourly rate must be at least 1 characters')
      .max(4,'Weekend hourly rate must not exceed 4 characters'),
    wage: Yup.string()
      .required('Wage rate is required')
      .min(3,'Wage rate must be at least 3 characters')
      .max(6,'Wage rate must not exceed 6 characters'),
    nightHr: Yup.string()
      .required('Night rate is required')
      .min(1,'Night rate must be at least 1 characters')
      .max(3,'Weekend hourly rate must not exceed 3 characters'),
    workProtection: Yup.bool(),
    firstAid: Yup.bool(),
    geda: Yup.bool(),
    note: Yup.string()
      .notRequired()
      .max(300,'Note must not exceed 300 characters'),
    tools: Yup.string()
      .notRequired()
      .max(100,'Tools must not exceed 100 characters'),
  
    
  }); 
/* 
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName:'',
      email: '',
      oib:'',
      address: '',
      mob: '',
      passport:'',
      fathersName:'',
      mothersName:'',
      workPermitDate:'',
      physicalExamDate:'',
      hr:'',
      overtimeHr:'',
      weekendHr:'',
      wage:'',
      nightHr:'',
      workProtection:'',
      firstAid:'',
      geda:'',
      note:'',
    },
    validationSchema: validationSchema,
    onSubmit: (values:any) => {
      // Handle form submission
    },
  }); */


  const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    let data = [...inputFields];
    data[index]={...data[index],[event.target.name]: event.target.value,};
    setInputFields(data);
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
  const { 
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });


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
          fathersName:{value: string};
          mothersName:{value: string};
          wage:{value: string}; 
          overtimeHr:{value: string}; 
          weekendHr:{value: string};   
          nightHr:{value: string}; 
          workPermitDate:{value: string};
          physicalExam:{value: string};
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
          fathersName: target.fathersName.value,
          mothersName: target.mothersName.value,
          wage: converttoint(target.wage.value),
          overtimeHr: converttoint(target.overtimeHr.value),
          weekendHr: converttoint(target.weekendHr.value),
          nightHr: converttoint(target.nightHr.value),
          workPermitDate: target.workPermitDate.value,
          physicalExam: target.physicalExam.value,
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

    const handleSubmitAll = () => {
      // You can add your logic here for handling the submission of all input fields
      console.log("Submitting all fields:", inputFields);
  
      // Example: Sending data to the server
      inputFields.forEach((data) => {
        const request = { ...data, ...checkboxes };
  
        axios.post('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers', request)
          .then(res => {
            // Handle success if needed
            console.log("Form submitted successfully:", res.data);
          })
          .catch(err => {
            // Handle error if needed
            console.error("Error submitting form:", err);
          });
      });
  
      // Clear input fields or perform any other necessary actions
      setInputFields([
        {
          endpointId: '',
          id: new Date().getTime().toString(),
          firstName: '',
          lastName: '',
          address: '',
          oib: '',
          email: '',
          mob: '',
          passport: '',
          fathersName: '',
          mothersName: '',
          workPermitDate: '',
          physicalExamDate: '',
          workProtection: false,
          firstAid: false,
          geda: false,
          hr: '',
          overtimeHr: '',
          weekendHr: '',
          wage: '',
          nightHr: '',
          note: '',
          tools: '',
        },
      ]);
    }

  return (
<div className='card'>
    <div className='card-header'>
      <div className="card-title m-0"><h3 className="fw-bolder m-0">Unos Radnika</h3></div>
    </div>
    <div className='card-body'>
        <form className="form" method="post" onSubmit={handleSubmit}>
        {inputFields.map((input, index) => {
            return (
            <div key={input.id}>
              <div className="card-body">
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label>Ime:</label>
                      <input 
                      type="text"
                      name="firstName"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      placeholder="Ime radnika"
                      value={input.firstName}
                      onChange={event => handleFormChange(index, event)}
                      required
                      />
                    </div>

                    <div className="col-lg-4">
                      <label>Prezime:</label>
                      <input type="text"
                      name="lastName"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      placeholder="Prezime radnika"
                      value={input.lastName}
                      onChange={event => handleFormChange(index, event)}
                      required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label>Adresa:</label>
                      <input type="text"
                      name="address"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      placeholder="Prebivalište radnika"
                      value={input.address}
                      onChange={event => handleFormChange(index, event)}
                      required/>
                    </div>

                      <div className="col-lg-4">
                        <label>OIB:</label>
                        <input 
                        type="text"
                        name="oib"
                        min="0"
                        max="99999999999"
                        className={`form-control ${errors.oib ? 'is-invalid' : ''}`}
                        placeholder="OIB"
                        value={input.oib}
                        onChange={event => handleFormChange(index, event)}
                        />
                      </div>
            
                    <div className="col-lg-4">
                      <label>Putovnica:</label>
                        <input        
                        type="text"
                        name="passport"
                        min="0"
                        max="999999999999"
                        step="1"
                        className={`form-control ${errors.passport ? 'is-invalid' : ''}`}
                        placeholder="Br putovnice"
                        value={input.passport}
                        onChange={event => handleFormChange(index, event)}
                        />
                    </div>

                    <div className="col-lg-4">
                      <label>Broj mobitela:</label>
                        <input
                          type="tel"
                          name="mob"
                          className={`form-control ${errors.mob ? 'is-invalid' : ''}`}
                          placeholder="Br mobitela"
                          value={input.mob}
                          onChange={event => handleFormChange(index, event)}
                          />
                    </div>
                    <div className="col-lg-4">
                      <label>E-mail:</label>
                        <input type="email"
                          name="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="email@email.com"
                          value={input.email}
                          onChange={event => handleFormChange(index, event)}
                          />
                    </div> 
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label>Ime oca:</label>
                        <input type="text"
                        name="fathersName"
                        className={`form-control ${errors.fathersName ? 'is-invalid' : ''}`}
                        placeholder="Ime oca radnika"
                        value={input.fathersName}
                        onChange={event => handleFormChange(index, event)}
                        />
                    </div>

                    <div className="col-lg-4">
                      <label>Ime majke:</label>
                        <input type="text"
                        name="mothersName"
                        className={`form-control ${errors.mothersName ? 'is-invalid' : ''}`}
                        placeholder="Ime majke radnika"
                        value={input.mothersName}
                        onChange={event => handleFormChange(index, event)}
                        />
                    </div>
                  </div><br/>
                    <div>PLAĆA I SATNICA</div>
                    <div className="form-group row">
                    <div className="col-lg-2">
                      <label>Plaća:</label>
                      <div className="input-group">
                        <input type="number"
                        name="wage"
                        className={`form-control ${errors.wage ? 'is-invalid' : ''}`}
                        placeholder="Plaća"
                        value={input.wage}
                        onChange={event => handleFormChange(index, event)}/>
                        <div className="input-group-append"><span className="input-group-text">€</span></div>
                    </div>
                    </div>

                    <div className="col-lg-2">
                      <label>Prekovremeno:</label>
                      <div className="input-group">
                        <input type="number"
                        name="overtimeHr"
                        className={`form-control ${errors.overtimeHr ? 'is-invalid' : ''}`}
                        placeholder="€"
                        value={input.overtimeHr}
                        onChange={event => handleFormChange(index, event)}/>
                      <div className="input-group-append"><span className="input-group-text">€</span></div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <label>Vikend satnica:</label>
                      <div className="input-group">
                        <input type="number"
                        name="weekendHr"
                        className={`form-control ${errors.weekendHr ? 'is-invalid' : ''}`}
                        placeholder="€"
                        value={input.weekendHr}
                        onChange={event => handleFormChange(index, event)}
                        />
                        <div className="input-group-append"><span className="input-group-text">€</span></div>
                    </div>
                    </div>

                    <div className="col-lg-2">
                    <label>Noćni rad:</label>
                    <div className="input-group">
                      <input type="number"
                      name="nightHr"
                      className={`form-control ${errors.nightHr ? 'is-invalid' : ''}`}
                      placeholder="€"
                      value={input.nightHr}
                      onChange={event => handleFormChange(index, event)}
                      />
                      <div className="input-group-append"><span className="input-group-text">€</span></div>
                  </div>
                  </div>
                </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label>Radna dozvola vrijedi do:</label>
                        <input type="date"
                        name="workPermitDate"
                        data-kt-repeater="datepicker"
                        className={`form-control ${errors.workPermitDate ? 'is-invalid' : ''}`}
                        placeholder="Radna dozvola"
                        value={input.workPermitDate}
                        onChange={event => handleFormChange(index, event)}
                        required
                         />
                    </div>

                    <div className="col-lg-4">
                      <label>Liječnički pregled vrijedi do:</label>
                        <input type="date"
                        name="physicalExam"
                        data-kt-repeater="datepicker"
                        className={`form-control ${errors.physicalExamDate ? 'is-invalid' : ''}`}
                        placeholder="Liječnički pregled"
                        value={input.physicalExamDate}
                        onChange={event => handleFormChange(index, event)}
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
                    className={`form-control ${errors.tools ? 'is-invalid' : ''}`}
                    placeholder="Alat"
                    />

                    <label>Napomena:</label>
                    <textarea
                    rows={5}
                    cols={50}
                    name="note"
                    id='note'
                    className="form-control"
                    placeholder="Unesite napomenu"/>     
                {index !== 0 && (
                  <button className="btn btn-danger font-weight-bold mr-2" type="button" onClick={() => removeFields(input.id)}>Remove</button>
                )}                
                </div>
              </div>
                
            )
          })}
        </form>
    </div>
      <div className="card-footer">
        <div className="row">
          <div className="col-lg-2">
          <button className="btn btn-primary font-weight-bold mr-2" onClick={addFields}>Add More..</button>

          </div>

          <div className="col-lg-8">
            <button type="submit" className="btn btn-success font-weight-bold mr-2" onClick={handleSubmitAll}>Potvrdi</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export {AddWorkersPage}
