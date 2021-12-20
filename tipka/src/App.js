import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [colors, setColor] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [previousUniqueColors, addUniqueColor] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("select");
  const [boje, updateBoje] = useState(colors);

  const handleOnDragEnd = useCallback((result) => {
    if (!result.destination) return;
    const items = Array.from(boje);
    const reorderItem = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);

    updateBoje(items);
  }, []);

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
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="boje">
              {(provided) => (
                <div
                  className="boje"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {colors.map((colorName, index) => (
                    <Draggable
                      key={colorName}
                      draggableId={colorName}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <input
          className="input"
          type="text"
          placeholder="Unesi boju"
          id="boja"
          onChange={(e) => setButtonLabel(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default App;
