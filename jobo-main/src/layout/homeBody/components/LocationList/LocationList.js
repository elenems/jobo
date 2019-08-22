import React from "react";
import LocationItem from "./LocationItem";
import { IconContext } from "react-icons";
import { MdAccountBalance } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";

const LvivIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdAccountBalance />
  </IconContext.Provider>
);
const KharkivIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdAccountBalance />
  </IconContext.Provider>
);
const KyivIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdAccountBalance />
  </IconContext.Provider>
);
const OdesaIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdAccountBalance />
  </IconContext.Provider>
);
const DniproIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdAccountBalance />
  </IconContext.Provider>
);
const allLocationsIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdMoreHoriz />
  </IconContext.Provider>
);

const jobCategoryItems = [
  { id: 0, image: LvivIcon, title: "Lviv", location: "Lviv" },
  { id: 1, image: KharkivIcon, title: "Kharkiv", location: "Kharkiv" },
  { id: 2, image: KyivIcon, title: "Kyiv", location: "Kyiv" },
  { id: 3, image: OdesaIcon, title: "Odesa", location: "Odesa" },
  { id: 4, image: DniproIcon, title: "Dnipro", location: "Dnipro" },
  {
    id: 5,
    image: allLocationsIcon,
    title: "All locations",
    location: "All country"
  }
];

export default function LocationList(props) {
  const items = jobCategoryItems.map(item => {
    return <LocationItem history={props.history} key={item.id} item={item} />;
  });
  return <div className="category">{items}</div>;
}
