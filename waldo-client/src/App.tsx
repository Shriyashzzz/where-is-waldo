import "./App.css";
import "@radix-ui/themes/styles.css";
import { Header } from "./components/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <main className="bg-sky-200 flex-1 min-h-0 flex justify-center overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
