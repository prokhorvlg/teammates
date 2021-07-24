import React, { useEffect, useState } from 'react';

import './App.css';
import { gql, useQuery } from '@apollo/client';

import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import SearchInput from './components/SearchInput';
import FoundCountBar from './components/FoundCountBar';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    people {
      id
      name {
        title,
        first,
        last
      }
      email
      picture {
        thumbnail
        medium
        large
      }
      phone
      cell
    }
  }
`;

export const App = () => {
  // STATE: Contains relevant data for application.
  // Grab data using GQL's useQuery hook.
  const {data, loading, error, refetch} = useQuery(GET_EMPLOYEES);
  // Contains the number of employees displayed on page.
  const [totalEmployees, setTotalEmployees] = useState(0);
  // Contains the currently active screen (for mobile).
  const [selectedScreen, setSelectedScreen] = useState(0);
  // Contains the currently selected employee (for viewing and editing data)
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // Contains the search string to filter down employee list.
  const [searchString, setSearchString] = useState("");
  // Contains the number of employees displayed on page.
  const [searchResultsCount, setSearchResultsCount] = useState(0);

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

  return (
    <div className="app-container">
      <div className="app-header">
        <h1><span>team</span>mates</h1>
        <p>Employee Directory</p>
      </div>
      <div className="app-body">
        <div className="body-employee-list">
          <div className="list-header">
            <FoundCountBar
              searchString={searchString}
              totalEmployees={totalEmployees}
              searchResultsCount={searchResultsCount} />
            <SearchInput
              setSearchString={setSearchString} />
          </div>
          <ul className="list-body">
            <EmployeeList
              employees={data.people}
              searchString={searchString}
              setSearchResultsCount={setSearchResultsCount}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee} />
          </ul>
        </div>
        <EmployeeDetails
          employees={data.people}
          selectedEmployee={selectedEmployee}
          refetch={refetch} />
      </div>
    </div>
  );

}

export default App;
