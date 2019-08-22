import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
export default function LocationItem(props) {
  const { image, title, location } = props.item;
  const user = useContext(UserContext);
  const handlelick = () => {
    user.setJobLocationSearch(location);
    props.history.push(`/jobList`);
  };
  return (
    <div onClick={handlelick}>
      <div>{image}</div>
      <h4>{title}</h4>
    </div>
  );
}
