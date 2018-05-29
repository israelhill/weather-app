module.exports = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user: 'root',
    password: process.env.DB_PSWD || 'root',
    database: 'WeatherApp'
  }
}
