import React from "react";
import styles from "./Input.module.css";

function isInvalid({ valid, touched, shouldValidate }) {
	return !valid && shouldValidate && touched;
}

const Input = (props) => {
	const inputType = props.type || "text";
	const cls = [styles.Input];
	const htmlFor = `${inputType} - ${Math.random()}`;

	if (isInvalid(props)) {
		cls.push(styles.invalid);
	}

	return (
		<div className={cls.join(" ")}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				id={htmlFor}
				type={inputType}
				value={props.value}
				onChange={props.onChange}
			></input>
			{isInvalid(props) ? (
				<span>{props.errorMessage || "Введите вурное значение"}</span>
			) : null}
		</div>
	);
};

export default Input;
