import Header from "./components/Layout/Header";
import Timer from "./components/Timer/Timer";
import WorkingOn from "./components/WorkingOn/WorkingOn";
import classes from "./App.module.css";
import Tasks from "./components/Tasks/Tasks";
import TaskListProvider from "./store/TaskListProvider";
// header: settings time
// main: taskList , currentTime, t

// timeBottomCalculate => after add / edit / timerEnd Active

function App() {
  return (
    <TaskListProvider>
      <Header></Header>
      <main className={classes["main-app"]}>
        <Timer></Timer>
        <WorkingOn />
        <Tasks />
      </main>
    </TaskListProvider>
  );
}

export default App;

//     <WorkingOn />    === ctx.active => Active.title
