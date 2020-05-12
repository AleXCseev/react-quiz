import React, { Component } from "react";
import styles from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
	state = {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		answerState: null,
		quiz: [
			{
				question: "Какого цвета небо?",
				rightAnswer: 2,
				id: 1,
				answers: [
					{
						text: "Черный",
						id: 1,
					},
					{
						text: "Синий",
						id: 2,
					},
					{
						text: "Красный",
						id: 3,
					},
					{
						text: "Зеленый",
						id: 4,
					},
				],
			},
			{
				question: "В каком году закончилась ВОВ?",
				rightAnswer: 3,
				id: 2,
				answers: [
					{
						text: "1944",
						id: 1,
					},
					{
						text: "1941",
						id: 2,
					},
					{
						text: "1945",
						id: 3,
					},
					{
						text: "2006",
						id: 4,
					},
				],
			},
		],
	};

	onAnswerClickHandler = (answerId) => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0];
			if (this.state.answerState[key] === "success") {
				return;
			}
		}
		const results = this.state.results;
		const question = this.state.quiz[this.state.activeQuestion];

		if (question.rightAnswer === answerId) {
			if (!results[question.id]) {
				results[question.id] = "success";
			}
			this.setState({
				answerState: {
					[answerId]: "success",
				},
				results,
			});
			const timeout = window.setTimeout(() => {
				if (this.isQuizFinished()) {
					console.log("Finished");
					this.setState({
						isFinished: true,
					});
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null,
					});
				}

				window.clearTimeout(timeout);
			}, 1000);
		} else {
			results[question.id] = "error";
			this.setState({
				answerState: {
					[answerId]: "error",
					results,
				},
			});
		}
	};

	retryHandler = () => {
		this.setState({
			activeQuestion: 0,
			answerState: null,
			isFinished: false,
			results: {},
		});
	};

	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length;
	}

	render() {
		return (
			<div className={styles.Quiz}>
				<div className={styles.QuizeWrapper}>
					<h1>Ответьте на все вопросы</h1>
					{this.state.isFinished ? (
						<FinishedQuiz
							results={this.state.results}
							quiz={this.state.quiz}
							onRetry={this.retryHandler}
						></FinishedQuiz>
					) : (
						<ActiveQuiz
							answers={this.state.quiz[this.state.activeQuestion].answers}
							question={this.state.quiz[this.state.activeQuestion].question}
							onAnswerClick={this.onAnswerClickHandler}
							quizLength={this.state.quiz.length}
							answerNumber={this.state.activeQuestion + 1}
							state={this.state.answerState}
						></ActiveQuiz>
					)}
				</div>
			</div>
		);
	}
}

export default Quiz;
