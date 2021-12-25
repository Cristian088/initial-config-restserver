const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/configdb");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRouterPath = '/api/users';
    this.authRouterPath = '/api/auth';

    //connection to databases
    this.connectionDb();

    //middlewares
    this.middlewares();

    //rutas de la aplicación
    this.routes();
  }

  async connectionDb() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use( cors() )

    //MIDDLEWARE PARA RECIBIR JSON
    this.app.use( express.json() );

    // Directorio público
    this.app.use( express.static("public") );
  }

  routes() {
    this.app.use(this.authRouterPath, require('../routes/authRouter'));
    this.app.use(this.userRouterPath, require('../routes/userRouter'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
