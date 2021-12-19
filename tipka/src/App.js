import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [colors, setColor] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [previousUniqueColors, addUniqueColor] = useState([]);
  const [buttonLabel, setButtonLabel] = useState('select');

  const handleClick = async () => {
    const data = await axios.post("/json/color/random");
    setCurrentColor({
      hex: "#" + data.data.new_color,
      loading: false,
    });
    setColor([...colors, `${data.data.new_color}`]);
  };

  useEffect(() => {
    if (
      typeof currentColor.hex !== "undefined" &&
      !previousUniqueColors.includes(currentColor.hex)
    ) {
      addUniqueColor([...previousUniqueColors, `${currentColor.hex}`]);
    }
    console.log(previousUniqueColors);
  }, [currentColor.hex]);

  return (
    <div className="Sve">
      <div className="elementi">
        <button
          style={{ color: currentColor.hex ? currentColor.hex : "black" }}
          onClick={() => {
            handleClick();
          }}
          className="tipka"
          type="button"
          value="Update"
        >
          {buttonLabel}
        </button>
        <div className="Lista">
          <ul>
            {colors.map((colorName, index) => (
              <li
                className="li"
                key={index}
                style={{
                  color: previousUniqueColors[index],
                  fontWeight:
                    currentColor.hex == previousUniqueColors[index]
                      ? "bold"
                      : "normal",
                }}
              >
                {colorName}
              </li>
            ))}
          </ul>
        </div>
        <input
          className="input"
          type="text"
          placeholder="Unesi boju"
          id="boja"
          onChange={e => setButtonLabel(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default App;
