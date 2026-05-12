import './App.css';
import WebHeader from "./components/WebHeader.jsx";
import WebFooter from "./components/WebFooter.jsx";
import { Outlet } from "react-router";

function App() {

  return (
    <>
      <WebHeader></WebHeader>

      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <WebFooter></WebFooter>
      </div>

    </>
  )
}

export default App;
