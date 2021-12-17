/*import logo from './logo.svg';*/
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [currentColor, setColor] = useState('');
  const handleClick = async() => {
  const data = await axios.post('/json/color/random')
  setColor({
    data:data,
    loading:false
  })
  console.log(data.data);
}
  return (
    <div>
      <button onClick={handleClick} type="button" className="btn btn-primary">Search</button>

      <ul>
        <p>a</p>
      </ul>
      <input type="text" id="boja"></input>
    </div>
  );
}

export default App;
