import "./App.css";
import Header from "./components/Layout/Header";
import Timer from "./components/Timer/Timer";
import WorkingOn from "./components/WorkingOn/WorkingOn";

function App() {
  return (
    <>
      <Header></Header>
      <main>
        {/* Będzie potrzebny chyba jeszcze main timer */}
        {/* chodzi o rodzica do propsów */}
        <Timer></Timer>
        <WorkingOn></WorkingOn>
      </main>
    </>
  );
}

export default App;
