/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios'
import {useEffect} from 'react'
import {Dropdown} from 'react-bootstrap'


const EditWorkersPage: React.FC = () => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [d, setD] = useState ({adress:"", oib:"", email:"", mob:"", passport:"", fatherName:"", motherName:"", workingPermit:"", firstAidDate:"", workProtection:'', firstAid:'', GEDA:'', hr:'', overtimehr:'',weekendhr:'',dailywage:'',note:''});
  //const [data, setData] = useState ({firstName:'', lastName:''});
  const [data, setData] = useState<any[]>([])




    useEffect(()=>{
      axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers.json')
      .then(res => console.log(res.data))
    },[])
    const handleInput = (event:any) => {
    setData({...data, [event.target.name]: event.target.value})		
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
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Odaberite radnika
        </Dropdown.Toggle>

        <Dropdown.Menu>
        {
            data.map((da, i) => (
          <Dropdown.Item key={i} href={da.id}>{da.firstName} {da.lastName}</Dropdown.Item>
          ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export {EditWorkersPage}


