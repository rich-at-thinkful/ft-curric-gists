# Namespacing
We've learned that **scopes** control where variables are held, how long they exist, and the nuances to how they can be visible or inaccessible. Namespacing is essentially the practice of logically grouping variables into a labeled scope. 

Take this simple example:

```
const Utils = {
  MAX_RECORDS: 1000,
  multiply: function() {},
  validate: function() {},
  purge: function() {}
};
```

The four items above could have been declared in the global scope as a constant and three function expressions. Instead, we're architecturally deciding that they're all related properties and belong grouped together in a simple object.

Going beyond a simple object, the modules you created in the last exercise are actually a form of namespacing -- our `store` is a function with its own scope that was immediately invoked and then returned an object that provides limited access into that scope. This object could be called a namespace as all the attributes and methods it exposes are grouped together.

### Exercise

Our Shopping List has been built with a lot of standalone functions and global variables. Let's refactor it to use our modules as well as utilize a more object oriented approach.

**IMPORTANT:** You should be starting from the project after completing the exercises in [Project Structure and Modules](modules.md). You can use [this repo](#) as a starting place and to check your work from the previous lesson.

Commit often!

#### 1. Item factory and validator
- In `Item.js`, declare a `validateName` function which takes `name` and `action` parameters. Throw a TypeError if `name` doesn't exist with the message: "Cannot perform {action}: Name must exist"
  - We'll run this validator any time we create an item or update its name to prevent items having blank names.
- In `Item.js`, delcare a `createItem` function which will be a Factory Function. It should take a `name` parameter.
- The function should return a new item object with the following attributes:
  - `id` - invoke `cuid()` to create a unique id
  - `name` - the value of parameter `name`
  - `checked` - defaults to `false`
- Test your module!
  - Inside `index.js`, inside the DOM ready function, add the following:
  ```
  const itemNames = [ '', 'apples', 'pears' ];
  itemNames.forEach(name => {
    try {
      Item.validateName(name);
      store.items.push(Item.createItem(name));
    } catch(error) {
      console.log('Cannot add item: ' + error.message);
    }
  });
  shoppingList.render();
  ```
  - Here, we setup an array of three names - one blank, the other two valid
  - We then run a function for each name in the array that uses try/catch to validate the name and then create an item with it
  - Assuming you wrote your `Item` functions correctly, you should see one error in the log and two shopping items in your DOM.

#### 2. Update shoppingList to use Item class
- Inside `shoppingList.js`, we're going to use our awesome new `Item` module.
- Modify the `addItemToShoppingList` function:
  - Open a try/catch block
  - Inside the try block, use `Item.validateName` to validate the input, `Item.createItem` to create an item, and push the result to `store.items`
  - Inside the catch block, just log out 'Cannot add item: {error.message}' for now (ideally you would display errors on the DOM)
- ESLint cleanliness: Notice we're no longer using the `cuid` library inside `shoppingList`, but we are using the `Item` module. Change your global definition at the top of `shoppingList` to reflect this and you should no longer have a red underline on `Item`
- Update `editListItemName` method in a similar fashion to use the validator before updating the item name.
- Test it! 
  - Your shopping list app in the web browser should be working as before, except now it won't add blank items and organizationally you're using functions in a different module to your event handler.

#### 3. Update store to create, update, delete items
- Let's add methods directly to our `store` to handle related operations. In most cases, we're replacing the excess logic in our `shoppingList` handlers. For practice, we recommend you write the functions from scratch and resist copy/pasting:
- Inside `store.js`, make a `findById` method which accept an `id` parameter, then uses Array method `.find()` to return the specific item from `store.items`
- Inside `store.js`, make an `addItem` method, which accepts a `name` parameter. Use a try/catch block and the `Item` module to validate the name, then create the item.
- Make a `findAndToggleChecked` method, which accepts an `id`, then uses `findById()` to fetch the item and toggle its `checked` attribute
- Make a `findAndUpdateName` method, which accepts `id` and `newName` parameters. Use a try/catch to first validate the name and then use `findById()` to fetch the item and update its name. Inside catch, log out 'Cannot update name: {error.message}'
- Make a `findAndDelete` method, which accepts an `id`, and then removes the item from `this.items`.  (HINT: You can use array method `.filter()` or a combination of `.findIndex()` and `.splice()`.)
- Test it! 
  - Load up your app and open the console, then type:
  ```
  store.addItem('bananas');
  shoppingList.render();
  ```
  - Did bananas appear in the DOM? 
  - Manually grab the id of the first store item in the console: `store.items[0].id` and send that `id` into `store.findAndDelete`. Run `store.render()` - did it disappear from the DOM?

#### 4. Update shoppingList to use the new store methods
- As before, update the `shoppingList` handlers to use the appropriate `store` methods and then remove the redundant methods in `shoppingList`.
  - Remove `toggleCheckedForListItem` and update `handleItemCheckClicked` to use `store.findAndToggleChecked`
  - Remove `deleteListItem` and update `handleDeleteItemClicked` to use `store.findAndDelete`
  - Remove `editListItemName` and update `handleEditShoppingItemSubmit` to use `store.findAndUpdateName`

#### 5. Do final modifications to the store and shoppingList
- Let's finish our store by moving the remaining store-related functions out of `shoppingList`:
  - Make a method in `store` called `toggleCheckedFilter` which toggles `this.hideCheckedFilter` prop
  - Make another `store` method called `setSearchTerm` which changes `this.searchTerm` to whatever's passed in
  - Remove `toggleCheckedItemsFilter` and `setSearchTerm` methods from `shoppingList`
  - Update the `handleToggleFilterClick` and `handleShoppingListSearch` to use the new store methods
  - Test that your app still works as expected!

That was a lot of refactoring, but worth it! Let's recap the concepts applied:

* Reduced the app to three global variables by using modules
  * This reduces chances of bugs and naming conflicts
* Used a class to encapsulate all `item`-based operations
  * Includes validation on the object (require name to exist), preventing unnamed items at all other layers of the app
  * All item modifications happen using item methods for maintainable code
* Simplified the main `shoppingList` module by separating out store-related functions from event handler functions
