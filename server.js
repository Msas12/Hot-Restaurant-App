//SERVER

// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Possible Constant for them to enter information?????? Not sure......winging it....
const tables = []

const waitlist = []

//Possible Constant for them to enter information?????? Not sure......winging it....
const reservations = [{
    customerName: '',
    phoneNumber: '',
    customerEmail: '',
    customerId: '',
}]

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));

// Displays all characters.......don't know if this would be used for showing the waitlist or the tables.......how to manipulate???????
app.get('/api/tables', (req, res) => res.json(tables));
app.get('/api/waitlist', (req, res) => res.json(waitlist));

// Displays a single table, or returns false
app.get('/api/tables/:table', (req, res) => {
    const chosen = req.params.table;

    console.log(chosen);

    /* Check each character routeName and see if the same as "chosen"
     If the statement is true, send the character back as JSON,
     otherwise tell the user no character was found */

    for (let i = 0; i < tables.length; i++) {
        if (chosen === tables[i].routeName) {
            return res.json(tables[i]);
        }
    }

    return res.json(false);
});

// Displays a single reservation, or returns false
app.get('/api/reservations/:reservation', (req, res) => {
    const chosen = req.params.reservation;

    console.log(chosen);

    /* Check each character routeName and see if the same as "chosen"
     If the statement is true, send the character back as JSON,
     otherwise tell the user no character was found */

    for (let i = 0; i < reservations.length; i++) {
        if (chosen === reservations[i].routeName) {
            return res.json(reservations[i]);
        }
    }

    return res.json(false);
});

// Create New Tables - takes in JSON input
app.post('/api/tables', (req, res) => {
    console.log(req.body)
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
    const newTable = req.body;
    console.log(newTable);


    if (tables.length < 5) {
        tables.push(newTable);
    } else {
        waitlist.push(newTable)
    }
    res.json(newTable);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));