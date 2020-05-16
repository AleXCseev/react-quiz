import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./QuizList.module.css";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {
    state = {
        quizes: [],
        loading: true,
    };
    renderQuizes() {
        return this.state.quizes.map((item) => {
            return (
                <li key={item.id}>
                    <NavLink to={"/quiz/" + item.id}>{item.name}</NavLink>
                </li>
            );
        });
    }

    async componentDidMount() {
        try {
            const response = await axios.get("quizes.json");
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`,
                });
            });

            this.setState({
                quizes,
                loading: false,
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className={styles.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {this.state.loading ? (
                        <Loader></Loader>
                    ) : (
                        <ul>{this.renderQuizes()}</ul>
                    )}
                </div>
            </div>
        );
    }
}

export default QuizList;
