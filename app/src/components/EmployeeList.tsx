import React, { FC, useMemo, useEffect } from 'react';

import EmployeeListElement from './EmployeeListElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Person } from '../types/interfaces'

type EmployeeListProps = {
  employees: Person[];
  searchString: string;
  setSearchResultsCount(n: number): void;
  selectedEmployee: number;
  setSelectedEmployee(n: number): void;
  setSelectedScreen(n: number): void;
}

const EmployeeList: FC<EmployeeListProps> = ({ employees, searchString, setSearchResultsCount, selectedEmployee, setSelectedEmployee, setSelectedScreen }) => {
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

    if (filteredEmployees.length) {
      return (
        <ul className="list-body">
          <PerfectScrollbar>
            {filteredEmployees.map((employee, i) => (
              <EmployeeListElement
                key={employee.id}
                employee={employee}
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
                setSelectedScreen={setSelectedScreen}
              />))}
          </PerfectScrollbar>
        </ul>
        );
    } else {
      return (
        <div className="list-body no-found">
          <FontAwesomeIcon icon={faTimes} className="fa-link-icon" />
          <p>No employees found.</p>
        </div>
      );
    }
  } else {
    return null;
  }
};

export default EmployeeList;
