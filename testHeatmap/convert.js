const fs = require('fs');
const csv = require('csvtojson');

const inputFile = 'Nevada_train_data.csv';   // Your input
const outputFile = 'Nevada_heatmap_data.js';  // ✅ NEW output file name

csv()
    .fromFile(inputFile)
    .then((jsonArray) => {
        console.log(`✅ Loaded ${jsonArray.length} rows from ${inputFile}`);
        
        const filteredData = jsonArray.map(row => ({
            latitude: parseFloat(row.latitude_weather),
            longitude: parseFloat(row.longitude_weather),
            severity: parseInt(row.target)
        }));

        const jsContent = `const data = ${JSON.stringify(filteredData, null, 4)};\n\nexport default data;`;

        fs.writeFileSync(outputFile, jsContent, 'utf8');

        console.log(`✅ Conversion complete! Data saved to ${outputFile}`);
    })
    .catch((err) => console.error("❌ Error converting CSV:", err));
