import Header from "./components/Layout/Header";
import classes from "./App.module.css";
import HookForm from "./components/SettingsApp/SettingsApp";
import { Fragment, useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { sendTaskData, fetchTaskData } from "./store/taskList-actions";

// store
import { useDispatch, useSelector } from "react-redux";

// Pages
import PomodoroApp from "./pages/PomodoroApp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// add theme
// import classes from "./styles/themes/theme.module.css";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const isChanged = useSelector((state) => state.tasksList.changed);
  const isLogged = useSelector((state) => state.auth.isLogged);

  // use it with Provider or Redux state
  const appTheme = useSelector((state) => state.ui.theme);

  // const [theme, setTheme] = useState("light");

  const [settingsShow, setSettingsShow] = useState(false);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isChanged) {
      dispatch(sendTaskData(taskList));
    }
  }, [taskList, dispatch]);

  useEffect(() => {
    dispatch(fetchTaskData());
  }, [dispatch]);

  const handleSettingsShow = () => {
    setSettingsShow(true);
  };

  const handleSettingsHide = () => {
    setSettingsShow(false);
  };

  return (
    <Fragment>
      {/* // boilerPlate with handleSettings hide go into HeaderInside It !  */}
      {settingsShow && <HookForm onClose={handleSettingsHide} />}

      <main className={`${classes["main-app"]} ${classes[`${appTheme}`]}`}>
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

          {isLogged && (
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
