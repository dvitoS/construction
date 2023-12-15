/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import { Link } from 'react-router-dom'
import {useLocation} from 'react-router'
import { Params } from 'react-router-dom'

const WorkerHeader: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState ({firstName:'', lastName:'', address:'', oib:'', email:'', mob:'', passport:'', fatherName:"", motherName:"", workingPermit:'', firstAidDate:'', workProtection:'', firstAid:'', geda:'', hr:'', overtimeHr:'',weekendHr:'',dailyWage:'', wage:'',nightHr:'', note:'', tools:''});
  const location = useLocation()

  useEffect(()=> {
    axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers' + data)
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  useEffect(()=>{
    axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers/'+ id)
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[])
  const handleInput = (event:any) => {
  //setData({...data, [event.target.name]: event.target.value})		
  }

  return (
    <div className='card mb-5 mb-xl-10'>
    <div className='card-body pt-9 pb-0'>
      <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
        <div className='me-7 mb-4'>
          <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
            <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metronic' />
            <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
          </div>
        </div>

        <div className='flex-grow-1'>
          <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
            <div className='d-flex flex-column'>
              <div className='d-flex align-items-center mb-2'>
                <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                  {data.firstName} {data.lastName}
                </a>
                <a href='#'>
                  <KTIcon iconName='verify' className='fs-1 text-primary' />
                </a>
                <a
                  href='#'
                  className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_upgrade_plan'
                >
                  Status
                </a>
              </div>

              <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                <a
                  href='#'
                  className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                >
                  <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                  Titula / Zanimanje
                </a>
                <a
                  href='#'
                  className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                >
                  <KTIcon iconName='geolocation' className='fs-4 me-1' />
                  Zagreb, Hrvatska
                </a>
                <a
                  href='#'
                  className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                >
                  <KTIcon iconName='sms' className='fs-4 me-1' />
                  email@email.com
                </a>
              </div>
            </div>

            <div className='d-flex my-4'>
              <div className='me-0'>
                <button
                  className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-flip='top-end'
                >
                  <i className='bi bi-three-dots fs-3'></i>
                </button>
                <Dropdown1 />
              </div>
            </div>
          </div>

          <div className='d-flex flex-wrap flex-stack'>
            <div className='d-flex flex-column flex-grow-1 pe-8'>
              <div className='d-flex flex-wrap'>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                  <div className='d-flex align-items-center'>
                    <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                    <div className='fs-2 fw-bolder'>9500$</div>
                  </div>

                  <div className='fw-bold fs-6 text-gray-400'>Isplaćeno</div>
                </div>

                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                  <div className='d-flex align-items-center'>
                    <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                    <div className='fs-2 fw-bolder'>75</div>
                  </div>

                  <div className='fw-bold fs-6 text-gray-400'>Projekti</div>
                </div>

                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                  <div className='d-flex align-items-center'>
                    <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                    <div className='fs-2 fw-bolder'>568</div>
                  </div>

                  <div className='fw-bold fs-6 text-gray-400'>Radni sati</div>
                </div>
              </div>
            </div>

                  
          </div>
        </div>
      </div>

      <div className='d-flex overflow-auto h-55px'>
        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
          <li className='nav-item'>
            <Link
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname === '' && '')
              }
              to={'/worker/' + id}
            >
              Overview
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname === '')
              }
              to={'/worker/settings/' + id}
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
 
  )
}

export {WorkerHeader}



