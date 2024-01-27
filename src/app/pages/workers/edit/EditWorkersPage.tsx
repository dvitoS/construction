/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useState, useEffect, useRef } from 'react';
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

interface workerData {
  firstName: string;
  lastName: string;
  address: string;
  oib: string;
  email: string;
  mob: string;
  passport: string;
  fatherName: string;
  motherName: string;
  workingPermit: string;
  firstAidDate: string;
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

const EditWorkersPage: React.FC = () => {
  const [data, setData] = useState<workerData | null>(null);
  const { id } = useParams();
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  //const [data, setData] = useState ({firstName:'', lastName:'', address:'', oib:'', email:'', mob:'', passport:'', fatherName:"", motherName:"", workingPermit:'', firstAidDate:'', workProtection:false, firstAid:false, geda:false, hr:'', overtimeHr:'',weekendHr:'', wage:'',nightHr:'', note:'', tools:''});
  const [prevData, setPrevData] = useState({
    // Initialize prevData with the initial state
    workProtection: false,
    firstAid: false,
    geda: false,
  });
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const oibRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const mobRef = useRef<HTMLInputElement>(null);
  const passportRef = useRef<HTMLInputElement>(null);
  const fatherNameRef = useRef<HTMLInputElement>(null);
  const motherNameRef = useRef<HTMLInputElement>(null);
  const workingPermitRef = useRef<HTMLInputElement>(null);
  const firstAidDateRef = useRef<HTMLInputElement>(null);
  const workProtectionRef = useRef<HTMLInputElement>(null);
  const firstAidRef = useRef<HTMLInputElement>(null);
  const gedaRef = useRef<HTMLInputElement>(null);
  const hrRef = useRef<HTMLInputElement>(null);
  const overtimeHrRef = useRef<HTMLInputElement>(null);
  const weekendHrRef = useRef<HTMLInputElement>(null);
  const wageRef = useRef<HTMLInputElement>(null);
  const nightHrRef = useRef<HTMLInputElement>(null);
  const toolsRef = useRef<HTMLTextAreaElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);


  const [checked, setChecked] = useState(true);
//Getting all workers from API

      const fetchData = async () => {
        try {
            const response = await axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers/' + id);
            setData(response.data);
            setPrevData(prevData => ({
              ...prevData,
              workProtection: response.data.workProtection,
              firstAid: response.data.firstAid,
              geda: response.data.geda,
            }));
        } catch (error) {
            console.error('Error fetching data: ', error);
            // Handle error
        }
      };
    // Fetch data when the component mounts or when `id` changes
    useEffect(() => {
      if (id) {
        fetchData();
      }
    }, [id]);

    
    const convertToInt = (value: string | undefined) => {
      if (value === undefined) {
        return null;
      }
      const intValue = parseInt(value, 10);
      return isNaN(intValue) ? null : intValue;
    };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const updatedData = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      address: addressRef.current?.value,
      oib: convertToInt(oibRef.current?.value),
      email: emailRef.current?.value,
      mob: mobRef.current?.value,
      passport: convertToInt(passportRef.current?.value),
      fatherName: fatherNameRef.current?.value,
      motherName: motherNameRef.current?.value,
      workingPermit: workingPermitRef.current?.value,
      firstAidDate: firstAidDateRef.current?.value,
      workProtection: workProtectionRef.current?.value,
      firstAid: firstAidRef.current?.value,
      geda: gedaRef.current?.value,
      hr: hrRef.current?.value,
      overtimeHr: convertToInt(overtimeHrRef.current?.value),
      weekendHr: convertToInt(weekendHrRef.current?.value),
      wage: convertToInt(wageRef.current?.value),
      nightHr: convertToInt(nightHrRef.current?.value),
      note: noteRef.current?.value,
      tools: toolsRef.current?.value,
    };
    const request = {...updatedData, ...prevData};
    axios.put('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers/'+ id, request)
    .then(res => {
      const alertMessage = `Uređen profil radnika: ${updatedData.firstName} ${updatedData.lastName}`;
      window.alert(alertMessage);
      window.location.reload(); 
      }).catch(err => console.log(err)); 
}
     const handleChangeCheckbox = (e:any) =>{
      const name = e.target.name;
      if(e.target.checked){

        setPrevData({...prevData, [name]:true})
      }else{
        setPrevData({...prevData, [name]:false})
      }
    } 

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form className="form" method="post" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-group row">
              <div className="col-lg-4">
            <label>Ime</label>
            <input 
              type="text"
              name="firstName"
              className="form-control"
              placeholder="Ime radnika"
              defaultValue={data.firstName}
              ref={firstNameRef}
            />
          </div>

          {/* Last Name */}
          <div className="col-lg-4">
            <label>Prezime</label>
            <input 
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Prezime radnika"
              defaultValue={data.lastName}
              ref={lastNameRef}
            />
          </div></div>

          {/* Address */}
          <div className="col-lg-4">
            <label>Adresa</label>
            <input 
              type="text"
              name="address"
              className="form-control"
              placeholder="Prebivalište radnika"
              defaultValue={data.address}
              ref={addressRef}
            />
          </div>

          {/* OIB */}
          <div className="col-lg-4">
            <label>OIB</label>
            <input 
              type="text"
              name="oib"
              className="form-control"
              placeholder="OIB"
              defaultValue={data.oib}
              ref={oibRef}
            />
          </div>

          {/* Email */}
          <div className="col-lg-4">
            <label>E-mail</label>
            <input 
              type="email"
              name="email"
              className="form-control"
              placeholder="email@email.com"
              defaultValue={data.email}
              ref={emailRef}
            />
          </div>

          {/* Mobile Phone */}
          <div className="col-lg-4">
            <label>Broj mobitela</label>
            <input 
              type="tel"
              name="mob"
              className="form-control"
              placeholder="Br mobitela"
              defaultValue={data.mob}
              ref={mobRef}
            />
          </div>

          {/* Passport */}
          <div className="col-lg-4">
            <label>Putovnica</label>
            <input 
              type="text"
              name="passport"
              className="form-control"
              placeholder="Br putovnice"
              defaultValue={data.passport}
              ref={passportRef}
            />
          </div>

          {/* Father Name */}
          <div className="col-lg-4">
            <label>Ime oca</label>
            <input 
              type="text"
              name="fatherName"
              className="form-control"
              placeholder="Ime oca radnika"
              defaultValue={data.fatherName}
              ref={fatherNameRef}
            />
          </div>

          {/* Mother Name */}
          <div className="col-lg-4">
            <label>Ime majke</label>
            <input 
              type="text"
              name="motherName"
              className="form-control"
              placeholder="Ime majke radnika"
              defaultValue={data.motherName}
              ref={motherNameRef}
            />
          </div>

          {/* Wage */}
          <div className="col-lg-4">
            <label>Plaća</label>
            <input 
              type="text"
              name="wage"
              className="form-control"
              placeholder="Plaća"
              defaultValue={data.wage}
              ref={wageRef}
            />
          </div>

          {/* Overtime Hour Rate */}
          <div className="col-lg-4">
            <label>Prekovremeno</label>
            <input 
              type="text"
              name="overtimeHr"
              className="form-control"
              placeholder="€"
              defaultValue={data.overtimeHr}
              ref={overtimeHrRef}
            />
          </div>

          {/* Weekend Hour Rate */}
          <div className="col-lg-4">
            <label>Vikend satnica</label>
            <input 
              type="text"
              name="weekendHr"
              className="form-control"
              placeholder="€"
              defaultValue={data.weekendHr}
              ref={weekendHrRef}
            />
          </div>

          {/* Night Hour Rate */}
          <div className="col-lg-4">
            <label>Noćni rad</label>
            <input 
              type="text"
              name="nightHr"
              className="form-control"
              placeholder="€"
              defaultValue={data.nightHr}
              ref={nightHrRef}
            />
          </div>

          {/* Working Permit Date */}
          <div className="form-group row">
          <div className="col-lg-4">
            <label>Radna dozvola vrijedi do</label>
            <input 
              type="date"
              name="workingPermit"
              className="form-control"
              defaultValue={data?.workingPermit ? data.workingPermit.slice(0, 10) : ''}
              ref={workingPermitRef}
            />
          </div>

          {/* First Aid Date */}
          <div className="col-lg-4">
            <label>Liječnički pregled vrijedi do</label>
            <input 
              type="date"
              name="firstAidDate"
              className="form-control"
              defaultValue={data?.firstAidDate ? data.firstAidDate.slice(0, 10) : ''}
              ref={firstAidDateRef}
            />
              </div>
            </div>
          </div>

          {/* Work Protection Checkbox */}

          <div className="mb-10">
            <div className="form-check form-check-custom form-check-solid">
                <input 
                name="workProtection" 
                onChange={handleChangeCheckbox}
                className="form-check-input" 
                type="checkbox"  
                checked={prevData.workProtection}
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
                checked={prevData.firstAid}
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
                checked={prevData.geda} 
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
            
             defaultValue={data.tools}
             ref = {toolsRef}/>

            <label>Napomena:</label>
              <textarea
              rows={5}
              cols={50}
              name="note"
              className="form-control"
              placeholder="Unesite napomenu"
               defaultValue={data.note}
               ref = {noteRef}
               />
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
  );
  };

export {EditWorkersPage}




