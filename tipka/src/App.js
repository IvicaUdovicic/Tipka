/*import logo from './logo.svg';*/
import "./App.css";
import React, { useState } from "react";
import axios from "axios";

/*function ColorList(){
 
  }
  
  
  return(
    <div>
      <button onClick={addColor}>dodaj boju</button>
      <ul>
        
      </ul>
    </div>
  )
}*/


function App() {
  const[color, setColor] = useState([])
  const addColor = () => {
    setColor(arr => [...color, `${arr.length}`]);
    };
  
  
  
  
  
  
  
  const [currentColor, setCurrentColor] = useState("");
  const handleClick = async () => {
    const data = await axios.get("/json/color/random");
    setCurrentColor({
        color: "#" + data.data.new_color,
        loading:false
    });
    console.log(data.data.colors);
  };
  return (
    <div>
      <button
        style={{ color: currentColor ? currentColor.color : 'white'}}
        onClick={() => {
          handleClick();
          addColor();}}
        className="btn btn-primary"
        type="button"
        value="Update"
      >
        Search
      </button>

      <ul>
      {color.map(color => (
          <li key={color.data}>{color.value}</li>))}
      </ul>
      <input type="text" id="boja"></input>
    </div>
  );
}

export default App;
