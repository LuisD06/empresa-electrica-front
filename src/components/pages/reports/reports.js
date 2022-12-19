import { useEffect, useState } from 'react';
import './reports.css';
import { useFilterReports } from './use-filter-list/use-filter-reports';
export const Reports = () => {

  const { reportsList,filteredList, filterByProperty, isFiltered, filters } = useFilterReports(); 

  const mapTableRows = (list) => {
    return list.map((report) => (
      <tr key={report.idMedidor} className="reports__table-row">
        <td>{report.cedula}</td>
        <td>{report.correo}</td>
        <td>{report.direccion}</td>
        <td>{report.telefono}</td>
        <td>{report.idMedidor}</td>
        <td>{report.consumo}</td>
      </tr>
    ));
  }
  return (
    <div className="reports">
      <h2 className="reports__title">Reportes</h2>
      <div className="reports__form-wrapper">
        <input type="month"></input>
        <input type="number" placeholder="Consumo mínimo"></input>
        <input type="number" placeholder="Consumo máximo"></input>
      </div>
      <div className="reports__table-wrapper">
        <table className="reports__table">
          <thead className='reports__table-header'>
            <tr className="reports__table-row">
              <th>Cédula</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Id Medidor</th>
              <th>Consumo</th>
            </tr>
            <tr className="reports__table-actions">
              <th><input onChange={(evt) => filterByProperty('cedula', evt.target.value)} placeholder="Cédula"></input></th>
              <th><input onChange={(evt) => filterByProperty('correo', evt.target.value)} placeholder="Correo"></input></th>
              <th><input onChange={(evt) => filterByProperty('direccion', evt.target.value)} placeholder="Direccion"></input></th>
              <th><input onChange={(evt) => filterByProperty('telefono', evt.target.value)} placeholder="Teléfono"></input></th>
              <th><input onChange={(evt) => filterByProperty('idMedidor', evt.target.value)} placeholder="Id Medidor"></input></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { mapTableRows(filteredList) }
          </tbody>
        </table>
      </div>

    </div>
  );
}
