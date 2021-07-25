import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const EmployeeListElement = ({ employee, selectedEmployee, setSelectedEmployee, setSelectedScreen }) => {
  const employeeIsSelected = (selectedEmployee === employee.id) ? true : false;
  return (
    <li className="list-body-element">
      <button onClick={() => { setSelectedEmployee(employee.id); setSelectedScreen(1); }} className={(employeeIsSelected) ? "selected" : ""}>
        <img src={employee.picture.thumbnail} alt={employee.name.first + " " + employee.name.last} />
        <p className="employee-name">{employee.name.first} {employee.name.last}</p>
        <p className="employee-title desktop-only">Front End Developer</p>
        <FontAwesomeIcon icon={faArrowRight} className="fa-arrow-icon" />
      </button>
    </li>
  );
};

export default EmployeeListElement;
