import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState( { ingredients: ingredients, totalPrice: price } );
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if ( this.props.ings ) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        // ingredients={this.state.ingredients}
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    {/* <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} /> */}
                    {/* instead of using the component attribute, we'll use the render attribute so we can pass props */}
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

// since we're not dipatching anything in this Container, we don't need the constant mapDispatchToProps

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

// export default Checkout;
// here we're omitting the second parameter mapDispatchToProps
// if we need to omit the first parameter, then we set it to null: connect(null, mapDispatchToProps)
export default connect(mapStateToProps)(Checkout);