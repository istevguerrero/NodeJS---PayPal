import axios from "axios"
import { paypalAPI, paypalClient, paypalSecret, hostSever} from "../config";

export const createOrder = async (req, res) => {
    try {
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "727"
                    },
                    description: "Test product",
                }
            ],
            application_context: {
                brand_name: "Test Store",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `${hostSever}/capture-order`,
                cancel_url: `${hostSever}/cancel-order`
            },
        };
        
        const params = new URLSearchParams()
    
        params.append("grant_type", "client_credentials");
    
        const {data: {access_token}} = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", 
        
        params,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
                username: paypalClient,
                password: paypalSecret,
            }
        })
    
        console.log(access_token)
    
        const response = await axios.post(`${paypalAPI}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        res.json(response.data)
        
    } catch (error) {
        return res.status(500).send("Something goes wrong");
    }

};

export const captureOrder = async (req, res) => {

    const {token, PayerID} = req.query;

    const response = await axios.post(`${paypalAPI}/v2/checkout/orders/${token}/capture`, {}, {

        auth: {
            username: paypalClient,
            password: paypalSecret,
        }

    })

    console.log(response.data)

    res.send("Capturing order")
}

export const cancelOrder = (req, res) => {
    res.send("Canceling order")
}