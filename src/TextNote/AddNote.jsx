
import React, { useState, useMemo } from "react";

function TextNote() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [noteColors, setNoteColors] = useState([]);

  const memoizedFunctions = useMemo(() => {
    const getRandomColor = () => {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      return { background: randomColor, color: "#fff" };
    };

    const handleClick = (e) => {
      e.preventDefault();
      setTasks((prevTasks) => [...prevTasks, inputValue]);
      setNoteColors((prevColors) => [...prevColors, getRandomColor()]);
      setInputValue("");
    };

    return { getRandomColor, handleClick };
  }, [inputValue]);

  const closeTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });

    setNoteColors((prevColors) => {
      const updatedNoteColors = [...prevColors];
      updatedNoteColors.splice(index, 1);
      return updatedNoteColors;
    });
  };

  const memoizedColors = useMemo(() => {
    return tasks.map(
      (task, index) => noteColors[index] || memoizedFunctions.getRandomColor()
    );
  }, [tasks, noteColors, memoizedFunctions]);

  return (
    <>
      <div className="main">
        <div className="left">
          <form onSubmit={memoizedFunctions.handleClick}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="9"
              placeholder="Write a text here"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></textarea>
            <button type="submit">Add Note</button>
          </form>
        </div>
        <div className="right">
          <div className="tasks">
            {tasks.map((task, index) => (
              <div
                className="task"
                key={index}
                style={{
                  background: memoizedColors[index].background,
                  color: memoizedColors[index].color,
                }}
              >
                <span onClick={() => closeTask(index)}>&times;</span>
                {task}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TextNote;
