/* import React, { useState } from "react";
import TypeButtons from "./TypeButtons";

export default function Questions({ handleClick }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // lift this state to app.js? if we want to connect our button components, they need to pass a function, which needs to know setpokemondata
  const Questions = [
    {
      questionText: "What type is your Pokemon?",
      answerOptions: [
        //can I pass buttons here? Then i could pass them the functions.
        { answerText: "Fire", isCorrect: false },
        { answerText: "Water", isCorrect: false },
        { answerText: "Ice", isCorrect: true },
        { answerText: "Grass", isCorrect: false },
      ],
    },
    {
      questionText: "What is your Pokemon weak to?",
      answerOptions: [
        { answerText: "Ice", isCorrect: false },
        { answerText: "Ice", isCorrect: false },
        { answerText: "Ice", isCorrect: false },
        { answerText: "Ice", isCorrect: true },
      ],
    },
  ];
  const handleAnswerOptionClick = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };
  return (
    <div>
      <div className="question-text">
        {Questions[currentQuestion].questionText}
      </div>
    </div>
  );
}

/* {
  questionText: "What is your Pokemon weak to?",
  answerOptions: <TypeButtons handleClick={filterWeakness} />,
}, */

/* MAY DELETE */
