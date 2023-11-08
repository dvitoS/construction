/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios'
import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const SingleConstructionPage: React.FC = ({}) => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])
  const navigate = useNavigate();


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


  useEffect(()=> {
    axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/constructions.json')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])
  
  const handleDelete = (id:any) => {
    const confirm = window.confirm("Jeste li sigurni da želite izbrisati stavku?");
    if(confirm){
      axios.delete('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/constructions/' + id)
      .then(res => {
      }).catch(err => console.log(err));
    }
  } 

  return (
    <div className='d-flex flex-column  align-items-center bg-light vh-100'>
      <h1>Lista gradilišta</h1>
      <div className='w-75 rounded bg-white border shadow p-4'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Br.</th>
              <th>Ime</th>
            </tr>
          </thead>
          <tbody>
              {
                data.map((d, i) => (
                  <tr key={i}>
                    <td>{i+1+"."}</td>
                    <td>{d.name}</td>
                    <td>
                      <button className='btn btn-sm btn-primary me-2'>Otvori</button>
                      <Link to={'/editc/'+ d.id} className="btn btn-sm btn-info me-2">Izmijeni</Link>
                      <button onClick={e => handleDelete(d.id)}  className='btn btn-sm btn-danger'>Izbriši</button>
                    </td>
                  </tr>
                ))
              }
          </tbody>
        </table>
        

      </div>
    </div>
)

}

export {SingleConstructionPage}



