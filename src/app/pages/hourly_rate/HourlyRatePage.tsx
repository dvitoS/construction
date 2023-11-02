import clsx from 'clsx'
import React, {useState, useEffect} from 'react'
import { useId } from 'react';
import {KTIcon, toAbsoluteUrl} from '../../../../src/_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../src/_metronic/layout/core'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'




const HourlyRatePage: React.FC = () => {
  const nameInputId = useId();
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState(true);
  const [data, setData] = useState('')

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

  useEffect(()=> {
    axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers.json')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])



  return (
    <div>
        <h1>Satnica</h1>
    </div>
  )
}

export {HourlyRatePage}