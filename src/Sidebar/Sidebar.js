import React, { Component } from "react";
import "./Sidebar.css";
import modelInstance from "../data/DinnerModel";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    modelInstance.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  toDetails(){

  }

  render() {
    return (
      <div className="Sidebar">
      <label htmlFor='toggle'>
        <div>&#9776;</div>
      </label>
      <input type='checkbox' id='toggle'></input>
      <div className='innerCont'>
        <div id='head'>
          <form>
            <center>My Dinner<br/>people:
              <input
                type="number"
                value={this.state.numberOfGuests}
                onChange={this.onNumberOfGuestsChanged}
                />
            </center>
          </form>
          <div className='area-gray'>
            <div>
              <div style={{float:'left'}}>
                Dish Name:
              </div>
              <div style={{float:'right'}}> Cost SEK</div>
            </div>
          </div>
        </div>
        <div id='mid'>
          {modelInstance.getFullMenu().map((dish)=>
          <div style={{height:'40px'}}>
            <div style={{float:'left'}}>
             <Link to={'/details/' + dish.id} Key={dish.id}>
              <button className='buttons-img' id='dish.id'>
              {dish.title}
              </button>
              </Link>
            </div>
            <div style={{float:'right'}}>
              {Math.round(dish.pricePerServing*this.props.model.numOfG)}
            </div>
          </div>)}
        </div>
        <br/>
        <div id='create'>
          <center>
            <div style={{float:'right'}}>
              SEK <output>{Math.round(modelInstance.getTotalMenuPrice())}</output>
            </div>
            <br/>
            <Link to='/overview'>
            <button className='button' id='confirm-din'>
              Confirm Dinner
            </button>
            </Link>
          </center>
        </div>
      </div>
      </div>
    );
  }
}

export default Sidebar;
