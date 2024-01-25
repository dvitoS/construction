/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useState, useEffect, useRef, RefObject } from 'react';
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';


const ListConstructionsPage: React.FC = ({}) => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])
  const [activeId, setActiveId] = useState<string | null>(null);
  const tooltipRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>({});
  const [filter, setFilter] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);


  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };


  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const filterByDate = (construction: any) => {
    if (startDate && endDate) {
      const startedDate = construction.proof ? construction.started.slice(0, 10) : null;
      const finishedDate = construction.proof ? construction.finished.slice(0, 10) : null;
      
      return (
        (startedDate && startedDate >= startDate && startedDate <= endDate) ||
        (finishedDate && finishedDate >= startDate && finishedDate <= endDate)
      );
    }
    return true;
  };


  const filteredData = data.filter(
    (d) =>
      d.name.toLowerCase().includes(filter.toLowerCase()) ||
      d.address.toLowerCase().includes(filter.toLowerCase())
  ).filter(filterByDate);



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
    axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/constructions/')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log('Error fetching data:', err));
  }, []);
  
  const ensureTooltipRef = (itemId: string) => {
    if (!tooltipRefs.current[itemId]) {
      tooltipRefs.current[itemId] = React.createRef();
    }
    return tooltipRefs.current[itemId];
  };

  const handleTooltipClick = (itemId: string) => {
    setActiveId(itemId);
  };

  const handleTooltipClose = () => {
    setActiveId(null);
  };

  const isTooltipOpen = (itemId: string) => {
    return activeId === itemId;
  };

  const handleDelete = (id:any) => {
    const confirm = window.confirm("Jeste li sigurni da želite izbrisati stavku?");
    if(confirm){
      axios.delete('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/constructions/' + id)
      .then(res => {
        window.location.reload();
      }).catch(err => console.log(err));
    }
  } 

  return (
    <div className='d-flex flex-column  align-items-center bg-light vh-100'>
      <h1>Lista gradilišta</h1>
      <div className='w-100 rounded bg-white border shadow p-4'>
        <div className='d-flex flex-row'>

          <input
            type="text"
            className='form-control me-3'
            placeholder="Pretraži po imenu ili adresi"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <input
            type="date"
            className='form-control me-3'
            value={startDate}
            onChange={handleStartDateChange}
          />
          <input
            type="date"
            className='form-control me-3'
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className="text-center">Br.</th>
              <th className="text-center">Ime</th>
              <th className="text-center">Adresa</th>
              <th className="text-center">Početak</th>
              <th className="text-center">Kraj</th>
              <th className="text-center">Dokaznica</th>
              <th className="text-center">Račun</th>
              <th className="text-center">Napomena</th>
            </tr>
          </thead>
          <tbody>
          {filteredData.map((d, i) => (
                  <tr key={i} className="align-middle">
                    <td>{i+1+"."}</td>
                    <td>{d.name}</td>
                    <td>{d.address}</td>
                    <td className="text-center">{d.proof ? d.started.slice(0, 10) : 'Nema'}</td>
                    <td className="text-center">{d.proof ? d.finished.slice(0, 10) : 'Nema'}</td>
                    <td className="text-center">{d.proof ? d.proof.slice(0, 10) : 'Nema'}</td>
                    <td className="text-center">{d.proof ? d.bill.slice(0, 10) : 'Nema'}</td>
                    <td className="text-center">
                     <i className="fa fa-exclamation-circle fa-2x" ref={ensureTooltipRef(`note-${d.id}`)}
                      onMouseEnter={() => handleTooltipClick(d.id)}
                      onMouseLeave={handleTooltipClose}></i>
                    {isTooltipOpen(d.id) &&
                      <Overlay
                        show={true}
                        target={ensureTooltipRef(`note-${d.id}`).current}
                        placement="top"
                      >
                        {(props) => (
                          <Tooltip id={`tooltip-${d.id}`} {...props}>
                            {d.description}
                          </Tooltip>
                        )}
                      </Overlay>
                    }</td>
                    <td>
                      <Link to={'/construction/' + d.id} className='btn btn-sm btn-primary me-2'>Otvori</Link>
                      <Link to={'/editc/'+ d.id} className="btn btn-sm btn-info me-2">Izmijeni</Link>
                      <button onClick={e => handleDelete(d.id)}  className='btn btn-sm btn-danger'>Izbriši</button>
                    </td>
                  </tr>
                ))
              }
          </tbody>
        </table>
        <div className='col-lg-1'>
        <select
            className='form-select me-3'
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className='d-flex justify-content-center'>
          <nav>
            <ul className='pagination'>
              {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className='page-link' onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        

      </div>
    </div>
)
}

export {ListConstructionsPage}



