import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./QuizList.module.css";

class QuizList extends Component {
	renderQuizes() {
		return [1, 2, 3].map((item, index) => {
			return (
				<li key={index}>
					<NavLink to={"/quiz/" + item}>Тест {item}</NavLink>
				</li>
			);
		});
	}

	render() {
		return (
			<div className={styles.QuizList}>
				<div>
					<h1>Список тестов</h1>
					<ul>{this.renderQuizes()}</ul>
				</div>
			</div>
		);
	}
}

export default QuizList;
