import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import SearchInput from './SearchInput';
import FoundCountBar from './FoundCountBar';
import IntroModal from './IntroModal';

import { GET_EMPLOYEES } from '../queries/queries';
import {Employees, Person, Name, Picture } from '../types/interfaces'

export const App = () => {
  // STATE: Contains relevant data for application.
  // Grab data using GQL's useQuery hook.
  //const {data, loading, error, refetch} = useQuery(GET_EMPLOYEES);
  const {data, loading, error, refetch} = useQuery<Employees>(GET_EMPLOYEES);
  // Contains the number of employees displayed on page.
  const [totalEmployees, setTotalEmployees] = useState(0);
  // Contains the currently active screen (for mobile).
  const [selectedScreen, setSelectedScreen] = useState(0);
  // Contains the currently selected employee (for viewing and editing data)
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  // Contains the search string to filter down employee list.
  const [searchString, setSearchString] = useState("");
  // Contains the number of employees displayed on page.
  const [searchResultsCount, setSearchResultsCount] = useState(0);
  // Contains the open/closed state of the introductory modal.
  const [introModalOpen, setIntroModalOpen] = useState(true);

  useEffect(() => {
    if (!loading && data) {
      setTotalEmployees(data.people.length);
      console.log(data)
    }
  }, [loading]);

  // RENDER
  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        <p>Application error!</p>
      </div>
    );
  }

  if (data && data.people) {
    return (
      <>
      <IntroModal
        introModalOpen={introModalOpen}
        setIntroModalOpen={setIntroModalOpen}
        />
      <div className="app-container">
        <div className="app-header">
          <h1><span>team</span>mates</h1>
          <p className="desktop-only">Employee Directory</p>
          <div className="intro-modal-open-container">
            <button onClick={() => { setIntroModalOpen(true); }} className="intro-modal-open">
              <FontAwesomeIcon icon={faQuestion} className="fa-icon" />
            </button>
          </div>
        </div>
        <div className="app-body">
          <div className={"body-employee-list" + ((selectedScreen === 0) ? " mobile-active" : " mobile-inactive")}>
            <div className="list-header">
              <FoundCountBar
                searchString={searchString}
                totalEmployees={totalEmployees}
                searchResultsCount={searchResultsCount} />
              <SearchInput
                setSearchString={setSearchString} />
            </div>
            <EmployeeList
              employees={data.people}
              searchString={searchString}
              setSearchResultsCount={setSearchResultsCount}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              setSelectedScreen={setSelectedScreen} />
          </div>
          <EmployeeDetails
            employees={data.people}
            selectedEmployee={selectedEmployee}
            selectedScreen={selectedScreen}
            refetch={refetch}
            setSelectedScreen={setSelectedScreen} />
        </div>
      </div>
      </>
    );
  }

}

export default App;
