import React, { useState, useEffect } from 'react';
import '../components/App.css';

function TypingGame() {
  const [quotes, setQuotes] = useState([]);
  const [randomValues, setRandomValues] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        const randomValues = [];
        for (let i = 0; i < 10; i++) {
          let random = Math.floor(Math.random() * data.length);
          while (randomValues.includes(random)) {
            random = Math.floor(Math.random() * data.length);
          }
          randomValues.push(random);
        }
        setQuotes(data);
        setRandomValues(randomValues);
      });
  }, []);

  function startTimer() {
    setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  }

  function handleUserInput(event) {
    if (event.key === 'Enter') {
      const userInput = event.target.value;
      const currentQuote = quotes[randomValues[currentQuoteIndex]];
      const isInputCorrect = userInput === currentQuote.text;
      const timeElapsed = timer;

      if (isInputCorrect) {
        setCurrentScore((prev) => prev + 1);
        setIsPromptVisible(false);
      } else {
        setIsPromptVisible(true);
      }

      if (currentQuoteIndex === randomValues.length - 1) {
        setAverageTime(
          Math.round(
            (timeElapsed + averageTime * randomValues.length) /
              (randomValues.length + 1)
          )
        );
        setCurrentQuoteIndex((prev) => prev + 1);
      } else if (currentQuoteIndex < randomValues.length - 1) {
        setAverageTime(
          Math.round(
            (timeElapsed + averageTime * currentQuoteIndex) / (currentQuoteIndex + 1)
          )
        );
        setCurrentQuoteIndex((prev) => prev + 1);
        setTimer(0);
      }
      event.target.value = '';
    }
  }

  return (
    <div>
      <div id="quote">{quotes[randomValues[currentQuoteIndex]]?.text}</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          id="userInput"
          type="text"
          placeholder="Type the quote here"
          onKeyDown={startTimer}
          onKeyPress={handleUserInput}
        />
      </form>
      <div className={`prompt ${isPromptVisible ? 'promptVisible' : 'promptHidden'}`}>
        The input is not same as the quote
      </div>
      <div>Score: {currentScore}</div>
      <div id="time">Average Time: {averageTime}</div>
    </div>
  );
}

export default TypingGame;
