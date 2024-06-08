import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyLogIn from "./commonComp/MyLogIn";
import BasicCard from "./commonComp/cart";
import ShowImages from "./commonComp/ShowImages";
import MiniDrawer from "./commonComp/common/sidebar";
import SearchImages from "./Pages/SearchImages";
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import Favourites from "./commonComp/favourites";
import Fav from "./Pages/fav";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<BasicCard />} />
        <Route path="/searchimages" exact element={<SearchImages />} />
        <Route path="/favourites" exact element={<Fav />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
