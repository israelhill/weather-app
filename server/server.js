let express = require('express');
let bodyParser = require('body-parser');
let mailer = require('./mailer');
let cors = require('cors');
let db = require('./database');
let weatherClient = require('./weather');

let app = express();
let port = 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// ************* ROUTES ****************

/**
 * POST: new subscription
 */
app.post('/api/v1/subscribe', (req, res) => {
    let email = req.body.email;
    let city = req.body.city;
    db.isUserAlreadySubscribed(email)
    .then((result) => {
        if(result.length === 0) {
            db.createSubscription({
                email: email,
                city: city
            })
            .then(() => {
                console.log(`Added subscription for ${email}`);
                mailer.handleNewSubscriptionRequest(email, city);
            });
            res.send({newUser: true});
        }
        else {
            console.log("Already subscribed");
            res.send({newUser: false});
        }
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));