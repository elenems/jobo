import React from "react";
import Logo from "./components/Logo";
import SearchBar from "./components/Searchbar/SearchBar";
import Navigation from "./components/Navigation/Navigation";

export default function Header(props) {
  return (
    <header style={{ background: "white" }}>
      <Logo />
      <SearchBar {...props} />
      <Navigation {...props} />
    </header>
  );
}
