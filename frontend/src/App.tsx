import React from "react";
import "./App.css";
import { RestaurantData } from "./components/restaurant-table/RestaurantData";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurants</h1>
      </header>
      <RestaurantData url="http://localhost:3000/api/restaurants" />
    </div>
  );
}

export default App;
