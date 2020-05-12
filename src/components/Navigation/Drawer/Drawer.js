import React, { Component } from "react";
import styles from "./Drawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [1, 2, 3];

class Drawer extends Component {
	renderLinks() {
		return links.map((item, index) => {
			return (
				<li key={index}>
					<a href="#">Link {item}</a>
				</li>
			);
		});
	}

	render() {
		const cls = [styles.Drawer];

		if (!this.props.isOpen) {
			cls.push(styles.close);
		}
		return (
			<>
				<nav className={cls.join(" ")}>
					<ul>{this.renderLinks()}</ul>
				</nav>
				{this.props.isOpen ? <Backdrop onClick={this.props.onClose}></Backdrop> : null}
			</>
		);
	}
}

export default Drawer;