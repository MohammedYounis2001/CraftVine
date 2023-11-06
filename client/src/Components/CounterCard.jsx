import React, { useState } from 'react';

const CounterCard = () => {
  const [count, setCount] = useState(1);

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="sm:order-1">
      <div className="mx-auto flex h-8 items-stretch text-white">
        <button
          className="flex items-center justify-center rounded-l-md   px-4 transition   bg-teal-600 hover:bg-teal-400"
          onClick={decreaseCount}
        >
          -
        </button>
        <div className="flex w-full items-center justify-center text-black bg-gray-100 px-4 text-xs uppercase transition">
          {count}
        </div>
        <button
          className="flex items-center justify-center rounded-r-md   px-4 transition    bg-teal-600 hover:bg-teal-400"
          onClick={increaseCount}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CounterCard;