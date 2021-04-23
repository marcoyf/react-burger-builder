import { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from "../../store/actions/index";

// const INGREDIENT_PRICES = {
//     salad: 1.5,
//     cheese: 3.0,
//     meat: 5.5,
//     bacon: 4.5
// };

class BurgerBuilder extends Component {
  // state = {
  //     ingredients: {
  //         salad: 0,
  //         bacon: 0,
  //         cheese: 0,
  //         meat: 0
  //     },
  //     totalPrice: 4,
  //     purchasable: false, // to disable the order now button
  //     purchasing: false, // to display or hide the modal
  //     loading: false
  // }

  state = {
    // Redux will handle ingredients and totalPrice
    // ingredients: null, // fetch it from database
    // totalPrice: 4,
    // purchasable: false, // to disable the order now button
    purchasing: false, // , // to display or hide the modal
    // loading: false,
    // error: false
  };

  componentDidMount() {
    console.log(this.props);
    // axios.get('https://react-burger-builder-marcoyf-default-rtdb.firebaseio.com/ingredients.json')
    //     .then(response => {
    //         this.setState({ ingredients: response.data });
    //     })
    //     .catch(error => {
    //         this.setState({ error: true });
    //     });
    this.props.onInitIngredients();
  }

  // updatePurchaseState(ingredients) {
  //     const sum = Object.keys(ingredients)
  //         .map(igKey => {
  //             return ingredients[igKey];
  //         })
  //         .reduce((sum, el) => {
  //             return sum + el;
  //         }, 0);
  //     this.setState({ purchasable: sum > 0 });
  // }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  // all below logic will be handled by the Reducer
  // addIngredientHandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     const updatedCount = oldCount + 1;
  //     const updatedIngredients = {
  //         ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceAddition = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice + priceAddition;
  //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //     this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     // making sure we don't have negative counts
  //     if (oldCount <= 0) {
  //         return;
  //     }
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = {
  //         ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceDeduction = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceDeduction;
  //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //     this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  // purchaseContinueHandler = () => {
  //     // alert('You continue!');
  //     // this.setState( { loading: true } );
  //     // const order = {
  //     //     ingredients: this.state.ingredients,
  //     //     price: this.state.totalPrice,
  //     //     customer: {
  //     //         name: 'Marco',
  //     //         address: {
  //     //             street: 'Teststreet 1',
  //     //             zipCode: '41351',
  //     //             country: 'Brazil'
  //     //         },
  //     //         email: 'test@test.com.br'
  //     //     },
  //     //     deliveryMethod: 'fastest'
  //     // }
  //     // axios.post( '/orders.json', order )
  //     //     .then( response => {
  //     //         // setting purchasing to false so the modal is closed
  //     //         this.setState({ loading: false, purchasing: false });
  //     //     } )
  //     //     .catch( error => {
  //     //         this.setState({ loading: false, purchasing: false });
  //     //     } );

  //     //this.props.history.push('/checkout');

  //     const queryParams = [];
  //     for (let i in this.state.ingredients) {
  //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
  //     }
  //     queryParams.push('price=' + this.state.totalPrice);
  //     const queryString = queryParams.join('&');
  //     this.props.history.push({
  //         pathname: '/checkout',
  //         search: '?' + queryString
  //     });
  // }

  render() {
    // to disable the Less button
    const disabledInfo = {
      // ...this.state.ingredients
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    // checking if ingredients are already loaded from database
    // if (this.state.ingredients) {
    if (this.props.ings) {
      burger = (
        <Aux>
          {/* <Burger ingredients={this.state.ingredients} /> */}
          <Burger ingredients={this.props.ings} />
          <BuildControls
            // ingredientAdded={this.addIngredientHandler}
            ingredientAdded={this.props.onIngredientAdded}
            // ingredientRemoved={this.removeIngredientHandler}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            // purchasable={this.state.purchasable}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            // price={this.state.totalPrice} />
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          // ingredients={this.state.ingredients}
          ingredients={this.props.ings}
          // price={this.state.totalPrice}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    // if (this.state.loading) {
    //     orderSummary = <Spinner />;
    // }
    // {salad: true, meat: false, ...}
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientAdded: (ingName) =>
      dispatch(actions.addIngredient(ingName)),
    // onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

// export default withErrorHandler(BurgerBuilder, axios);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
