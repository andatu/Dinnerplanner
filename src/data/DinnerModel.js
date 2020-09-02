import ObservableModel from "./ObservableModel";
import {API_KEY} from "./apiConfig"
import {ENDPOINT} from "./apiConfig"
const BASE_URL = ENDPOINT;//"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com";
const httpOptions = {
  headers: { "X-Mashape-Key": API_KEY}
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this.numOfG = 4;
    this.getNumberOfGuests();
    this.menu=[];
  }


  /*handleHTTPError(response){
    if(response.ok) return response;
    throw Error(response.statusText);
  } */

  setNumberOfGuests(num) {
    if(num <= 0){num = 1}
    this.numOfG = num;
    localStorage.setItem("guests", this.numOfG);
    this.notifyObservers({type:"numOfGUpdate", numOfG:this.numOfG});
  }

  getNumberOfGuests() {
    return this.numOfG;
  }

  //Returns the dishes that are on the menu for selected type
  getSelectedDishes(type) {
    return this.menu.filter(function (dish) {
      return (dish.dishTypes.includes(type));
    });
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    return this.menu;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    return this.menu.map((dish) => dish.extendedIngredients).flat();
  }

  //Returns the total price of the menu (price per serving of each dish multiplied by number of guests).
  getTotalMenuPrice() {
    return this.menu.reduce((sum, dish) => sum += dish.pricePerServing,0)*this.numOfG;

  }


  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  addDishToMenu(dish) {
  localStorage.removeItem('menu');
  let exists=false;
  for(let i=0; i<this.menu.length; i++){
      if(this.menu[i].id===dish.id){
        exists=true;
        this.removeDishFromMenu(dish.id);
        break;
      }
  }
  if(exists === false){
    this.menu.push(dish);
    console.log(this.menu);
    this.notifyObservers({type:"addDish", id:dish.id});
  }

  localStorage.setItem("menu", JSON.stringify(this.menu))
  console.log(this.menu);

    /*this.menu.push(dish);
    console.log(this.menu);
    this.notifyObservers({type:"addDish", id:dish.id});*/
  }

  //Removes dish with specified id from menu
  removeDishFromMenu(id) {
    this.menu = this.menu.filter(function(dish){
    return dish.id !== id;
    });
    this.notifyObservers({type:"removeDish", id:id});
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes(type, query) {

   if(type === undefined){type = "type="}
    else{type = "type="+type}
    if(query === undefined){query ="&query="}
    else{query= "&query="+query}

    const url = `${BASE_URL}recipes/search?`+type+query;
    console.log(type, query);
    return fetch(url, httpOptions).then(this.processResponse);
  }

  getDish(id) {
  const url = `${BASE_URL}recipes/${id}/information`
    return fetch(url,httpOptions).then(this.processResponse);}

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
