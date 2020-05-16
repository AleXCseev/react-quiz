import React from "react";
import styles from "./ActiveQuiz.module.css";
import AnswersList from "./AnswersList/AnsversList";

const ActiveQuiz = (props) => {
  return (
    <div className={styles.ActiveQuiz}>
      <p className={styles.Question}>
        <span>
          <strong>{props.answerNumber}.</strong>&nbsp; {props.question}
        </span>
        <small>
          {props.answerNumber} из {props.quizLength}
        </small>
      </p>

      <AnswersList
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      ></AnswersList>
    </div>
  );
};

export default ActiveQuiz;
