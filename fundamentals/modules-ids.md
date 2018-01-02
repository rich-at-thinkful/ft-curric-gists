# Project Structure and Modules

### Files and Directories

### Unique Ids

### Exercise

Our Shopping List App so far has limited code organization. Let's refactor it into a project folder and encapsulate different modules.

**IMPORTANT:** Start from this [project repo](#).

Commit often!

#### 1. Create a store module
- Add a `store.js` into your `scripts` folder
- Link the file from your `index.html` - remember ordering is important!
  - The shoppingList needs access to the store, so it should be linked FIRST
- Inside `store.js`, create an IIFE whose return value is captured in a global `store` variable
- Move the `store` object from the `index.js` into your IIFE and refactor to return this object from the IIFE
- For ESLint cleanliness, remember to add/remove global variable definitions at the top of each file when they are/aren't in use. Use the cues when you see errors in your file!
- Test your module! 
  - Create a variable at the top of your `store.js` IIFE (**NOT** the top of the file): `const foo = 'bar';` 
  - At the bottom of your `index.js`, add the following lines:
  ```
  console.log(store);
  console.log(foo);
  ```
  - If everything's written correctly, you should see your store object and get a Reference Error on `foo` because it's hidden inside the module as expected. Once finished testing, remove the temp variable from `store.js` and the log lines from `index.js`

#### 2. Create an Item module
- Add a 'Item.js' into your `scripts` folder
  - Note the initial cap. This is because we're creating a **class**, which we cover in the OOP lesson
- Link the file from your `index.html` - as before, ordering is important!
  - Your store is going to use the `Item` class, so it needs to be linked FIRST
- Inside `Item.js`, create an IIFE whose return value is captured in a global `Item` variable
- Inside the IIFE: For now, just create an empty class with the following code: `class Item {}`. Then return the class on the next line: `return Item;`
- Test your module! 
  - Create a variable at the top of your `Item.js` IIFE (**NOT** the top of the file): `const foo = 'bar';` 
  - At the bottom of your `index.js`, add the following lines:
  ```
  console.log(Item);
  console.log(foo);
  ```
  - If everything's written correctly, you should see an empty `Item` class and get a Reference Error on `foo` because it's hidden inside the module as expected. Once finished testing, remove both the temp variable from `Item.js` and the log lines from `index.js`
