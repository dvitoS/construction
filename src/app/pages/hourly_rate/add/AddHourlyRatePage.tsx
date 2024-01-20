import clsx from 'clsx'
import React, {useState, useEffect} from 'react'
import { useId } from 'react';
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'




const AddHourlyRatePage: React.FC = () => {
  const nameInputId = useId();
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState(true);

  const [data, setData] = useState({ idWorker:'', idConstruction:'', workHours:'', overtimeHr:'', weekendHr:'', dailyWage:'',  nightHr:''})

  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  const [constructions, setConstructions] = useState([]);
  const [selectedConstruction, setSelectedConstruction] = useState([]);

  const [selectedTime, setSelectedTime] = useState<string>('00:00');
  const [selectedTimeOvertime, setSelectedTimeOvertime] = useState<string>('00:00');
  const [selectedTimeWeekend, setSelectedTimeWeekend] = useState<string>('00:00');
  const [selectedTimeNight, setSelectedTimeNight] = useState<string>('00:00');
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



  useEffect(() => {
    const url = 'https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers';
    axios.get(url)
      .then((response) => {
        setWorkers(response.data); // Set the response directly, assuming it's an array
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const url = 'https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/constructions';
    axios.get(url)
      .then((response) => {
        setConstructions(response.data); // Set the response directly, assuming it's an array
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (e:any) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]:value})
  }

  function handleSubmit(e:any) {
    e.preventDefault()
    
   
    if(e){
      axios.post('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/hourlyrate', data)
      .then(response => {
        window.location.reload()
        window.alert("Dodana nova satnica")
        }).catch(error => {console.log(error.response)})
   }
  }


  const generateTimeIntervals = () => {
    const intervals: string[] = [];
    for (let hours = 0; hours <= 8; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        if (hours === 8 && minutes === 30) {
          break; 
        }
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        intervals.push(`${formattedHours}:${formattedMinutes}`);
      }
    }
    return intervals;
  };

  const timeIntervals = generateTimeIntervals();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedTime(selectedValue);
    setData({ ...data, workHours: selectedValue });
    console.log(selectedValue);
    
  };

  const handleSelectOvertime = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedTimeOvertime(selectedValue);
    setData({ ...data, overtimeHr: selectedValue });
  };

  const handleSelectWeekend = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedTimeWeekend(selectedValue);
    setData({ ...data, weekendHr: selectedValue });
  };

  const handleSelectNight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedTimeNight(selectedValue);
    setData({ ...data, nightHr: selectedValue });
  };


  

  return (
  <div className='card'>
    <div className='card-header'>
      <div className="card-title m-0"><h3 className="fw-bolder m-0">Unos Gradilišta </h3></div>
    </div>
    <div className='card-body'>
    <div>
      {formFields.map((field) => (
        <div key={field.id} data-repeater-list="kt_docs_repeater_advanced">
          <div data-repeater-item>
      <form className="form" method="post" onSubmit={handleSubmit}>
      <div className="form-group row">
        <div className="col-lg-3">
          <label>Radnik</label>
            <select name="idWorker" className="form-select form-select-solid" aria-label="Odabir gridlista" onChange={handleChange}>
            <option>Odaberite radnika</option>
            {workers.map((worker:any) => (
              <option key={worker.id} value={worker.name}>{worker.firstName}</option>
              ))}
            </select>
            <div/>
        </div> 
        <div className="col-lg-3">
          <label>Gradilište</label>
            <select name="idConstruction" className="form-select form-select-solid" aria-label="Odabir gridlista" onChange={handleChange}>
            <option>Odaberite gradilište</option>
            {constructions.map((construction:any) => (
              <option key={construction.id} value={construction.name}>{construction.name}</option>
              ))}
            </select>
          <div/>
        </div> 
      </div>
      <br />
    <div className="form-group row">
      <div className="col-lg-2">
          <label>Radni sati:</label>
          <select className="form-select form-select-solid" aria-label="Odabir sati" value={data.workHours} onChange={handleSelect}>
            {timeIntervals.map((interval, index) => (
              <option key={index} value={interval}>
                {interval}
              </option>
            ))}
          </select>
      </div>
      


      <div className="col-lg-2">
          <label>Prekovremeno:</label>
          <select className="form-select form-select-solid" aria-label="Odabir sati" value={data.overtimeHr} onChange={handleSelectOvertime}>
            {timeIntervals.map((interval, index) => (
              <option key={index} value={interval}>
                {interval}
              </option>
            ))}
          </select>
      </div>
      <div className="col-lg-2">
      <label>Vikend:</label>
          <select className="form-select form-select-solid" aria-label="Odabir sati" value={data.weekendHr} onChange={handleSelectWeekend}>
            {timeIntervals.map((interval, index) => (
              <option key={index} value={interval}>
                {interval}
              </option>
            ))}
          </select>
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
          <select className="form-select form-select-solid" aria-label="Odabir sati" value={data.nightHr} onChange={handleSelectNight}>
            {timeIntervals.map((interval, index) => (
              <option key={index} value={interval}>
                {interval}
              </option>
            ))}
          </select>
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
  </div>
    <br/>
      <div className="card-footer">
        <button type="submit" className="btn btn-primary font-weight-bold mr-2">Potvrdi</button>
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
  </div>
</div>

  )
}

export {AddHourlyRatePage}