require('dotenv').config();
module.exports =
{
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": "postgres",
    "password": "Hanoman44",
    "database": "asset_management_dev",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "Hanoman44",
    "database": "asset_management_prod",
    "host": "localhost",
    "dialect": "postgres"
  },
  "secret": process.env.SECRET_KEY,
  "dbUrl": process.env.DB_URL,
  "jwtExpires": process.env.JWT_EXPIRES
}
