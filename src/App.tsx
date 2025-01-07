import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInput from "./components/SearchInput";

const App: React.FC = () => {
  return (
    <div className="text-center mt-12">
      <h1 className="text-4xl font-bold">Medical Recommendations Demo</h1>
      <SearchInput />
      <ToastContainer />
    </div>
  );
};

export default App;
