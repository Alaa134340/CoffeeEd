import React from "react";

function PopularItem({title,description, price, image }) {
return (
<div className="menuItem">
<div style={{ backgroundImage: `url(${image})` }}> </div>
<h1> {title} </h1>
<p> {description} </p>
<p> ${price} </p>
</div>
);
}

export default PopularItem;

