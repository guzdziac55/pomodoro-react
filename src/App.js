import Header from "./components/Layout/Header";
import classes from "./App.module.css";
import HookForm from "./components/SettingsApp/SettingsApp";
import { Fragment, useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  fetchFirebaseUserData,
  sendFirebaseTaskList,
  sendFirebaseSettings,
} from "./store/taskList-actions";
import React from "react";

// store
import { useDispatch, useSelector } from "react-redux";

// Pages
import PomodoroApp from "./pages/PomodoroApp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUpPage from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";

// firebase
import { auth } from "./firebase";
import { authActions } from "./store/auth-slice";

let isInitial = true;

function App() {
  // useSelector with function inside no w przypadku
  // select CurrentStage
  // const currentStage = useSelector(state=>selectActiveStage(state,current))
  // inside function "selectActivestage"
  //  coś podobnego
  // export const selectPostById = (state, postId) =>
  // state.posts.find(post => post.id === postId)

  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const isChanged = useSelector((state) => state.tasksList.changed);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const configSettings = useSelector((state) => state.config);

  const stage = useSelector((state) => state.timer.stage);
  const themeClasses = ["pomodoroTheme", "shortBreakTheme", "longBreakTheme"];

  const [settingsShow, setSettingsShow] = useState(false);

  // if TaskList change
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    // jeśli jakaś zmiana i zalogowany user
    if (isChanged && currentUser) {
      const userId = currentUser.uid;
      dispatch(sendFirebaseTaskList(taskList, userId)); // array
    }
  }, [taskList, dispatch]);

  // sendSettings
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isChanged && currentUser) {
      const userId = currentUser.uid;
      dispatch(sendFirebaseSettings(configSettings, userId)); // obj
    }
  }, [configSettings, dispatch]);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      dispatch(fetchFirebaseUserData(userId)); // redux thunk
    }
  }, [currentUser, dispatch]);

  // current User Change status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authActions.singUp(user)); // <=== akcja ze slice auth // przypisane tokena
      } else {
        dispatch(authActions.logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const handleSettingsShow = () => {
    setSettingsShow(true);
  };

  const handleSettingsHide = () => {
    setSettingsShow(false);
  };

  const currentTheme = themeClasses[stage];
  return (
    <Fragment>
      {/* // boilerPlate with handleSettings hide go into HeaderInside It !  */}
      {settingsShow && <HookForm onClose={handleSettingsHide} />}

      <main className={`${classes["main-app"]} ${classes[`${currentTheme}`]}`}>
        <Switch>
          <Route path="/" exact>
            <Header onShow={handleSettingsShow}></Header>
            <PomodoroApp />
          </Route>

          <Route path="/app">
            <Header onShow={handleSettingsShow}></Header>
            <PomodoroApp />
          </Route>

          {!isLogged && (
            <Route path="/login">
              <Header onShow={handleSettingsShow}></Header>
              <Login />
            </Route>
          )}

          {!isLogged && (
            <Route path="/signup">
              <Header onShow={handleSettingsShow}></Header>
              <SignUpPage></SignUpPage>
            </Route>
          )}
          {!isLogged && (
            <Route path="/reset-password">
              <Header onShow={handleSettingsShow}></Header>
              <ResetPassword></ResetPassword>
            </Route>
          )}

          {!isLogged && (
            <Route path="/profile">
              {/*  is useSelector Is logged in 
              //  render Provile */}
              {/* in !loggedin redirect do /Auth / opcja rejestracji / logowania */}
              <Header onShow={handleSettingsShow}></Header>
              <Profile />
            </Route>
          )}
          {/* jesli path inna niż wszystko to redirect na główną  */}

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
