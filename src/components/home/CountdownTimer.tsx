import React, { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { motion } from 'framer-motion';

type CountdownTimerProps = {
  targetDate: Date;
  label: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, label }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const secondsDiff = differenceInSeconds(targetDate, now);
      
      if (secondsDiff <= 0) {
        setIsComplete(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      const days = Math.floor(secondsDiff / (60 * 60 * 24));
      const hours = Math.floor((secondsDiff % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((secondsDiff % (60 * 60)) / 60);
      const seconds = Math.floor(secondsDiff % 60);
      
      return { days, hours, minutes, seconds };
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-center text-xl md:text-2xl font-medium text-white mb-4">{label}</h3>
      {isComplete ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold text-indigo-400"
        >
          Time's Up!
        </motion.div>
      ) : (
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      )}
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full aspect-square bg-indigo-900/70 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center text-3xl md:text-4xl font-bold text-white border border-indigo-700/50"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <span className="mt-2 text-xs md:text-sm text-gray-300">{label}</span>
    </div>
  );
};

export default CountdownTimer;