import './Toolbar.css';

const Toolbar = (props) => {

  const handleLoad = () => {
    props.setLoadClicked(!props.loadClicked);

    //clears saved data
    localStorage.clear();
    sessionStorage.clear();

    //gets all the data from shipments.json
    fetch(props.link)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        else {
          throw new Error('Failed to load data');
        }
      })
      .then(data => {
        props.setNewData(data);
      })
      .catch(error => alert(error));
  }

  const handleSave = () => {
    //writes data from session storage to local
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      let value = sessionStorage.getItem(key);
      localStorage.setItem(key, value);
    }

    sessionStorage.clear();
    alert('You data was saved sucessfully')
  }

  const handleSearch = (event) => {
    props.setSearchInput(event.target.value);
  }

  return (
    <div id='toolbar'>
      <p id='app-name'>Cargo Planner</p>

      <div id='tools'>
        <input id='search' onChange={handleSearch}
          placeholder='&#xf002; search' />

        <button id='load' onClick={handleLoad}>Load</button>
        <button id='save' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Toolbar;