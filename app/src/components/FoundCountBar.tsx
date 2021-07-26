import React, { FC } from 'react';

type FoundCountBarProps = {
  searchString: string;
  totalEmployees: number;
  searchResultsCount: number;
}

const FoundCountBar: FC<FoundCountBarProps> = ({ searchString, totalEmployees, searchResultsCount }) => {
  if (searchString === "") {
    return (
      <div className="list-header-found">
        <p>Displaying all {totalEmployees} employees.</p>
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
        <p>Filter matched {searchResultsCount} of {totalEmployees} employees.</p>
      </div>
    );
  }
};

export default FoundCountBar;
