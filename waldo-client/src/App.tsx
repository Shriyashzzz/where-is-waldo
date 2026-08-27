import "./App.css";
import "@radix-ui/themes/styles.css";
import { Header } from "./components/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Header />
      <main className="bg-sky-200 h-screen flex justify-center ">
        <Outlet />
      </main>
    </>
  );
}

export default App;
