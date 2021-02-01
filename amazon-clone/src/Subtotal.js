import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import "./Subtotal.css";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
    const history = useHistory();
    const [{basket}, dispatch] = useStateValue();
    var i;
    var price=0;
    for (i=0; i<basket.length ;i++) {
        price+=basket[i].price
    };

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button onClick={e => history.push("/payment")}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;
