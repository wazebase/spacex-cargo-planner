import {useState} from 'react';
import ls from 'local-storage';
import './Company.css';

const Company = (props) => {
    const [boxes, setBoxes] = useState(props.boxes);

    //function that calculates number of required cargo bays
    const cargoNum = () => {
      if (boxes === null) {
        return 'none';
      }

      //creates a number array
      let arr = boxes.split(',').map(string => {
        if (!isNaN(parseFloat(string))) {
          return parseFloat(string);
        }
        else {
          return 0;
        }
      });
      
      let sum = arr.reduce((acc, val) => acc + val);
      return Math.ceil(sum / 10);
    }

    const handleChange = (event) => {
      setBoxes(event.target.value);
      ls.backend(sessionStorage);
      //writes down changed cargo boxes value to session storage
      ls.set(props.name, event.target.value);
    }
  
    return (
      <div>
        <h1>{props.name}</h1>
        <h2>{props.email}</h2>
        <p>Number of required cargo bays is {`${cargoNum()}`}</p>
        <p>Cargo boxes</p>
        <input value={boxes === null ? '' : boxes} onChange={handleChange}></input>
      </div>
    )
  }

  export default Company;