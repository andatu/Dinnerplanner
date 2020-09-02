import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";


class Printout extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING"
    };
  }

  render() {
    let dishes=null;
      dishes=(
      <div className='Printout'>
        <div className='h2'>
          <div className='left'>
            My Dinner: {modelInstance.numOfG} people
          </div>
          <Link to='search'>
          <button className="back-btn right">Go back and edit dinner</button>
          </Link>
        </div>

  {
      modelInstance.getFullMenu().map((dish) =>(
      <div className='wrapper'>
        <figure className='fig1'>
          <img className='img' src={dish.image}/>
          <figcaption>
            <h3>{dish.title}</h3>
            {
              dish.extendedIngredients.map((ings) =>[
              Number((ings.measures.metric.amount).toFixed(1)),' ',
              (ings.measures.metric.unitShort),' ', (ings.name)]
            )
          }
            </figcaption>
            </figure>
            <br/>
            <div className='prep1'>
              <b>Preparations</b>
              <br/> {dish.instructions}
            </div>
            <br/>
      </div>
          ))}
      </div>);

    return dishes;
  }
}
export default Printout
