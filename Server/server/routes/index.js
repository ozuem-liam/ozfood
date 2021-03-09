import { create, login, getAll } from '../controllers/users';
import { verifyUser, verifyAdmin } from '../middlewares/auth';
import { list, listAMeal, addToCart, listAllMealsAddedToCart, create as _create, update, deleteMenu, adminCountAllMenus, adminCreateCategory, adminCountCategory, adminGetCategory } from '../controllers/menus';

export default (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the ozfoods API',
    }));

    /*
    * Users API
    */ 
    app.post('/api/v1/signup', create); // working
    app.post('/api/v1/login', login); // working
    app.get('/api/v1/meals', verifyUser, list);
    app.get('/api/v1/meals/:mealID', verifyUser, listAMeal);
    app.post('/api/v1/orders', verifyUser, addToCart);
    app.get('/api/v1/orders', verifyUser, listAllMealsAddedToCart);
    // app.put('/api/v1/orders/:orderID', authenticate.verifyUser, menuController.login);


      /**
   * Admin API
   */
  app.get('/api/v1/users', verifyUser, verifyAdmin, getAll);
  app.post('/api/v1/meals', verifyUser, verifyAdmin, _create);
  app.put('/api/v1/meals/:mealID', verifyUser, verifyAdmin, update);
  app.delete('/api/v1/meals/:mealID', verifyUser, verifyAdmin, deleteMenu);
  app.get('/api/v1/meals', verifyUser, verifyAdmin, adminCountAllMenus);
//   app.get('/api/v1/rentedbooks/history/all', authenticate.verifyUser, authenticate.verifyAdmin, menuController.adminCountAllRentedBooks);
  app.post('/api/v1/categories', verifyUser, verifyAdmin, adminCreateCategory);
  app.get('//api/v1/categories', verifyUser, verifyAdmin, adminCountCategory);
  app.get('/api/v1/categories', verifyUser, verifyAdmin, adminGetCategory);
};




