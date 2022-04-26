import React, { useState, useEffect } from "react";

export default function SlideShow({ imgs }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, []);

  const next = () => {
    if (index === imgs.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index === 0) {
      setIndex(imgs.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const moveDot = (index) => {
    setIndex(index);
  };

  return (
    <div className="slideshow">
      <img className="mainImg" src={imgs[index]} alt="mainImg" />
      <div className="actions">
        <button onClick={prev}>
          <i className="fa fa-solid fa-angle-left" />
        </button>
        <button onClick={next}>
          <i className="fa fa-solid fa-angle-right" />
        </button>
      </div>
      <ul className="dots">
        {Array.from({ length: 3 }).map((obj, i) => (
          <li key={i}>
            <i
              onClick={() => moveDot(i)}
              className={`fa fa-solid fa-circle ${
                index === i ? "dot-active" : "dot"
              }`}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
}
