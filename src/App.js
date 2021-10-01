import Header from "./components/Layout/Header";
import Timer from "./components/Timer/Timer";
import WorkingOn from "./components/WorkingOn/WorkingOn";
import classes from "./App.module.css";
import Tasks from "./components/Tasks/Tasks";

function App() {
  return (
    <>
      <Header></Header>
      <main className={classes["main-app"]}>
        <Timer></Timer>
        <WorkingOn />
        <Tasks />
      </main>
    </>
  );
}

export default App;
