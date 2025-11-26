import { CostFavItems } from "../components/CostFavCards";
import PopularItem from "../components/PopularItems";
import "../styles/FavMenu.css";
function CostumersFav() {
return (
<div className="costumersFavorites">
<h1 className="menuTitle">Costumers Favorites</h1>
<div className="FavoritesList">
{CostFavItems.map((menuItem, key) => {
return (<PopularItem
key={key}
image={menuItem.image}
title={menuItem.title}
description={menuItem.description}
price={menuItem.price}
/>
);
})}
</div>
</div>
);
}

export default CostumersFav;