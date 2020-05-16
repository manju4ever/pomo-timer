const stopwatch = (timeToEnd = 10, unit = 's') => {

  if(!timeToEnd || !(Boolean(Number(timeToEnd)))) {
    throw new Error(`Expected time to be of type Number instead got ${typeof timeToEnd}`)
  }

  const parsedTimeToEnd = parseInt(Number(timeToEnd));

  let cancelAfter = 0, 
      divisor = 1000,
      elapsed_total_seconds = 0,
      elapsed_seconds = 0,
      elapsed_min = 0,
      counter = null,
      isRunning = false,
      isTimerEnded = false;

    switch(unit) {
      case 's' : cancelAfter = parsedTimeToEnd * 1000; break;
      case 'm' : {
          cancelAfter = parsedTimeToEnd * 60 * 1000; 
          divisor = divisor * 60; 
          break;
      }
      default: cancelAfter = parsedTimeToEnd * 1000
    }

    function _start() {
        
        if(isTimerEnded) _reset();
        if(isRunning) return;

        isRunning  = true;
        isTimerEnded = false;

        console.log(`Timer Started !`);
        console.log(`Timer will stop in `, cancelAfter / divisor, unit);
        
        counter = setInterval(() => {
          elapsed_total_seconds++;
          elapsed_seconds++;
          elapsed_min = Math.floor(elapsed_total_seconds / 60);
          
          // Reset the elapsed_seconds again
          if(elapsed_seconds === 60) {
            elapsed_seconds = 0;
          }

          // check elapsed_total_seconds equals cancelAfter
          if(elapsed_total_seconds * 1000 === cancelAfter) {
            _stop();
            isRunning = false;
          }
        }, 1000);
    }

    function _stop() {
      isRunning = false;
      clearInterval(counter);
      console.log(`Timer stopped !`);
    }

    function _reset() {
      _stop();
      elapsed_seconds = 0;
      elapsed_total_seconds = 0;
      elapsed_min = 0;
      isTimerEnded = true;
      isRunning = false;
    }

    function _timeRemaining() { 
      return `${Math.floor((cancelAfter - elapsed_total_seconds)/(60 * 1000))}m ${60 - (elapsed_seconds || 60)}s`;
    }

    return {
      start: _start,
      stop: _stop,
      reset: _reset,
      peek: () => `${elapsed_min}m ${elapsed_seconds}s`,
      isStopped: () => isTimerEnded,
      isRunning: () => isRunning,
      timeRemaining: _timeRemaining,
    };
};

export default stopwatch;
