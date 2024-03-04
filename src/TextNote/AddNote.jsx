import React, { useState } from "react";

function AddNote() {
  const colors = [
    { background: "#000", color: "#fff" },
    { background: "#123456", color: "#fff" },
    { background: "#120012", color: "#fff" },
  ];
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setTasks([...tasks, inputValue]);
    setInputValue("");
  }

  function closeTask(e) {
    console.log(e);
    setTasks(
      tasks.filter((task, ind) => {
        return Number(e.target.id) !== ind;
      })
    );
  }

  return (
    <>
      <div className="main">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <textarea
              type="color"
              name=""
              id=""
              cols=""
              rows=""
              placeholder="Enter your value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></textarea>
            {/* <div>
              <input type="color" class="picker" id="bgColor" />
              <h3>Bg Color</h3>
            </div> */}
            <button type="submit">Add</button>
          </form>
        </div>
        <div className="right">
          <h2>TEXT NOTE</h2>
          {/* <div className="tasks">
          {tasks.map((task, index) => (

            <div className="task" key={index}>
              <span onClick={() => closeTask(index)}>&times;</span>
              {task}
            </div>
          ))}
        </div> */}
          <div className="tasks">
            {tasks.map((task, index) => {
              const randomColor = colors[Math.floor(Math.random() * 3)];
              return (
                <div
                  className="task"
                  key={index}
                  style={{
                    background: randomColor.background,
                    color: randomColor.color,
                  }}
                >
                  <span onClick={closeTask} id={index}>
                    &times;
                  </span>
                  {task}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNote;

// //......................
