import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchInput = ({ setSearchString }) => {
  return (
    <div className="list-header-search">
      <input type="text" onChange={(e) => { setSearchString(e.target.value); }} />
      <FontAwesomeIcon icon={faSearch} className="fa-search-icon" />
    </div>
  );
};

export default SearchInput;
