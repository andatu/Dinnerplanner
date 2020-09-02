import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";
import modelInstance from "../data/DinnerModel";
import _, { debounce } from 'lodash';

class SelectDish extends Component {
  constructor(props){
    super(props);
    this.state={
      type:undefined,
      query:undefined
    };
    this.typeUpdate= this.typeUpdate.bind(this);
    this.search=this.search.bind(this);
    this.searchStatus=React.createRef();
  }
  typeUpdate(e){
    this.setState({type: e.target.value})
    console.log('typeUpdate');
  }
  
  searchTriggered= debounce((text)=>{


      this.setState({query:text});
      this.search();

  },400);

  search(){
     this.searchStatus.current.onSearch();
  }

  render() {
    return (
    <div className="SelectDish">
        <h2>This is the Select Dish screen</h2>
        <input type='text' placeholder='Enter dish' id='sInput' onChange={e=>this.searchTriggered(e.target.value)}/>
        <select id='sSel' onChange={this.typeUpdate}>
          <option>All</option>
          <option>Appetizer</option>
          <option>Main Course</option>
          <option>Side Dish</option>
          <option>Desert</option>
        </select>
        <button className="button" id="goToDetails" onClick={this.search}>Search</button>
        {/* We pass the model as property to the Sidebar component */}

        <Dishes ref={this.searchStatus} data={this.state} id='container-sr'/>
      </div>
    );
    //this.afterRender();
  }
  afterRender(){
//  this.searchBtn=this.document.querySelector("#goToDetails");
/*  let searchBar=document.querySelector("#sInput");
  let dishType=document.querySelector("#sSel");

  this.searchBtn.addEventListener("click", () => {
    console.log('click');
    Dishes.setQuery(this.searchBar);
    Dishes.setType(this.dishType);
    this.render();
    // navigator("search");
  }); */
  }
}

export default SelectDish;
//<Sidebar model={this.props.model}/>
