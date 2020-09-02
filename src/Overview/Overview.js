import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";

class Overview extends Component {
  render() {
    return (
<div className='Overview'>
  <div className='h2'>
    <div className='left'>
      My dinner: {modelInstance.numOfG} people
    </div>
    <Link to='search'>
    <button className="back-btn right">Go back and edit dinner</button>
    </Link>
 </div>
<div className='overview'>
  <div className='L'>
  {
    modelInstance.getFullMenu().map((dish) =>
    <button className='button-img'>
      <img className='btn-txt' src={dish.image}/>
      <br/>
      {dish.title}
      <br/>
      <output className='op'>{(Math.round(dish.pricePerServing*modelInstance.numOfG))}
      </output>
      sek<br/>
    </button>
    )}
  </div>
  <div className='R'>
    Total: <output style={{verticalalign:"bottom"}}>
            {Math.round(modelInstance.getTotalMenuPrice())}
          </output>
    sek
  </div>
  <div className='print'>
  <Link to='/printout'>
    <button className='button' id='printo'>Print Full Recipe</button>
  </Link>
  </div>
</div>
</div>

);
}
}
export default Overview;
