import React from "react";
import MiniDrawer from "../commonComp/common/sidebar";
import ShowImages from "../commonComp/ShowImages";
import Favourites from "../commonComp/favourites";

export default function Fav() {
  return (
    <>
      <MiniDrawer name="Favourites Images">
        <Favourites />
      </MiniDrawer>
      {/* some docs */}
    </>
  );
}
