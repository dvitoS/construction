/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {ChartsWidget1, ListsWidget5, TablesWidget1, TablesWidget5,} from '../../../../_metronic/partials/widgets'
import {Dropdown1} from '../../../../_metronic/partials'
import {useLocation} from 'react-router'
import { useParams } from 'react-router-dom'


type Props = {
  className: string
}


const SingleWorkerPage: React.FC<Props> = ({className}) => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [data, setData] = useState ({firstName:'', lastName:'', address:'', oib:'', email:'', mob:'', passport:'', fatherName:"", motherName:"", workingPermit:'', firstAidDate:'', workProtection:'', firstAid:'', geda:'', hr:'', overtimeHr:'',weekendHr:'',dailyWage:'', wage:'',nightHr:'', note:'', tools:''});
  const { id } = useParams();

  const location = useLocation()

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

  function handleSubmit(event:any){
    event.preventDefault()
    axios.put('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers/', data)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
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

  const handleChange = (e:any) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]:value})
}

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
      
      
    <div>
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
                      {data.firstName}
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
                    (location.pathname === '/crafted/account/overview' && 'active')
                  }
                  to='/workers/singleworker/workeroverview'
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
                  to='/workers/singleworker/workersettings'
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Informacije o zaposleniku</h3>
          </div>

          <Link to='/crafted/account/settings' className='btn btn-primary align-self-center'>
            Uredi profil
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Ime i prezime</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{data.firstName} {data.lastName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Adresa stanovanja</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data.address}ilica 129a</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              OIB
            </label>
                  
            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>1263748697</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Putovnica
            </label>
                  
            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>12345678932</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Broj mobitela
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>044 3276 454 935</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8'>
              <a href='#' className='fw-bold fs-6 text-dark text-hover-primary'>
                email@email.com
              </a>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Ime oca
            </label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>Ivan</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Ime majke
            </label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>Matea</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Mjesečna plaća</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>€990</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Prekovremeno</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>€50</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Vikend satnica</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>€80</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Dnevnica</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>€200</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Dnevnica</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>€200</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Dnevnica</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>€100</span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Valjanost radne dozvole</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>16/09/2024</span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Valjanost lječničkog pregleda</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>06/09/2024</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Zaštita na radu</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Ima</span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Prva pomoć</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Ima</span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>GEDA</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Nema</span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Napomena</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Izniman radnik, uredan i učinkovit</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Posuđeni alat</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Brusilica i kliješta</span>
            </div>
          </div>

          
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>
  


      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Members Statistics</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>Over 500 members</span>
          </h3>
          <div
            className='card-toolbar'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <a
              href='#'
              className='btn btn-sm btn-light-primary'
              // data-bs-toggle='modal'
              // data-bs-target='#kt_modal_invite_friends'
            >
              <KTIcon iconName='plus' className='fs-3' />
              New Member
            </a>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='w-25px'>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        value='1'
                        data-kt-check='true'
                        data-kt-check-target='.widget-9-check'
                      />
                    </div>
                  </th>
                  <th className='min-w-150px'>Authors</th>
                  <th className='min-w-140px'>Company</th>
                  <th className='min-w-120px'>Progress</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                <tr>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          Ana Simmons
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          HTML, JS, ReactJS
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      Intertico
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      Web, UI/UX Design
                    </span>
                  </td>
                  <td className='text-end'>
                    <div className='d-flex flex-column w-100 me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-semibold'>50%</span>
                      </div>
                      <div className='progress h-6px w-100'>
                        <div
                          className='progress-bar bg-primary'
                          role='progressbar'
                          style={{width: '50%'}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='switch' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTIcon iconName='trash' className='fs-3' />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img src={toAbsoluteUrl('/media/avatars/300-2.jpg')} alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          Jessie Clarcson
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          C#, ASP.NET, MS SQL
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      Agoda
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      Houses &amp; Hotels
                    </span>
                  </td>
                  <td className='text-end'>
                    <div className='d-flex flex-column w-100 me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-semibold'>70%</span>
                      </div>
                      <div className='progress h-6px w-100'>
                        <div
                          className='progress-bar bg-danger'
                          role='progressbar'
                          style={{width: '70%'}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='switch' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTIcon iconName='trash' className='fs-3' />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img src={toAbsoluteUrl('/media/avatars/300-5.jpg')} alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          Lebron Wayde
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          PHP, Laravel, VueJS
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      RoadGee
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      Transportation
                    </span>
                  </td>
                  <td className='text-end'>
                    <div className='d-flex flex-column w-100 me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-semibold'>60%</span>
                      </div>
                      <div className='progress h-6px w-100'>
                        <div
                          className='progress-bar bg-success'
                          role='progressbar'
                          style={{width: '60%'}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='switch' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTIcon iconName='trash' className='fs-3' />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img src={toAbsoluteUrl('/media/avatars/300-20.jpg')} alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          Natali Goodwin
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          Python, PostgreSQL, ReactJS
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      The Hill
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>Insurance</span>
                  </td>
                  <td className='text-end'>
                    <div className='d-flex flex-column w-100 me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-semibold'>50%</span>
                      </div>
                      <div className='progress h-6px w-100'>
                        <div
                          className='progress-bar bg-warning'
                          role='progressbar'
                          style={{width: '50%'}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='switch' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTIcon iconName='trash' className='fs-3' />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img src={toAbsoluteUrl('/media/avatars/300-23.jpg')} alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          Kevin Leonard
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          HTML, JS, ReactJS
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      RoadGee
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      Art Director
                    </span>
                  </td>
                  <td className='text-end'>
                    <div className='d-flex flex-column w-100 me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-semibold'>90%</span>
                      </div>
                      <div className='progress h-6px w-100'>
                        <div
                          className='progress-bar bg-info'
                          role='progressbar'
                          style={{width: '90%'}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='switch' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTIcon iconName='trash' className='fs-3' />
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
      </div>
    )
  
}

export {SingleWorkerPage}


