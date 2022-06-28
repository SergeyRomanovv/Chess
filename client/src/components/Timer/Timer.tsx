import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../../models/Colors';
import { Player } from '../../models/Player';

interface TimeProps {
  currentPlayer: Player | null;
  restart: () => void
}

const Timer: FC<TimeProps> = ({ currentPlayer, restart }) => {
  const [whiteTime, setWhiteTime] = useState<number>(300)
  const [blackTime, setBlackTime] = useState<number>(300)
  const timer = useRef< null | ReturnType<typeof setInterval>>(null)

  function startTimer(){
    if (timer.current) {
      clearInterval(timer.current)
    }

    const collback = currentPlayer?.color === Colors.WHITE ? decrementWhitekTimer : decrementBLackTimer
    timer.current = setInterval(collback, 1000)
  }

  function decrementWhitekTimer() {
    setWhiteTime((prev => prev - 1));
  }

  function decrementBLackTimer() {
    setBlackTime((prev => prev - 1));
  }

  function restartHandle() {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  useEffect(() => {
    startTimer()
  }, [currentPlayer])
  

  return (
    <div>
      <div>
        <button onClick={restartHandle}>Restart game</button>
      </div>
      <h2>Белые - {whiteTime}</h2>
      <h2>Черные - {blackTime}</h2>
    </div>
  );
};

export default Timer;
