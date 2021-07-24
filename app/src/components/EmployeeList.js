import React, { useMemo, useEffect } from 'react';

import EmployeeListElement from './EmployeeListElement';

const EmployeeList = ({ employees, searchString, setSearchResultsCount, selectedEmployee, setSelectedEmployee }) => {
  if (employees) {

    // FILTERING LOGIC: Filters all employees against search string before displaying.
    const filteredEmployees = useMemo(() => {
      const searchArray = searchString.toLowerCase().split(" ");
      return employees.filter((employee) => {
        const employeeToString = `
        ${employee.name.title.toLowerCase()}
        ${employee.name.first.toLowerCase()}
        ${employee.name.last.toLowerCase()}
        ${employee.email.toLowerCase()}
        `;
        let subMatch = true;
        for (const searchSubString of searchArray) {
        //searchArray.forEach((searchSubString) => {
          if (!employeeToString.includes(searchSubString)) {
            subMatch = false;
            break;
          }
        };
        return subMatch;
      });
    }, [employees, searchString]);

    // SEARCH RESULTS COUNT: Record number of search results for state.
    useEffect(() => {
      setSearchResultsCount(filteredEmployees.length);
    }, [filteredEmployees]);

    return (
      filteredEmployees.map((employee, i) => (
        <EmployeeListElement
          key={employee.id}
          employee={employee}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
        />))
      );
    } else {
      return null;
    }
};

export default EmployeeList;
