import React from "react";
import styles from "./AnswersList.module.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => {
	return (
		<ul className={styles.AnswersList}>
			{props.answers.map((item, index) => {
				return (
					<AnswerItem
						key={index}
						answer={item}
						onAnswerClick={props.onAnswerClick}
						state={props.state ? props.state[item.id] : null}
					></AnswerItem>
				);
			})}
		</ul>
	);
};

export default AnswersList;
