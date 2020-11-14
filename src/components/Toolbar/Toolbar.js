import './Toolbar.css';

const Toolbar = (props) => {

    const handleLoad = () => {
      props.setLoadClicked(!props.loadClicked);
      //clears saved data
      localStorage.clear();
      sessionStorage.clear();
      //gets all the data from shipments.json
      fetch('https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json')
        .then(response => response.json())
        .then(data => {
          props.setNewData(data);
        });
    }
    const handleSave = () => {
    //writes data from session storage to local
      for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        localStorage.setItem(key, value);
      }
    }
    const handleSearch = (event) => {
      props.setSearchInput(event.target.value);
    }
    
    return (
      <div id='toolbar'>
        <button id='load' onClick={handleLoad}>Load</button>
        <button id='save' onClick={handleSave}>Save</button>
        <input id='search' onChange={handleSearch} placeholder='search'></input>
      </div>
    );
  }

  export default Toolbar;