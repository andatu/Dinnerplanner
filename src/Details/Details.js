import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";
import Sidebar from '../Sidebar/Sidebar';

class Details extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      dishid: props.match.params.dishId,
    };
  this.updateMenu= this.updateMenu.bind(this);
  }
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render

   modelInstance.getDish(this.state.dishid).then(response=>this.theDish=response).then(() =>{

        this.setState({
          status: "LOADED"
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
console.log('the dish'+ this.theDish);

  }

updateMenu(){

//  modelInstance.getDish(this.state.dishid).then(response => modelInstance.addDishToMenu(response));
modelInstance.addDishToMenu(this.theDish);
}
  render() {

    let dishes=null;
    switch (this.state.status) {
      case 'LOADED':
      dishes= (
        <div id='det' className='details'>
              <div id='ul'>
                <div className='fsize'>
                  <h2 id='dish-title'>{this.theDish.title}</h2><br/>
                  <img src={this.theDish.image}/><br/>
                  <Link to={'/search'}>
                  <button className='button' id='back'>Back to search</button>
                  </Link>
                </div>
              </div>
              <div className='ingred' id='ur'>
                <div id='head'>ingredients for {modelInstance.numOfG} people</div>
                <div id='amount'>
                {
                  this.theDish.extendedIngredients.map((ings) => ([
                    Number((ings.measures.metric.amount * modelInstance.numOfG).toFixed(1)), ' ', (ings.measures.metric.unitShort)]),
                    )
                }
                </div>
                <div id='desc'>
                  {
                    this.theDish.extendedIngredients.map((ings) =>
                      ings.name
                    , <br/>, <br/>)
                  }
                </div>
                <div id='adds'>
                  <div>
                    <button onClick={this.updateMenu} className='buttonss-img' id='arm'>
                      Add/remove to Menu
                    </button>
                  </div>
                </div>
                <div id='totprice'>
                  <div className='pushRight'>
                    SEK {Math.round(this.theDish.pricePerServing * modelInstance.numOfG)}
                  </div>
                </div>
              </div>
              <div id='l'>
                <h3>Preparation</h3>
                {this.theDish.instructions}
              </div>
            </div>

      );

        break;
      default:

    }

return (<div className='DetailswS'>
  {dishes}
  <Sidebar model={modelInstance}/>
  </div>);
  }
}

export default Details;
