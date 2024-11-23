import React, { useEffect, useState } from "react";
import axios from "axios";
import ToggleButton from "./components/ToggleButton";
import "./App.css";

// Helper function to convert numbers to words (1 => "one", 2 => "two", etc.)
const toWord = (num) => {
  const words = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "twenty-one",
    "twenty-two",
    "twenty-three",
    "twenty-four",
    "twenty-five",
    "twenty-six",
    "twenty-seven",
    "twenty-eight",
    "twenty-nine",
    "thirty",
    "thirty-one",
    "thirty-two",
    "thirty-three",
    "thirty-four",
    "thirty-five",
    "thirty-six",
    "thirty-seven",
    "thirty-eight",
    "thirty-nine",
    "forty",
    "forty-one",
    "forty-two",
    "forty-three",
    "forty-four",
    "forty-five",
    "forty-six",
    "forty-seven",
    "forty-eight",
    "forty-nine",
    "fifty",
    "fifty-one",
    "fifty-two",
    "fifty-three",
    "fifty-four",
    "fifty-five",
    "fifty-six",
    "fifty-seven",
    "fifty-eight",
    "fifty-nine",
    "sixty",
    "sixty-one",
    "sixty-two",
    "sixty-three",
    "sixty-four",
    "sixty-five",
    "sixty-six",
    "sixty-seven",
    "sixty-eight",
    "sixty-nine",
    "seventy",
    "seventy-one",
    "seventy-two",
    "seventy-three",
    "seventy-four",
    "seventy-five",
    "seventy-six",
    "seventy-seven",
    "seventy-eight",
    "seventy-nine",
    "eighty",
    "eighty-one",
    "eighty-two",
    "eighty-three",
    "eighty-four",
    "eighty-five",
    "eighty-six",
    "eighty-seven",
    "eighty-eight",
    "eighty-nine",
    "ninety",
    "ninety-one",
    "ninety-two",
    "ninety-three",
    "ninety-four",
    "ninety-five",
    "ninety-six",
    "ninety-seven",
    "ninety-eight",
    "ninety-nine",
    "hundred",
  ];

  if (num >= 1 && num <= 100) {
    return words[num - 1];
  }
  return ""; // Return an empty string for invalid numbers
};

// Sequences
const sequence1 = Array.from(
  { length: 100 },
  (_, i) => `${toWord(i + 1)}10234`
);
const sequence2 = Array.from(
  { length: 100 },
  (_, i) => `${toWord(i + 1)}527287`
);
const sequence3 = Array.from(
  { length: 100 },
  (_, i) => `${toWord(i + 1)}12345`
);

const App = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    // Fetch initial number states from the backend
    axios
      .get("https://level-1toh.onrender.com/api/numbers")
      .then((response) => {
        if (Array.isArray(response.data)) {
          // Set the numbers state with the data fetched from the backend
          setNumbers(response.data);
        } else {
          console.error("Invalid response format", response.data);
          setNumbers([]);
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleToggle = (number, currentColor) => {
    const newColor = currentColor === "white" ? "red" : "white";

    // Optimistically update the frontend state
    setNumbers((prev) =>
      prev.map((num) =>
        num.number === number ? { ...num, color: newColor } : num
      )
    );

    // Update the backend with the new color
    axios
      .post("https://level-1toh.onrender.com/api/numbers", { number, color: newColor })
      .then((response) => {
        console.log(response.data.message); // Log the response (optional)

        // After successfully updating the backend, re-fetch the numbers
        axios
          .get("https://level-1toh.onrender.com/api/numbers")
          .then((response) => {
            if (Array.isArray(response.data)) {
              // Set the numbers state with the latest data from the backend
              setNumbers(response.data);
            } else {
              console.error("Invalid response format", response.data);
            }
          })
          .catch((err) => console.error("Error fetching updated data:", err));
      })
      .catch((err) => {
        console.error("Error updating color:", err);
        // If the API fails, revert the frontend change
        setNumbers((prev) =>
          prev.map((num) =>
            num.number === number ? { ...num, color: currentColor } : num
          )
        );
      });
  };

  const generateNumberButtons = (sequence, sequenceId) => {
    return sequence.map((number, index) => {
      // Check the current state of each number (whether red or white)
      const state = numbers.find((num) => num.number === number) || {
        color: "white",
      };

      return (
        <ToggleButton
          key={`${number}-${sequenceId}-${index}`} // Unique key to avoid React warnings
          number={number}
          color={state.color}
          onClick={() => handleToggle(number, state.color)} // Toggle color on click
        />
      );
    });
  };

  return (
    <div className="app-container">
      <h1>White = LV1 Red = LV2</h1>
      <h1></h1>
      <h2>Sequence 1 (one10234 to hundred10234)</h2>
      <div className="grid-container">
        {generateNumberButtons(sequence1, 1)}
      </div>

      <h2>Sequence 2 (one527287 to hundred527287)</h2>
      <div className="grid-container">
        {generateNumberButtons(sequence2, 2)}
      </div>

      <h2>Sequence 3 (one12345 to hundred12345)</h2>
      <div className="grid-container">
        {generateNumberButtons(sequence3, 3)}
      </div>
    </div>
  );
};

export default App;
