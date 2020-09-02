import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import Details from "./Details/Details";
import Overview from "./Overview/Overview";
import Printout from "./Printout/Printout";
import Sidebar from "./Sidebar/Sidebar";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner",
      dish: 1
    };

    let menu = JSON.parse(localStorage.getItem('menu'))
    modelInstance.menu =  menu ? menu : [];
    modelInstance.setNumberOfGuests(localStorage.getItem('guests'));

  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>
          </header>
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <div className='remainder'>
              <Sidebar model={modelInstance}/>
              <SelectDish />
                          </div>} //SelectDish
          />
          <Route exact path='/details/:dishId'
          component={Details}
          //<Sidebar model={modelInstance}/>
          //render={()=> <Details model={modelInstance}/>}

          />
          <Route path='/overview'
            render={()=> <Overview model={modelInstance}/>}
          />

          <Route path='/printout'
            render={()=> <Printout model={modelInstance}/>}
          />

      </div>
    );
  }
}

export default App;
