import './App.css';
import { useState, useEffect } from 'react';
import ls from 'local-storage';
import Company from './components/Company/Company.js';
import Name from './components/Name/Name.js';
import Toolbar from './components/Toolbar/Toolbar.js';
import { useBeforeunload } from 'react-beforeunload';

function App() {
  const [newData, setNewData] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState(null);
  const [names, setNames] = useState(null);
  const [loadClicked, setLoadClicked] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const link = 'https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json';
  useEffect(() => {
     //checks if data was saved in local storage
    if (localStorage.length > 0) {
      sessionStorage.clear();
      fetch(link)
        .then(response => response.json())
        .then(data => {
          //connects saved data to shipments.json data
          let changedData = data.map(info => {
            if (Object.keys(localStorage).includes(info.name)) {
              info.boxes = ls.get(info.name);
              return info;
            }
            return info;
          })
          setNewData(changedData);
        });
    }
  }, []);
//refreshes the data every time new company is clicked and opened
  useEffect(() => {
    if (newData !== null) {
      let changedData = newData.map(info => {
        if (Object.keys(sessionStorage).includes(info.name)) {
          info.boxes = ls.get(info.name);
          return info;
        }
        return info;
      })
      if (newData !== changedData) {
        setNewData(changedData);
      }
    }
  }, [company]);
//creates new company list with all the company details information. 
  useEffect(() => {
    if (newData !== null) {
      const list = newData.map(info => {
        return (
          <Company key={info.id} name={info.name}
            email={info.email} boxes={info.boxes} />
        )
      })
      setCompanyList(list);
    }
    // re-renders the list when data is changed or load button is clicked
  }, [newData, loadClicked]);

  useEffect(() => {
    if (newData !== null) {
    
      const newNames = newData.map(info => {
        //adds method to change displayed company onClick
        const handleClick = (key) => {
          let newCompany = companyList.filter(company => company.key === key);
          setCompany(newCompany);
        }
        // create list of company names
        return (
          <li key={info.key} onClick={() => handleClick(info.id)}><Name name={info.name} /></li>
        )
      })
      //checks is something is typed in search list. if so, filters name list according to search input
      if (searchInput.length > 0) {
        let filteredNames = newNames.filter(name => name.props.children.props.name.toLowerCase().slice(0, searchInput.length) === searchInput.toLowerCase());
        setNames(filteredNames);
      }
      else {
        setNames(newNames);
      }
    }
    //re-renders when company list or data is changed or something is typed into search box
  }, [newData, companyList, searchInput]);

  useEffect(() => {
    //if load button is clicked, changes the displayed company
    if (companyList !== null) {
      if (company !== companyList[0]) {
        setCompany(companyList[0]);
      }
      else {
        setCompany(companyList[1]);
      }
    }
  }, [loadClicked])

  useEffect(() => {
    //asks to load the data or automatically sets the first company in the list to display
    if (companyList.length === 0) {
      setCompany('Please, press load to get the data.')
    }
    else if ((loadClicked || localStorage.length > 0) && (company === null || typeof company === 'string')) {
      setCompany(companyList[0]);
    }
  }, [loadClicked, companyList]);

  useBeforeunload((event) => event.preventDefault());

  return (
    <div id='container'>
      <ul id='list'>
        {names}
      </ul>
      <div id='info'>
        <Toolbar setSearchInput={setSearchInput} link = {link}
          setLoadClicked={setLoadClicked} loadClicked={loadClicked} setNewData={setNewData} />
        {company}
      </div>
    </div>
  );
}



export default App;