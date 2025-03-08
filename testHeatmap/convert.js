const fs = require('fs');
const csv = require('csvtojson');

const inputFile = 'san_atonio_labeled_v2.csv';  // Replace with your actual CSV filename
///Users/meghanagopu/testHeatmap/san_atonio_labeled_v2.csv
const outputFile = 'data.js';

csv()
    .fromFile(inputFile)
    .then((jsonArray) => {
        // Extract only latitude, longitude, and severity
        const filteredData = jsonArray.map(row => ({
            latitude: parseFloat(row.latitude),   // Convert to float
            longitude: parseFloat(row.longitude), // Convert to float
            severity: parseInt(row.forest_fire)// Keep as string (or parseInt(row.Severity) if numeric)
        }));

        // Convert the filtered data into a JavaScript module
        const jsContent = `const data = ${JSON.stringify(filteredData, null, 4)};\n\nexport default data;`;

        // Write the JavaScript file
        fs.writeFileSync(outputFile, jsContent, 'utf8');

        console.log(`✅ Conversion complete! Data saved in ${outputFile}`);
    })
    .catch((err) => console.error("Error converting CSV:", err));
