const validateId = require('../utils/validateId');
const db = require('../models');
const messages = require('../utils/messages');

module.exports = {
      /**
   * Create meals
   * @param {object} req
   * @param {object} res
   * 
   * @returns {object} req, res
   */
  create(req, res) {
      const {mealname,price,category,image,description,review} = req.body;
      return db.menu
      .create({
        mealname,
        price,
        category,
        image,
        description,
        review,
      })
      .then(() => res.status(201).send({
        message: 'Sussefully added'
      }))
      .catch((error) => {
        const errorMessage = error.errors.map(value => value.message);
        return res.status(400).send(errorMessage);
      });
  },
   /**
   * List all meals
   * @param {string} req
   * @param {string} res
   * 
   * @returns {object} req, res
   */
  list(req, res) {
    // find all meals
    return db.menu
    .findAll({})
    .then((menus) => {
      if (menus.lenght === 0) {
        return res.status(200).send({
          message: messages.nomenus
        });
      }
      res.status(200).send(menus);
    })
    .catch((error) => {
      res.status(500).send({
        message: messages.generalError,
        error
      });
    });
  },
    /**
   * List a meal
   * @param {string} req
   * @param {string} res
   * 
   * @returns {object} req, res
   */
   listAMeal(req, res) {
     const returnedId = validateId.validate(req.params.id);
     if (isNaN(returnedId)) {
       return res.status(400).send({
         message: messages.invalidId
       }); 
      }
      // Find one menus
      return db.menus
      .findById(returnedId)
      .then((menus) => {
        if (!menus) {
          return res.status(404).send({
            message: messages.notMealFound
          });
        }
        res.status(200).send(menus);
      })
      .catch((error) => {
        res.status(500).send({
          message: messages.generalError,
          error
        });
      });
   },
   /**
   * Update menu
   * @param {string} req
   * @param {string} res
   * 
   * @returns {object} req, res
   */
  update(req, res) {
    const {mealname,price,category,image,description,review} = req.body;
    const returnedId = validateId.validate(req.params.menuId);
    if (isNaN(returnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      });
    }
    // update menus
    return db.menu
    .findById(returnedId)
    .then((menus) => {
      if (!books) {
        return res.status(404).send({
          message: messages.notMealFound,
        });
      }
      menus.update({mealname,price,category,image,description,review,})
      .then(() => res.status(200).send(menus))
      .catch((error) => {
        const errorMessage = error.errors.map(value =>  value.message);
        return res.status(400).send(errorMessage);
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Menu cannot be updated',
        error
      });
    });
  },

    /**
   * Delete Book
   * @param {string} req
   * @param {string} res
   * 
   * @returns {object} req, res
   */
  deleteMenu(req, res) {
    const returnedId = validateId.validate(req.params.menuId);
    if (isNaN(returnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      });
    }
    return db.menu
    .findById(returnedId)
    .then((menus) => {
      if (!menus) {
      return res.status(200).send({
        message: messages.notMealFound
      });
    }
    menus.destroy()
    .then(() => res.status(204).send({
      message: 'Menu has been Deleted'
    }))
    .catch(error => res.status(400).send({
      message: 'Menu could not be deleted'
    }));
  })
  .catch(error => res.status(500).send({
    message: messages.generalError,
    error
  }));
  },
    /**
   * Borrow Book
   * @param {string} req
   * @param {string} res
   * 
   * @returns {object} req, res
   */
  addToCart(req, res) {
    const returnedId = validateId.validate(req.body.menuId);
    const userReturnedId = validate(req.params.userId);
    if (isNaN(returnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      });
    }
    if (isNaN(userReturnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      })
      .catch((error) => {
        res.status(404).send({
          message: 'Purchased menu could not be found',
          error
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: messages.generalError,
          error
        });
      });
  }
  },
    /**
 * List all menu added to cart by user
 * @param {string} req
 * @param {string} res
 * 
 * @returns {object} req, res
 */

 listAllMealsAddedToCart(req, res) {
   const userReturnedId = validateId.validate(req.params.userId);
   if (isNaN(userReturnedId)) {
     return res.status(400).send({
       message: messages.invalidId
     });
   }
   // find all menu
   return db.PurchasedMenu
   .findAll({
     where: {
       userId: userReturnedId
     },
     include: [{
       model: db.menu,
     },
    {
      model: db.category
    }
  ],
   })
   .then((PurchasedMenu) => {
     if (PurchasedMenu.lenght === 0) {
       return res.status(200).send({
         message: messages.outOfFood
       });
     }
     res.status(200).send(PurchasedMenu);
   })
   .catch((error) => {
     res.status(400).send({
       message: messages.generalError,
       error
     });
   });
 },

   /**
       * List all menu purchased
       * @param {string} req
       * @param {string} res
       * 
       * @returns {object} req, res
       */
      adminListPurchasedMenu(req, res) {
        // admin list menu purchased 
        return db.PurchasedMenu
        .findAll({
          where: {
            purchased: true,
          },
          include: [{
            model: db.menu,
          },
          {
            model: db.category
          }
        ],
        })
        .then((menus) => {
          if (menus.length === 0) {
            return res.status(200).send({
              message: messages.outOfFood
            });
          }
          res.status(200).send(menus);
        })
        .catch((error) => {
          res.status(500).send({
            message: messages.generalError,
            error
          });
        });
      },

  /**
       * List all menu 
       * @param {string} req
       * @param {string} res
       * 
       * @returns {object} req, res
       */
      adminCountAllMenus(req, res) {
        return db.menu
          .findAndCountAll({})
          .then((menus) => {
            res.status(200).send(menus);
          })
          .catch((error) => {
            res.status(500).send({
              message: messages.generalError,
              error
            });
          });
      },

      adminCountCategory(req, res) {
        return db.Category
          .findAndCountAll({})
          .then((category) => {
            res.status(200).send({
              count: category.count
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: messages.generalError,
              error
            });
          });
      },
      adminCreateCategory(req, res) {
        return db.Category
          .create({
            category: req.body.category
          })
          .then((category) => {
            res.status(201).send(category);
          })
          .catch((error) => {
            const errorMessage = error.errors.map(value => value.message);
            return res.status(400).send(errorMessage);
          });
      },
      adminGetCategory(req, res) {
        return db.Category
          .findAll({})
          .then((category) => {
            res.status(200).send(category);
          })
          .catch((error) => {
            res.status(500).send({
              message: messages.generalError,
              error
            });
          });
      },
}