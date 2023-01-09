import { useEffect, useState } from 'react'
import { REPORTS_LIST } from '../../../../constants/reports';
import { getReports } from '../../../../services/report-service/report-service';


export const useFilterReports = () => {
  const [reportsList, setReportsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState([]);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Status');

  useEffect(
    () => {
      getList();
    },
    []
  )
  const getList = () => {
    getReports().then((data) => {
      setReportsList(data);
      setFilteredList(data);
    }).catch((error) => {
      setStatusMessage('Ha ocurrido un error al obtener los datos');
      setSuccess(true);
    })
  }
  

  const filterByProperty = (property, value) => {
    setFilters((currentFilters) => {
      const newFilter = {
        name: property,
        value: value
      }
      let updatedFilters = [];
      if (currentFilters.length === 0) {
        updatedFilters = [newFilter];
      } else {
        const filterExist = currentFilters.find((filter) => filter.name === property);
        if (filterExist) {
          updatedFilters = currentFilters.map((report) => {
            if (report.name === newFilter.name) {
              return ({ ...report, value: value })
            } else {
              return report
            }
          });
        } else {
          updatedFilters = [...currentFilters, newFilter];
        }
      }
      setFilteredList(() => {
        let newList = [...reportsList];
        updatedFilters.forEach((filter) => {
          if (filter.name === "consumoMin") {
            newList = newList.filter((report) => {
              const minLimit = value === "" ? 0 : parseFloat(filter.value);
              return report['consumo'] >= minLimit;
            });
          }else if (filter.name === "consumoMax") {
            newList = newList.filter((report) => {
              const maxLimit = value === "" ? 999999 : parseFloat(filter.value);
              return report['consumo'] <= maxLimit;
            });
          } else {
            newList = newList.filter((report) =>
              report[filter.name].toString().toLowerCase().includes(filter.value.toLowerCase())
            );
          }
        });
        return newList;
      })
      return updatedFilters;
    });
  }
  return {
    success,
    setSuccess,
    statusMessage,
    reportsList,
    filteredList,
    setReportsList,
    filterByProperty,
    isFiltered,
    filters,
    getList
  }
}