import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
      
        <p className='mid-el'> Welcome to the dinner planner React Startup code!

            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>
            Vivamus vel laoreet orci. Nullam ut iaculis diam.<br/>
            Aliquam magna nulla, congue ut elementum hendrerit, dignissim at mauris.<br/>
            Quisque ac felis sed nibh elementum euismod a sit amet arcu. Maecenas a efficitur leo.<br/>
        </p>

        <Link to="/search">
        <div className="spacing-medium">
          <center className='mid-el'>
           <button className='button'>Start planning</button>
          </center>
        </div>
        </Link>
      </div>
      );

  }
}

export default Welcome;
//import m react.createElement
/*
*/
/*
m([


  m("p", {class:"mid-el"},
    [
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      m("br"),
      "Vivamus vel laoreet orci. Nullam ut iaculis diam. ",
      m("br"),
      "Aliquam magna nulla, congue ut elementum hendrerit, dignissim at mauris. ",
      m("br"),
      "Quisque ac felis sed nibh elementum euismod a sit amet arcu. Maecenas a efficitur leo. "
    ]
  ),
  m("div", {class:"spacing-medium"}),
  m("center", {class:"mid-el"},
  m("button", {class:"button", id:"goToSearch"},
      "Create new dinner "
    ),
  ),
]
)*/
