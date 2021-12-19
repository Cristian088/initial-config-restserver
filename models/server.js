const express = require("express");
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRouterPath = '/api/users';

    //middlewares
    this.middlewares();

    //rutas de la aplicación
    this.routes();
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
    this.app.use(this.userRouterPath, require('../routes/userRouter'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
