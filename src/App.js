import React, { Component } from 'react';
import './App.css';
import { teamList } from './shirts';
import Product from './Product';
import ShoppingCart from './ShoppingCart';

class App extends Component {
  constructor() {
    super();
    this.state = {
      teamList: teamList,
      cart: []
    }
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  increaseQuantity(quantity, indexToChange) {
    this.setState(
      {
        teamList: this.state.teamList.map((team, index) => {
          if (index === indexToChange) {
            return {
              ...team,
              quantity: team.quantity + 1
            }
          };
          return team;
        })
      });
  }

  decreaseQuantity(quantity, indexToChange) {
    this.setState(
      {
        teamList: this.state.teamList.map((team, index) => {
          console.log(indexToChange);
          if (index === indexToChange) {
            return {
              ...team,
              quantity: team.quantity - 1
            }
          };
          return team;
        })
      });
  }

  

  addToCart(selectedTeam) {
    let cartItems = this.state.cart;
    let productID = selectedTeam.id;
    let productQty = selectedTeam.quantity;
    if (this.checkProduct(productID)) {
      console.log('hi');
      let index = cartItems.findIndex((x => x.id === productID));
      cartItems[index].quantity = Number(cartItems[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItems
      })
    } else {
      cartItems.push(selectedTeam);
      this.setState({
        cart: cartItems
      })
    }


  }

  onRemove(index) {
    this.state.cart.splice(index, 1);
    this.setState({
      cart: this.state.cart
    })
  }

  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function (item) {
      return item.id === productID;
    });
  }

  render() {
    return (
      <div>
        <header>
          <div className="navbar navbar-dark bg-dark box-shadow">
            <div className="container d-flex justify-content-between">
              <a href="" className="navbar-brand d-flex align-items-center">
                <strong>Soccer Jersey Store</strong>
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="glyphicon glyphicon-shopping-cart" data-toggle="modal" data-target="#exampleModal"><i className="fas fa-shopping-cart"></i></span>
              </button>
            </div>
          </div>
        </header>
        <br />
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Shopping Cart</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div id="shoppingCart">
                  <ShoppingCart
                    cart={this.state.cart}
                    onRemove={(index) => this.onRemove(index)}
                    />
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {
              this.state.teamList.map((team, index) => <Product
                key={team.id}
                teamPic={team.image}
                teamName={team.team}
                teamPrice={team.price}
                teamQuantity={team.quantity}
                increaseQuantity={text => this.increaseQuantity(text, index)}
                decreaseQuantity={text => this.decreaseQuantity(text, index)}
                addToCart={() => this.addToCart(team)}
                />)
            }

          </div>
        </div>
      </div>

    );
  }
}

export default App;
