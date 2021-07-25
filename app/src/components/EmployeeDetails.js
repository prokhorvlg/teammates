import React, { useState, useEffect } from 'react';
import { findObjectInArray } from '../utils/utils'
import { gql, useMutation } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faMobile, faEnvelope, faTimes, faUserEdit, faCheck, faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons'

import PerfectScrollbar from 'react-perfect-scrollbar'

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $EditPerson: EditPerson!) {
    editPerson(id: $id, payload: $EditPerson) {
        name {
          title
          first
          last
        }
        email
        phone
        cell
    }
  }
`;

const EmployeeDetails = ({ employees, selectedEmployee, selectedScreen, refetch, setSelectedScreen }) => {
  const [employeeEditMode, setEmployeeEditMode] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  const saveEmployeeDebounce = useDebouncedCallback((updateEmployeeObject) => {
    console.log(updateEmployeeObject);
    updateEmployee({
      variables: updateEmployeeObject
    }).then((employeeData) => {
      refetch();
    });
  }, 1000);

  useEffect(() => {
    if (selectedEmployee && employees) {
      setSelectedEmployeeData(findObjectInArray(selectedEmployee, employees));
    }
  }, [selectedEmployee]);

  if (selectedEmployee && selectedEmployeeData) {
    // Whenever selected employee changes, change the data this component uses and manipulates.

    const defaultEmployeeObject = {
      id: selectedEmployee,
      EditPerson: {
        first: selectedEmployeeData.name.first,
        last: selectedEmployeeData.name.last,
        email: selectedEmployeeData.email,
        phone: selectedEmployeeData.phone,
        cell: selectedEmployeeData.cell
      }
    };
    let updateEmployeeObject = defaultEmployeeObject;
    const onEmployeeInput = (value, type) => {
      switch (type) {
        case "first":
          updateEmployeeObject.EditPerson.first = value;
          setSelectedEmployeeData({...selectedEmployeeData, name: {...selectedEmployeeData.name, first: value}});
          break;
        case "last":
          updateEmployeeObject.EditPerson.last = value;
          setSelectedEmployeeData({...selectedEmployeeData, name: {...selectedEmployeeData.name, last: value}});
          break;
        case "email":
          updateEmployeeObject.EditPerson.email = value;
          setSelectedEmployeeData({...selectedEmployeeData, email: value});
          break;
        case "phone":
          updateEmployeeObject.EditPerson.phone = value;
          setSelectedEmployeeData({...selectedEmployeeData, phone: value});
          break;
        case "cell":
          updateEmployeeObject.EditPerson.cell = value;
          setSelectedEmployeeData({...selectedEmployeeData, cell: value});
          break;
      }
      saveEmployeeDebounce(updateEmployeeObject);
    }

    if (!employeeEditMode) {
      return (
        <div className={"body-employee-details" + ((selectedScreen === 1) ? " mobile-active" : " mobile-inactive")}>
          <div className="details-color-bar">
            <button className="mobile-only" onClick={() => { setSelectedScreen(0); }}>
              back
            </button>
          </div>
          <div className="details-centered-block">
            <img src={selectedEmployeeData.picture.large} />
            <h2>{selectedEmployeeData.name.first} {selectedEmployeeData.name.last}</h2>
            <p>Front End Developer</p>
          </div>
          <PerfectScrollbar>
            <ul className="details-list">
              <li className="details-list-item">
                <FontAwesomeIcon icon={faEnvelope} className="fa-link-icon" />
                <p>{selectedEmployeeData.email}</p>
              </li>
              <li className="details-list-item">
                <FontAwesomeIcon icon={faPhone} className="fa-link-icon" />
                <p>{selectedEmployeeData.phone}</p>
              </li>
              <li className="details-list-item">
                <FontAwesomeIcon icon={faMobile} className="fa-link-icon" />
                <p>{selectedEmployeeData.cell}</p>
              </li>
            </ul>
          </PerfectScrollbar>
          <div className="details-button-area">
            <button onClick={() => { setEmployeeEditMode(true); }}>
              <FontAwesomeIcon icon={faUserEdit} className="fa-link-icon" />
              <p>Edit Details</p>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={"body-employee-details" + ((selectedScreen === 1) ? " mobile-active" : " mobile-inactive")}>
          <div className="details-color-bar"></div>
          <div className="details-centered-block">
            <img src={selectedEmployeeData.picture.large} />
          </div>
          <PerfectScrollbar>
            <ul className="details-list">
              <li className="details-list-item edit-mode">
                <p><FontAwesomeIcon icon={faUser} className="fa-link-icon" /> First Name</p>
                <input type="text" onChange={(e) => { onEmployeeInput(e.target.value, 'first'); }} value={selectedEmployeeData.name.first} />
              </li>
              <li className="details-list-item edit-mode">
                <p><FontAwesomeIcon icon={faUser} className="fa-link-icon" /> Last Name</p>
                <input type="text" onChange={(e) => { onEmployeeInput(e.target.value, 'last'); }} value={selectedEmployeeData.name.last} />
              </li>
              <li className="details-list-item edit-mode">
                <p><FontAwesomeIcon icon={faBriefcase} className="fa-link-icon" /> Occupation</p>
                <input type="text" value="Front End Developer" disabled />
              </li>
              <li className="details-list-item edit-mode">
                <p><FontAwesomeIcon icon={faEnvelope} className="fa-link-icon" /> Email</p>
                <input type="text" onChange={(e) => { onEmployeeInput(e.target.value, 'email'); }} value={selectedEmployeeData.email} />
              </li>
              <li className="details-list-item edit-mode">
                <p><FontAwesomeIcon icon={faPhone} className="fa-link-icon" /> Phone</p>
                <input type="text" onChange={(e) => { onEmployeeInput(e.target.value, 'phone'); }} value={selectedEmployeeData.phone} />
              </li>
              <li className="details-list-item edit-mode">
                <p><FontAwesomeIcon icon={faMobile} className="fa-link-icon" /> Mobile</p>
                <input type="text" onChange={(e) => { onEmployeeInput(e.target.value, 'cell'); }} value={selectedEmployeeData.cell} />
              </li>
            </ul>
          </PerfectScrollbar>
          <div className="details-button-area">
            <button onClick={() => { setEmployeeEditMode(false); }}>
              <FontAwesomeIcon icon={faCheck} className="fa-link-icon" />
              <p>Finish Editing</p>
            </button>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className={"body-employee-details no-selected" + ((selectedScreen === 1) ? " mobile-active" : " mobile-inactive")}>
        <FontAwesomeIcon icon={faTimes} className="fa-link-icon" />
        <p>No employee selected.</p>
      </div>
    )
  }


};

export default EmployeeDetails;
