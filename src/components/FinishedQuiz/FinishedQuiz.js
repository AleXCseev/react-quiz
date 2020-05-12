import React from "react";
import styles from "./FinishedQuiz.module.css";
import Button from "../UI/Button/Button";

const FinishedQuiz = (props) => {
	const successCount = Object.keys(props.results).reduce((total, key) => {
		if (props.results[key] === "success") {
			total++;
		}

		return total;
	}, 0);

	return (
		<div className={styles.FinishedQuiz}>
			<ul>
				{props.quiz.map((item, index) => {
					const cls = [
						"fa",
						props.results[item.id] === "error" ? "fa-times" : "fa-check",
						styles[props.results[item.id]],
					];

					return (
						<li key={index}>
							<strong>{index + 1}</strong>. &nbsp;
							{item.question}
							<i className={cls.join(" ")}></i>
						</li>
					);
				})}
			</ul>
			<p>
				Правильно {successCount} из {props.quiz.length}
			</p>
			<div>
				<Button onClick={props.onRetry} type="primary">
					Повторить
				</Button>
				<Button onClick={props.onRetry} type="success">
					Перейти в список тестов
				</Button>
			</div>
		</div>
	);
};

export default FinishedQuiz;
