import React, { useState } from "react";
import "./App.css";

import stopwatch from "./Stopwatch";

const background_colors = ["#fbc531", "#273c75", "#40739e", "#e84118"];

const getRandomNumber = (within) => {
  return Math.round(Math.random() * 100) % within;
};

function App() {
  // const [my_background, setBackground] = useState("#273c75");
  const [watch, setWatch] = useState(stopwatch(25, "m"));
  const [time, setTime] = useState(watch.timeRemaining());

  const changeColor = () => {
    const random_color =
      background_colors[getRandomNumber(background_colors.length)];
    //setBackground(random_color); // 1 time
  };

  const startTimer = () => {
    watch.start();
    const ic = setInterval(() => {
      window.document.title = watch.timeRemaining();
      setTime(watch.timeRemaining());
      if (watch.isStopped()) clearInterval(ic);
    }, 800);
  };

  const stopTimer = () => {
    watch.stop();
    setTime(watch.timeRemaining());
  };

  const resetTimer = () => {
    watch.reset();
    window.document.title = watch.timeRemaining();
    setTime(watch.timeRemaining());
  };

  // Render block - how to rerun ?
  return (
    <div
      className="container"
      style={{
        background: `URL(https://picsum.photos/2200/1200?grayscale)`,
      }}
      onClick={changeColor}
    >
      <div className="stopwatch">
        <h1>{time}</h1>
        <div className="controls">
          {watch.isRunning() ? (
            <button onClick={stopTimer}>STOP</button>
          ) : (
            <button onClick={startTimer}>START</button>
          )}
          <button onClick={resetTimer}>RESET</button>
        </div>
      </div>
    </div>
  );
}

export default App;
