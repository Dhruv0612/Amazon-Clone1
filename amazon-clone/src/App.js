import React,{ useEffect } from "react";
import './App.css';
import Header from './Header.js';
import Home from "./Home.js";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements} from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51IF1lXL6tiTMovP53XUwPwI7wIR3hf7rJ3kMForABx4IDUazgRnqW6HSAUJEQXL9tpsH72EpPvZBxmOzduk4KGnL00MqGVuu5l");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    
    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {

        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {

        dispatch({
          type: "SET_USER",
          user: null
        })

      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        
        <Switch>
        <Route path="/login">
             <Login />
          
        </Route>
          <Route path="/checkout">
          <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
          <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
