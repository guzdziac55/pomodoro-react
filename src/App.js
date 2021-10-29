import Header from "./components/Layout/Header";
import classes from "./App.module.css";
import HookForm from "./components/SettingsApp/SettingsApp";
import { Fragment, useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { fetchFirebase, sendFirebase } from "./store/taskList-actions";
import React from "react";
// import { auth } from "../firebase";

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
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const isChanged = useSelector((state) => state.tasksList.changed);
  const isLogged = useSelector((state) => state.auth.isLogged);

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
    if (isChanged && currentUser) {
      const userId = currentUser.uid;
      console.log("wysyłam dane na firebase !");
      dispatch(sendFirebase(taskList, userId));
    }
  }, [taskList, dispatch]);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      dispatch(fetchFirebase(userId));

      // fetch fiebase Settings when user Change
      // when userChange and when user is Logged in
    }
  }, [currentUser, dispatch]);

  // current User Change status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authActions.singUp(user)); // <=== akcja ze slice auth // przypisane tokena
      } else {
        dispatch(authActions.logout());
        // reset states here
        // getLocalStorage ?
      }
    });
    return unsubscribe;
  }, []);

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
            {/*  nie warto dawać do PomodoroAPP sekcji - bo nie zrobię page z samym PomodoroAPP */}
            {/* <InfoAPPSection/> */}
            {/* //  inside more modules hero > section 1 > section 2 etc  */}
            {/*  moze dawać być tam footer  */}

            {/* more info about app section */}
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
// working

{
  /* <Fragment>
{settingsShow && <HookForm onClose={handleSettingsHide} />}

<Header onShow={handleSettingsShow}></Header>
<main className={classes["main-app"]}>
  <Route path="/" exact>
    <PomodoroApp />
    <h1> main app dodatkowoa wartosc </h1>
  </Route>

  <Route path="/app">
    <PomodoroApp />
    <h1> samo app bez sekcji info </h1>
  </Route>

  <Route path="/login">
    <Login />
  </Route>
</main>
</Fragment> */
}
