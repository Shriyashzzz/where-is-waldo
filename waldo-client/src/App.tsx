import "./App.css";
import "@radix-ui/themes/styles.css";
import { Header } from "./components/Header";
import { Outlet } from "react-router";
import { Footer } from "./components/Footer";
function App() {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <main className="bg-[#C0D6DF] flex-1 flex justify-center ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
