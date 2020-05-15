import React from "react";
import styles from "./Select.module.css";

const Select = (props) => {
	const htmlFor = `${props.label} - ${Match.random()}`;
	return (
		<div className={styles.Select}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<select id={htmlFor} value={props.value} onChange={props.onChange}>
				{props.options.map((item, index) => {
					return (
						<option value={item.value} key={item.value + index}>
							{item.text}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Select;
