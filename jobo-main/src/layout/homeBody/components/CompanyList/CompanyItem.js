import React from "react";
function CompanyItem(props) {
  const { image, title, company } = props.item;
  const handlelick = () => {
    props.history.push(`company/${company}`);
  };
  return (
    <div onClick={handlelick}>
      <div>{image}</div>
      <h4>{title}</h4>
    </div>
  );
}

export default CompanyItem;
