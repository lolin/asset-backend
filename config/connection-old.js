let { Pool } = require('pg')

let connection1 = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// connection.connect((error) => {
//     if (!!error) {
//         console.log(error)
//     } else {
//         console.log('Connection Successfully')
//     }
// });

module.exports = connection1;