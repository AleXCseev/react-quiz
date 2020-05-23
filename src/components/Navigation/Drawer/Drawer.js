import React, { Component } from "react";
import styles from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks(links) {
    return links.map((item, index) => {
      return (
        <li key={index}>
          <NavLink
            to={item.to}
            exact={item.exact}
            activeClassName={styles.active}
            onClick={this.clickHandler}
          >
            {item.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [styles.Drawer];

    if (!this.props.isOpen) {
      cls.push(styles.close);
    }

    const links = [{ to: "/", label: "Список", exact: true }];

    console.log(this.props.isAuthentificated);

    if (this.props.isAuthentificated) {
      links.push({ to: "/quiz-creator", label: "Создать тест", exact: false });
      links.push({ to: "/logout", label: "Выйти", exact: false });
    } else {
      links.push({ to: "/auth", label: "Авторизация", exact: false });
    }

    return (
      <>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? (
          <Backdrop onClick={this.props.onClose}></Backdrop>
        ) : null}
      </>
    );
  }
}

export default Drawer;
