import React from 'react';

const FoundCountBar = ({ searchString, totalEmployees, searchResultsCount }) => {
  if (searchString === "") {
    return (
      <div className="list-header-found">
        <p>Displaying all <span>{totalEmployees}</span> employees.</p>
      </div>
    );
  } else if (searchString !== "" && searchResultsCount === 0){
    return (
      <div className="list-header-found">
        <p>No employees match the filter parameters.</p>
      </div>
    );

  } else {
    return (
      <div className="list-header-found">
        <p>Filter matched <span>{searchResultsCount}</span> of {totalEmployees} employees.</p>
      </div>
    );
  }
};

export default FoundCountBar;
