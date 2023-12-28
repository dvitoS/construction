import React, {useState} from 'react'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ListWorkersPage: React.FC = () => {
  const [tab, setTab] = useState('Sidebar');
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage());
  const [configLoading, setConfigLoading] = useState<boolean>(false);
  const [resetLoading, setResetLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [sortedColumn, setSortedColumn] = useState<'firstName' | 'lastName' | 'workingPermit'>('workingPermit');

  interface Worker {
    id: number;
    firstName: string;
    lastName: string;
    workingPermit: string;
    workProtection: string;
    firstAid: string;
    geda: string;
  }
  
  const handleSort = (column: 'firstName' | 'lastName' | 'workingPermit')  => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setSortedColumn(column);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortedColumn === 'firstName') {
      return sortOrder === 'asc' ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName);
    } else if (sortedColumn === 'lastName') {
      return sortOrder === 'asc' ? a.lastName.localeCompare(b.lastName) : b.lastName.localeCompare(a.lastName);
    } else if (sortedColumn === 'workingPermit') {
      // Sorting logic for date (workingPermit)
      return sortOrder === 'asc' ? a.workingPermit.localeCompare(b.workingPermit) : b.workingPermit.localeCompare(a.workingPermit);
    }
    // If no column is selected, return unsorted data
    return 0;
  });


  const updateConfig = () => {
    setConfigLoading(true);
    try {
      LayoutSetup.setConfig(config);
      window.location.reload();
    } catch (error) {
      setConfig(getLayoutFromLocalStorage());
      setConfigLoading(false);
    }
  };

  const reset = () => {
    setResetLoading(true);
    setTimeout(() => {
      setConfig(getLayoutFromLocalStorage());
      setResetLoading(false);
    }, 1000);
  };

  useEffect(() => {
    axios.get('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers')
      .then(res => {
        const fetchedData: Worker[] = res.data; // Type the fetched data as an array of Workers
        // Sort data immediately after fetching
        const sortedFetchedData = fetchedData.sort((a: Worker, b: Worker) => {
          return b.workingPermit.localeCompare(a.workingPermit); // Sorting by workingPermit in descending order
        });
        setData(sortedFetchedData);
      })
      .catch(err => console.log(err));
  }, []);

 // Helper function to calculate the difference in days
const daysUntilWorkingPermit = (dateString: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of the day for accurate comparison
  const workingPermitDate = new Date(dateString);
  return Math.ceil((workingPermitDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

  const handleDelete = (id: any) => {
    const confirm = window.confirm("Jeste li sigurni da želite izbrisati stavku?");
    if (confirm) {
      axios.delete('https://phpstack-675879-3984600.cloudwaysapps.com/api/v1/workers/' + id)
        .then(res => {
          window.location.reload();
        }).catch(err => console.log(err));
    }
  };

  return (
    <div className='d-flex flex-column align-items-center bg-light vh-100'>
      <h1>Lista radnika</h1>
      <div className='w-100 rounded bg-white border shadow p-4'>
        <table className='table table-striped'>
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th><strong>Br.</strong></th>
              <th className={`table-sort-${sortOrder}`} onClick={() => handleSort('firstName')}><strong>Ime</strong></th>
              <th className={`table-sort-${sortOrder}`} onClick={() => handleSort('lastName')}><strong>Prezime</strong></th>
              <th className={`table-sort-${sortOrder}`} onClick={() => handleSort('workingPermit')}><strong>Radna dozvola</strong></th>
              <th><strong>Prva pomoć</strong></th>
              <th><strong>Zaštita na radu</strong></th>
              <th><strong>GEDA</strong></th>
              <th colSpan={3}><strong>AKCIJA</strong></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((d, i) => {
              const daysLeft = daysUntilWorkingPermit(d.workingPermit);

              // Determine the background color for the workingPermit cell
              let textStyle = {};
              if (daysLeft <= 15 && daysLeft >= 5) {
                textStyle = { color: 'rgba(255, 140, 0)', fontWeight: 'bold' }; // Solid orange and bold for 15 days before
              } else if (daysLeft <= 5 && daysLeft >= 0) {
                textStyle = { color: 'rgba(255, 0, 0, 1)', fontWeight: 'bold' }; // Solid red and bold for 5 days before
              } else if (daysLeft < 0) {
                textStyle = { color: 'rgba(255, 0, 0, 1)', fontWeight: 'bold' }; // Solid red and bold for past dates
              }

              return (
                <tr key={i}>
                  <td>{i + 1 + "."}</td>
                  <td>{d.firstName}</td>
                  <td>{d.lastName}</td>
                  <td style={{ textAlign: 'center', ...textStyle }}>{d.workingPermit.slice(0, 10)}</td>
                  <td style={{ textAlign: 'center' }}></td>
                  <td style={{ textAlign: 'center' }}> {d.workProtection ? <p>Da</p> : <p>Ne</p>}</td>
                  <td style={{ textAlign: 'center' }}>{d.firstAid ? <p>Da</p> : <p>Ne</p>}</td>
                  <td style={{ textAlign: 'center' }}>{d.geda ? <p>Da</p> : <p>Ne</p>}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Link to={'/worker/' + d.id} className='btn btn-sm btn-primary me-2'>Otvori</Link>
                    <Link to={'/edit/' + d.id} className="btn btn-sm btn-info me-2">Izmijeni</Link>
                    <button onClick={e => handleDelete(d.id)} className='btn btn-sm btn-danger'>Izbriši</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { ListWorkersPage };


