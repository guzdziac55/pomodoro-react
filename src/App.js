import Header from "./components/Layout/Header";
import Timer from "./components/Timer/Timer";
import WorkingOn from "./components/WorkingOn/WorkingOn";
import classes from "./App.module.css";
import Tasks from "./components/Tasks/Tasks";
import TaskListProvider from "./store/TaskListProvider";
import ConfigProvider from "./store/ConfigProvider";
import TimerProvider from "./store/TimerProvider";
// header: settings time
// main: taskList , currentTime, t

// timeBottomCalculate => after add / edit / timerEnd Active

function App() {
  return (
    <ConfigProvider>
      <TaskListProvider>
        <TimerProvider>
          <Header></Header>
          <main className={classes["main-app"]}>
            <Timer></Timer>
            <WorkingOn />
            <Tasks />
          </main>
        </TimerProvider>
      </TaskListProvider>
    </ConfigProvider>
  );
}

export default App;

//     <WorkingOn />    === ctx.active => Active.title
