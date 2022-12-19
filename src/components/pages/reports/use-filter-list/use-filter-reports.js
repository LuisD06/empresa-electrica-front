import { useEffect, useState } from 'react'
import { REPORTS_LIST } from '../../../../constants/reports';


export const useFilterReports = () => {
  const [reportsList, setReportsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState([]);

  useEffect(
    () => {
      setReportsList(REPORTS_LIST);
      setFilteredList(REPORTS_LIST);
    },
    []
  )

  const filterByProperty = (property, value) => {
    console.log(typeof (value));
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
          newList = newList.filter((report) =>
            report[filter.name].toString().toLowerCase().includes(filter.value.toLowerCase())
          );
        });
        return newList;
      })
      return updatedFilters;
    });
  }
  return {
    reportsList,
    filteredList,
    setReportsList,
    filterByProperty,
    isFiltered,
    filters
  }
}