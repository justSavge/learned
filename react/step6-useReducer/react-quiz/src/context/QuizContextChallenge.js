import { createContext, useContext, useEffect, useReducer } from "react";

const initialValue = {
  status: "loading",
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  allowTime: null,
};
const secondQuestion = 30;
function reduce(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        allowTime: state.questions.length * secondQuestion,
      };
    case "checkAnswer":
      const question = state.questions.at(state.index);
      console.log(question.correctOption, action.payload);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initialValue,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        allowTime: state.allowTime - 1,
        status: state.allowTime === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("没有这个操作action.type");
  }
}
const QuizContext = createContext();
export function QuizContextProvider({ children }) {
  const [state, dispatch] = useReducer(reduce, initialValue);
  const { status, questions, index, answer, points, allowTime } = state;
  const questionsLength = questions.length;
  const allPoints = questions.reduce((prev, crr) => prev + crr.points, 0);
  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://127.0.0.1:4000/");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data.message.questions });
      } catch (e) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        allowTime,
        questionsLength,
        allPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export function useLJEZContext() {
  const x = useContext(QuizContext);
  if (x === undefined) {
    throw new Error("错误，没有在QuizContextProvider的子组件使用本方法");
  }
  return x;
}
