import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./QuizList.module.css";
import { fetchQuizes } from "../../store/actions/quiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";

class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map((item) => {
      return (
        <li key={item.id}>
          <NavLink to={"/quiz/" + item.id}>{item.name}</NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={styles.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader></Loader>
          ) : (
            <ul>{this.renderQuizes()}</ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
