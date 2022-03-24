import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
        <Routes>
          <Route path="/" element={<HomeScreen />} exact></Route>
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
