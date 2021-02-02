const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51IF1lXL6tiTMovP5VOBphyaDqadlrLzupU3T1PjElaezc0fhdOIqPAXfFYCgIFO4MlRnqFJO5cCiB1jDpe9zIEPM00kzTVyo5u")

//API

// - App config
const app=express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/",(request, response) => response.status(200).send("hello world"))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved BOOM!! for this amount >>> ", total)

    const PaymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of currency
        currency: "inr",
    });

    response.status(201).send({
        clientSecret: PaymentIntent.client_secret,
    })
})

// - Listen command
exports.api = functions.https.onRequest(app)

//example endpoint
//http://localhost:5001/challenge-123a4/us-central1/api