import React from "react";
import CategoryItem from "./CategoryItem";
import { IconContext } from "react-icons";
import { MdDesktopMac } from "react-icons/md";
import { MdSchool } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { MdDirectionsBike } from "react-icons/md";
import { MdLooks } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";

const ITIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdDesktopMac />
  </IconContext.Provider>
);
const scinceIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdSchool />
  </IconContext.Provider>
);
const realEstateIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdAccountBalance />
  </IconContext.Provider>
);
const sportIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdDirectionsBike />
  </IconContext.Provider>
);
const designIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdLooks />
  </IconContext.Provider>
);
const allCategoriesIcon = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdMoreHoriz />
  </IconContext.Provider>
);

const jobCategoryItems = [
  { id: 0, image: ITIcon, title: "IT", category: "IT" },
  { id: 1, image: scinceIcon, title: "Science", category: "Science" },
  {
    id: 2,
    image: realEstateIcon,
    title: "Real estate",
    category: "RealEstate"
  },
  { id: 3, image: sportIcon, title: "Sport", category: "Sport" },
  { id: 4, image: designIcon, title: "Design", category: "Design" },
  { id: 5, image: allCategoriesIcon, title: "All categories", category: "All" }
];

export default function CategoryList(props) {
  const items = jobCategoryItems.map(item => {
    return <CategoryItem history={props.history} key={item.id} item={item} />;
  });
  return <div className="category">{items}</div>;
}
