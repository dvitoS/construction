/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import {useEffect} from 'react'
import ReactDom from 'react'
import axios from 'axios'

const EditConstructionsPage: React.FC = () => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [data, setData] = useState({dokaznica:'', racun:'', adresa_gradilista:''});

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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/update/${data}`, data);
      console.log('Data updated successfully', response.data);
      // Add logic for handling success, such as showing a success message or redirecting
    } catch (error) {
      console.error('Error updating data', error);
      // Add error handling logic here
    }
  };





  return (
    <form className="form" method="post" onSubmit={handleSubmit}>
    <div className="col-lg-4">
      <label>Adresa:</label>
      <input type="text"
      name="adresa_gradilista"
      className="form-control"
      placeholder="Unesite adresu gradilišta"
      onChange={handleChange}
      value={data.adresa_gradilista}/>
    </div>
    <div className="col-lg-4">
      <label>Dodaj dokaznicu:</label>
        <input type="date"
        name="dokaznica"
        className="form-control"
        placeholder="Dokaznica"
        onChange={handleChange}
        value={data.dokaznica}/>
    </div>
    <div className="col-lg-4">
      <label>Dodaj račun:</label>
        <input type="date"
        name="racun"
        className="form-control"
        placeholder="Racun"
        onChange={handleChange}
        value={data.racun}/>
    </div>
    <br/>
    <div className="card-footer">
          <button type="submit" className="btn btn-primary font-weight-bold mr-2">Potvrdi</button>
        </div>
  </form>
  )
}

export {EditConstructionsPage}
