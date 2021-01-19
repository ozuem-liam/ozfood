const usersController = require('../controllers/users');
const authenticate = require('../middlewares/auth');
const menuController = require('../controllers/menu');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the ozfoods API',
    }));

    /*
    * Users API
    */ 
    app.post('/api/v1/signup', usersController.create);
    app.post('/api/v1/login',authenticate.verifyUser, usersController.login);
    app.get('/api/v1/meals', authenticate.verifyUser, menuController.list);
    app.get('/api/v1/meals/:mealID', authenticate.verifyUser, menuController.listAMeal);
    app.post('/api/v1/orders', authenticate.verifyUser, menuController.addToCart);
    app.get('/api/v1/orders', authenticate.verifyUser, menuController.listAllMealsAddedToCart);
    // app.put('/api/v1/orders/:orderID', authenticate.verifyUser, menuController.login);


      /**
   * Admin API
   */
  app.get('/api/v1/users', authenticate.verifyUser, authenticate.verifyAdmin, usersController.getAll);
  app.post('/api/v1/meals', authenticate.verifyUser, authenticate.verifyAdmin, menuController.create);
  app.put('/api/v1/meals/:mealID', authenticate.verifyUser, authenticate.verifyAdmin, menuController.update);
  app.delete('/api/v1/meals/:mealID', authenticate.verifyUser, authenticate.verifyAdmin, menuController.deleteMenu);
  app.get('/api/v1/meals', authenticate.verifyUser, authenticate.verifyAdmin, menuController.adminCountAllMenus);
//   app.get('/api/v1/rentedbooks/history/all', authenticate.verifyUser, authenticate.verifyAdmin, menuController.adminCountAllRentedBooks);
//   app.get('/api/v1/users/books/unreturned/history', authenticate.verifyUser, authenticate.verifyAdmin, menuController.adminCountAllNotReturnedBooks);
//   app.get('/api/v1/users/books/unreturned', authenticate.verifyUser, authenticate.verifyAdmin, menuController.adminListNotReturnedBooks);
  app.post('/api/v1/categories', authenticate.verifyUser, authenticate.verifyAdmin, menuController.adminCreateCategory);
  app.get('//api/v1/categories', authenticate.verifyUser, authenticate.verifyAdmin, menuController.adminCountCategory);
  app.get('/api/v1/categories', authenticate.verifyUser, authenticate.verifyAdmin, menuController.adminGetCategory);
};



