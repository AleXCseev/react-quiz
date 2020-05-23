import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout";
import { autoLogin } from "./store/actions/auth";

function App(props) {
  useEffect(() => {
    props.autoLogin();
  });

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth}></Route>
      <Route path="/quiz/:id" component={Quiz}></Route>
      <Route path="/" exact component={QuizList}></Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );

  if (props.isAutentificated) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator}></Route>
        <Route path="/quiz/:id" component={Quiz}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/" exact component={QuizList}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
  }
  return <Layout>{routes}</Layout>;
}

const mapStateToProps = (state) => {
  return {
    isAutentificated: !!state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
