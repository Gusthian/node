// jsonServer.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// IMPORTANT: Updated file name here
const jsonFilePath = path.join(__dirname, './destinations.json');
let destinationsData = []; // Changed variable name to match file name

// Load the JSON data once when the server starts
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading ${jsonFilePath}:`, err);
        process.exit(1); // Exit if the file can't be read
    }
    try {
        destinationsData = JSON.parse(data);
        console.log(`${jsonFilePath} loaded successfully.`);
    } catch (parseError) {
        console.error(`Error parsing ${jsonFilePath}:`, parseError);
        process.exit(1); // Exit if JSON is invalid
    }
});

// Route for the root path (optional, for convenience)
app.get('/', (req, res) => {
    res.send('Welcome to the Destinations JSON server! Access full data at /destinations-api, specific keys like /destinations-api/:key, or specific entries like /destinations-api/city/Uyuni.');
});

// Route to serve the full destinations.json data
app.get('/destinations-api', (req, res) => {
    if (destinationsData.length === 0) {
        return res.status(500).send(`${jsonFilePath} data not loaded or is empty.`);
    }
    res.json(destinationsData);
});

// NEW ROUTE: To access a specific value for a given key, e.g., /destinations-api/city/Uyuni
app.get('/destinations-api/:key/:value', (req, res) => {
    const requestedKey = req.params.key;   // e.g., "city"
    const requestedValue = req.params.value; // e.g., "Uyuni"

    if (destinationsData.length === 0) {
        return res.status(500).send(`${jsonFilePath} data not loaded or is empty.`);
    }

    // Filter the data to find objects where the 'key' matches the 'value'
    const results = destinationsData.filter(item => {
        // Ensure the item has the key and its value matches (case-insensitive for strings)
        if (item.hasOwnProperty(requestedKey)) {
            // If the value is a string, compare case-insensitively
            if (typeof item[requestedKey] === 'string') {
                return item[requestedKey].toLowerCase() === requestedValue.toLowerCase();
            }
            // For other types (numbers, booleans), compare directly
            return item[requestedKey] == requestedValue; // Use == for loose comparison if types might differ (e.g., "1" vs 1)
        }
        return false;
    });

    if (results.length > 0) {
        res.json(results); // Return the array of matching objects
    } else {
        res.status(404).json({ message: `No destination found for ${requestedKey} '${requestedValue}'` });
    }
});


// Existing Route: To access a specific *type* of key (e.g., all cities)
app.get('/destinations-api/:key', (req, res) => {
    const requestedKey = req.params.key;

    if (destinationsData.length === 0) {
        return res.status(500).send(`${jsonFilePath} data not loaded or is empty.`);
    }

    const result = destinationsData.map(item => item[requestedKey]).filter(value => value !== undefined);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).json({ message: `Key '${requestedKey}' not found or has no defined values in ${jsonFilePath}` });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Destinations server running at http://localhost:${PORT}`);
    console.log(`Full data: http://localhost:${PORT}/destinations`);
    console.log(`All cities: http://localhost:${PORT}/destinations-api/city`);
    console.log(`Specific city (e.g., Uyuni): http://localhost:${PORT}/destinations-api/city/Uyuni`);
    console.log(`Specific ID (e.g., 1002SA): http://localhost:${PORT}/destinations-api/id/1002SA`);
});