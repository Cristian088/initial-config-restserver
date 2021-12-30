const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/configdb");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.routerPath = {
      authRouterPath     : '/api/auth',
      categoryRouterPath : '/api/category',
      findRouterPath : '/api/find',
      productRouterPath     : '/api/product',
      userRouterPath     : '/api/users'
    }
    
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
    this.app.use(this.routerPath.authRouterPath, require('../routes/authRouter'));
    this.app.use(this.routerPath.categoryRouterPath, require('../routes/categoryRouter'));
    this.app.use(this.routerPath.findRouterPath, require('../routes/findRouter'));
    this.app.use(this.routerPath.productRouterPath, require('../routes/productRouter'));
    this.app.use(this.routerPath.userRouterPath, require('../routes/userRouter'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
