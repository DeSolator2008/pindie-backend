const categoriesRouter = require('express').Router();
  
const findAllCategories = require('../middlewares/categories');
const sendAllCategories = require('../controllers/categories');
  
categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.post("/categories", findAllCategories, createCategory, sendCategoryCreated); 
categoriesRouter.get('/categories/:id', findCategoryById, sendCategoryById); 
categoriesRouter.put("/categories/:id", findCategoryById, updateCategories, sendCategoryUpdated);
categoriesRouter.delete("/categories/:id", checkAuth, deleteCategory, sendCategoryDeleted);   
categoriesRouter.post("/categories", findAllCategories, checkIsCategoryExists, checkEmptyName, checkAuth, createCategory, sendCategoryCreated); 
categoriesRouter.put(
    "/categories/:id",
    checkEmptyName,
    checkAuth,
    updateCategory,
    sendCategoryUpdated
  );

module.exports = categoriesRouter;