import React from "react";
import CompanyItem from "./CompanyItem";
import { IconContext } from "react-icons";
import { MdAcUnit } from "react-icons/md";
import { MdMood } from "react-icons/md";
import { MdFreeBreakfast } from "react-icons/md";
import { MdSpa } from "react-icons/md";
import { MdLocalGroceryStore } from "react-icons/md";
import { MdLocalPizza } from "react-icons/md";

const blidstornIcon = (
  <IconContext.Provider value={{ color: "#ec7474" }}>
    <MdAcUnit />
  </IconContext.Provider>
);
const moodyIcon = (
  <IconContext.Provider value={{ color: "#c2d438" }}>
    <MdMood />
  </IconContext.Provider>
);
const starmoonIcon = (
  <IconContext.Provider value={{ color: "#4cb541" }}>
    <MdFreeBreakfast />
  </IconContext.Provider>
);
const spanicoIcon = (
  <IconContext.Provider value={{ color: "#1d477d" }}>
    <MdSpa />
  </IconContext.Provider>
);
const grocoroIcon = (
  <IconContext.Provider value={{ color: "#822e0c" }}>
    <MdLocalGroceryStore />
  </IconContext.Provider>
);
const pizzanaIcon = (
  <IconContext.Provider value={{ color: "#f7860d" }}>
    <MdLocalPizza />
  </IconContext.Provider>
);

const jobCategoryItems = [
  {
    id: 0,
    image: blidstornIcon,
    title: "Blidstorn",
    company: "84f1363rGFCYpJWzSzqw"
  },
  { id: 1, image: moodyIcon, title: "Moody", company: "V8KUxBRKkfEXhnKM3Jsc" },
  {
    id: 2,
    image: starmoonIcon,
    title: "Starmoon",
    company: "ZRuMtuyq3ekEQqsP5RfD"
  },
  {
    id: 3,
    image: spanicoIcon,
    title: "Spanico",
    company: "Qv9RPEXNDwqs2ZzipZHm"
  },
  {
    id: 4,
    image: grocoroIcon,
    title: "Grocoro",
    company: "dHtNOdxIhwRPJiQeTM4R"
  },
  {
    id: 5,
    image: pizzanaIcon,
    title: "Pizzana",
    company: "1HdKoMGzJqiZElLZhx1q"
  }
];

export default function CompanyList(props) {
  const items = jobCategoryItems.map(item => {
    return <CompanyItem {...props} key={item.id} item={item} />;
  });
  return <div className="category">{items}</div>;
}
