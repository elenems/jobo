import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";

export default function CategoryItem(props) {
  const { image, title, category } = props.item;
  const user = useContext(UserContext);
  const handlelick = () => {
    user.setJobCategorySearch(category);
    props.history.push(`/jobList?category=${category}`);
  };
  return (
    <div onClick={handlelick}>
      <div>{image}</div>
      <h4>{title}</h4>
    </div>
  );
}
