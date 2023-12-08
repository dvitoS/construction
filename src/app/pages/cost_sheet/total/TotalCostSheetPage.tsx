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




const TotalCostSheetPage: React.FC = () => {
  const nameInputId = useId();
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState(true);
  const [data, setData] = useState({name:'', bill:'', note:'' })
  const [total, setTotal] = useState()

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
    const url = 'https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/costsheet';
    axios.get(url)
      .then((response) => {
        setData(response.data); // Set the response directly, assuming it's an array
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



  return (
    <table className="table align-middle table-row-dashed fs-6 gy-4" id="kt_docs_datatable_subtable">
   {/*  <!--begin::Table head--> */}
    <thead>
      {/* <!--begin::Table row--> */}
      <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
        <th className="min-w-100px">Gradilište</th>
        <th className="text-end min-w-100px">Početak</th>
        <th className="text-end min-w-100px">Kraj</th>
        <th className="text-end min-w-100px">Naplaćeno</th>
        <th className="text-end min-w-50px">Status</th>
        <th className="text-end"></th>
      </tr>
      {/* <!--end::Table row--> */}
    </thead>
    {/* <!--end::Table head--> */}


 {/*    <!--begin::Table body--> */}
    <tbody className="fw-bold text-gray-600">
      {/* <!--begin::SubTable template--> */}
      <tr data-kt-docs-datatable-subtable="subtable_template" className="d-none">
        <td colSpan={2}>
          <div className="d-flex align-items-center gap-3">
            <a href="#" className="symbol symbol-50px bg-secondary bg-opacity-25 rounded">
              <img src="/assets/media/stock/ecommerce/" alt="" data-kt-docs-datatable-subtable="template_image" />
            </a>
            <div className="d-flex flex-column text-muted">
              <a href="#" className="text-gray-900 text-hover-primary fw-bold" data-kt-docs-datatable-subtable="template_name">Product name</a>
              <div className="fs-7" data-kt-docs-datatable-subtable="template_description">Product description</div>
            </div>
          </div>
        </td>
        <td className="text-end">
          <div className="text-gray-900 fs-7">Cost</div>
          <div className="text-muted fs-7 fw-bold" data-kt-docs-datatable-subtable="template_cost">1</div>
        </td>
        <td className="text-end">
          <div className="text-gray-900 fs-7">Qty</div>
          <div className="text-muted fs-7 fw-bold" data-kt-docs-datatable-subtable="template_qty">1</div>
        </td>
        <td className="text-end">
          <div className="text-gray-900 fs-7">Total</div>
          <div className="text-muted fs-7 fw-bold" data-kt-docs-datatable-subtable="template_total">name</div>
        </td>
        <td className="text-end">
          <div className="text-gray-900 fs-7 me-3">On hand</div>
          <div className="text-muted fs-7 fw-bold" data-kt-docs-datatable-subtable="template_stock">32</div>
        </td>
        <td></td>
      </tr>
      {/* <!--end::SubTable template--> */}

      <tr>
        {/* <!--begin::Order ID--> */}
        <td>
          <a href="#" className="text-gray-900 text-hover-primary">Ulica grada Vukovara</a>
        </td>
        {/* <!--end::Order ID-->

        <!--begin::Crated date--> */}
        <td className="text-end">
          10 Nov 2021, 10:30 am
        </td>
      {/*   <!--end::Created date-->

        <!--begin::Customer--> */}
        <td className="text-end">
          <a href="" className="text-gray-900 text-hover-primary">10 Nov 2022, 12:30 am</a>
        </td>
       {/*  <!--end::Customer-->

        <!--begin::Total--> */}
        <td className="text-end">
          $630.000
        </td>
        {/* <!--end::Total-->

        <!--begin::Profit--> */}
        <td className="text-end">
          <span className="text-gray-900 fw-bold">Završeno</span>
        </td>
        {/* <!--end::Profit-->

        <!--begin::Status--> */}
        <td className="text-end">
          <span className="badge py-3 px-4 fs-7 badge-light-primary">Confirmed</span>
        </td>
        {/* <!--end::Status-->

        <!--begin::Actions--> */}
        <td className="text-end">
          <button type="button" className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-25px w-25px"
            data-kt-docs-datatable-subtable="expand_row">
            <span className="svg-icon fs-3 m-0 toggle-off">...</span>
            <span className="svg-icon fs-3 m-0 toggle-on">...</span>
          </button>
        </td>
        {/* <!--end::Actions--> */}
      </tr>

        ...
    </tbody>
    {/* <!--end::Table body--> */}
  </table>
  )
}

export {TotalCostSheetPage}