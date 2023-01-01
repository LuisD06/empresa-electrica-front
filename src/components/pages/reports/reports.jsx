import { useEffect, useState } from 'react';
import { Button } from '../../atoms/button/button';
import { Map } from '../../organisms/map/map';
import { RegisterReport } from '../../templates/register-report/register-report';
import './reports.scss';
import { useFilterReports } from './use-filter-list/use-filter-reports';
import { useGetReportsPdf } from './use-get-reports-pdf/use-get-reports-pdf';
import { useShowMap } from './use-show-map/use-show-map';
export const Reports = () => {

  const { reportsList, filteredList, filterByProperty, isFiltered, filters } = useFilterReports();
  const { handleShowMap, position } = useShowMap();
  const { handleSubmitPdf } = useGetReportsPdf();
  const mapTableRows = (list) => {
    return list.map((report) => (
      <tr key={report.id} className="reports__table-row">
        <td>{report.fecha}</td>
        <td>{report.cedula}</td>
        <td>{report.correo}</td>
        <td>{report.telefono}</td>
        <td>{report.idMedidor}</td>
        <td>{report.numeroMedidor}</td>
        <td>{report.tipoMedidor}</td>
        <td>{report.suministro}</td>
        <td>{report.consumo}</td>
        <td>{report.total.toFixed(2)}</td>
        <td>
          <Button onClick={() => handleShowMap(report.latlng)}>
            Mapa
          </Button>
        </td>
      </tr>
    ));
  }
  return (
    <div className="reports">
      <h2 className="reports__title">Reportes</h2>
      <div className="reports__table-wrapper">
        <table className="reports__table">
          <thead className='reports__table-header'>
            <tr className="reports__table-row">
              <th>Fecha</th>
              <th>Cédula</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Id Medidor</th>
              <th># Medidor</th>
              <th>Tipo Medidor</th>
              <th>Suministro</th>
              <th>Consumo</th>
              <th>Total USD</th>
              <th>Dirección</th>
            </tr>
            <tr className="reports__table-actions">
              <th><input onChange={(evt) => filterByProperty('fecha', evt.target.value)} placeholder="Fecha"></input></th>
              <th><input onChange={(evt) => filterByProperty('cedula', evt.target.value)} placeholder="Cédula"></input></th>
              <th><input onChange={(evt) => filterByProperty('correo', evt.target.value)} placeholder="Correo"></input></th>
              <th><input onChange={(evt) => filterByProperty('telefono', evt.target.value)} placeholder="Teléfono"></input></th>
              <th><input onChange={(evt) => filterByProperty('idMedidor', evt.target.value)} placeholder="Id Medidor"></input></th>
              <th><input onChange={(evt) => filterByProperty('numeroMedidor', evt.target.value)} placeholder="# Medidor"></input></th>
              <th><input onChange={(evt) => filterByProperty('tipoMedidor', evt.target.value)} placeholder="Tipo"></input></th>
              <th><input onChange={(evt) => filterByProperty('suministro', evt.target.value)} placeholder="# Suministro"></input></th>
              <th className='reports__filter-wrapper'>
                <input type="number" placeholder="Consumo mínimo"></input>
                <input type="number" placeholder="Consumo máximo"></input>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mapTableRows(filteredList)}
          </tbody>
        </table>
      </div>
      <div className='reports__map-wrapper'>
        <Map search={false} position={position} />
      </div>
      <div className='reports__pdf-wrapper'>
        <Button onClick={() => handleSubmitPdf(filteredList)}>
          PDF
        </Button>
      </div>
      <div className='reports__form-wrapper'>
        <RegisterReport />
      </div>


    </div>
  );
}
