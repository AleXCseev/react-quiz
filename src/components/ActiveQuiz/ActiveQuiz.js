import React from "react";
import styles from "./ActiveQuiz.module.css";
import AnswersList from "./AnswersList/AnsversList";

const ActiveQuiz = (props) => {
	return (
		<div className={styles.ActiveQuiz}>
			<p className={styles.Question}>
				<span>
					<strong>2.</strong>&nbsp; Как дела?
				</span>
				<small>4 из 12</small>
			</p>

			<AnswersList answers={props.answers}></AnswersList>
		</div>
	);
};

export default ActiveQuiz;
