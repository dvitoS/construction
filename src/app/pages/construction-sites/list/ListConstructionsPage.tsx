/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useState, useEffect, useRef, RefObject } from 'react';
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
  type ButtonRefs = {
    [key: string]: RefObject<HTMLButtonElement>;
  };

const ListConstructionsPage: React.FC = ({}) => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const buttonRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>({});

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
  
  const ensureButtonRef = (itemId: string) => {
    if (!buttonRefs.current[itemId]) {
      buttonRefs.current[itemId] = React.createRef();
    }
    return buttonRefs.current[itemId];
  };

  const handleButtonClick = (itemId: string) => {
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
      <div className='w-75 rounded bg-white border shadow p-4'>
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
              {
                data.map((d, i) => (
                  
                  <tr key={i} className="align-middle">
                    <td>{i+1+"."}</td>
                    <td>{d.name}</td>
                    <td>{d.address}</td>
                    <td className="text-center">{d.proof ? d.started.slice(0, 10) : 'Nema'}</td>
                    <td className="text-center">{d.proof ? d.finished.slice(0, 10) : 'Nema'}</td>
                    <td className="text-center">{d.proof ? d.proof.slice(0, 10) : 'Nema'}</td>
                    <td className="text-center">{d.proof ? d.bill.slice(0, 10) : 'Nema'}</td>
                    <td className="text-center">
                     <i className="fa fa-exclamation-circle fa-2x" ref={ensureButtonRef(`button-${d.id}`)}
                      onMouseEnter={() => handleButtonClick(d.id)}
                      onMouseLeave={handleTooltipClose}></i>
                    {isTooltipOpen(d.id) &&
                      <Overlay
                        show={true}
                        target={ensureButtonRef(`button-${d.id}`).current}
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
        

      </div>
    </div>
)
}

export {ListConstructionsPage}



