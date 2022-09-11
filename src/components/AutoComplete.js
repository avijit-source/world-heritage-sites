import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { HeritageListContext } from '../context/heritageListContext';

function AutoComplete() {
  const list = useContext(HeritageListContext);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const dropdownRef = useRef();
  const inputRef = useRef();
  const renderDropdown = () => {
    const dropdownClass = results.length > 0 ? "show" : null;
    return (
      <ul style={{
        height: results.length > 10 ? "300px" : "auto",
        width: "470px",
        overflowY: "scroll",
        overflowX: "hidden"
      }}
        ref={dropdownRef}
        className={`dropdown-menu ${dropdownClass}`}>
        {results.map(r => (
          <Link to={`/${r.id}`} key={Date.now() + r.id}>
            <li className="dropdown-item listsearch">
              {r.descTitleTxt}
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  useEffect(() => {
    let timeoutId;
    let pattern;
    if (search) {
      timeoutId = setTimeout(() => {
        pattern = new RegExp(search, "i");
        let result = list.filter(item => pattern.test(item.descTitleTxt.trim()));
        let countryArr = list.filter(item => pattern.test(item.locationArr[0].trim()));
        result = [...result, ...countryArr].filter((value, index, self) =>
          index === self.findIndex((t) => (
            t.descTitleTxt === value.descTitleTxt 
          ))
        )
        if (result.length > 0) {
          setResults(result);
          dropdownRef.current.classList.add("show");
        }
      }, 1000)
    } else {
      dropdownRef.current.classList.remove("show");
      setSearch("");
      inputRef.current.blur();
      setResults([]);
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [search, list])



  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input type="text"
          style={{ backgroundColor: 'rgba(145,158,171,0.04)' }}
          ref={inputRef}
          id="search" className="form-control bg-light searchbox"
          autoComplete='off'
          value={search}
          spellcheck="false"
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search by name or country</label>
        {renderDropdown()}
      </div>
    </div>
  )
}

export default AutoComplete