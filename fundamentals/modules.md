# Project Structure and Modules

### Files and Directories

Up until now, we've been building our app in a single JavaScript file. For real world applications, projects will be thousands of lines of code and unmaintainable in a single file. 

The structure of a project can vary wildly, based on conventions and individual development team preferences. Web development can be  particularly open form given the nature of web technologies and how they've organically progressed over time. We're going to start you with a suggested structure for the Shopping List app; while there will be variations throughout the course, some organizational themes will persist.

Download [this repo](https://github.com/rich-at-thinkful/shopping-list-01) and open the folder in your code editor. You should notice the following structure:

```
|_ scripts
|  |__ index.js
|  |__ shopping-list.js
|_ styles
|  |__ index.css
|_ index.html
```

The key difference here is we've added some folders to separate the JavaScript files from the CSS files. You would assume most projects will hold many of these files. There are already two JavaScript files, separating some areas of our project. 

The only way the web browser client can know your project is split over multiple files is to individually include them in their own `<script>` tags:

```html
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/cuid/1.3.8/browser-cuid.min.js"></script>
  <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script type="text/javascript" src="scripts/shopping-list.js"></script>
  <script type="text/javascript" src="scripts/index.js"></script>
```

Above, the first two lines are libraries we need for the project. The remaining lines are our two files. Note, the order is important: they are loaded into memory in sequence, so if `index.js` uses a variable declared in `shopping-list.js` then it will need to be loaded last. (Your `index.js` will always be the last file loaded.)

Later in the course, we will learn how to automate this process of including multiple project files using **build tools** but for now, we're going to do it manually. 

### Modules

Including many JavaScript files in our `index.html` is effectively the same as all those lines of code being concatenated into one giant file as far as the browser's runtime is concerned. This is not ideal. Remember how much [we don't like global variables](https://www.google.com/search?q=why+are+global+variables+evil+javascript)? 

Modules allow us to **encapsulate** logic so that functions related to only one task don't pollute the global scope and conflict with other areas of the app. Libraries are good examples of a module. Note how jQuery encapsulates all its inner workings and exposes just a single variable into the global scope - the `$`. 

JavaScript as a programming language does not inherently have modular functionality. Some libraries can emulate this, but the simplest way to accomplish it is using **closures**, which we learned about in earlier drills. To create a closure, we're going to use an immediately-invoked function expression (IIFE) -- this function is built and immediately executed, returning only variables it wants to expose.

```javascript
const myModule = (function(){

  const secretPassword = 'abcde';

  const login = function(inputPassword) {
    if (inputPassword === secretPassword) {
      console.log('Access granted!');
    } else {
      console.log('Unauthorized');
    }
  };

  // The object we return is where we expose specific variables:
  return {
    login: login
  };

}());
```

The above code will look strange but it's actually not that complex. We declare a global variable `myModule` and capture the result of our IIFE. Inside the IIFE, we declare two variables.  Then we return an object, where we assign the `login()` function as the value to a key with the same name.  So `login` is now available outside the module, while `secretPassword` is not.

Anywhere else in our code, we can access our module:

```javascript
myModule.login('foo');     // => 'Unauthorized'
myModule.login('abcde');   // => 'Access granted'
myModule.secretPassword;   // => undefined  (accessing a non-existent key on an object)
```

### Exercise

Our Shopping List App so far has limited code organization. Let's set up a file hierarchy and create modules.

**IMPORTANT:** Start from this [project repo](#). 

First, review the file structure to make sure you understand it and then review the `shopping-list.js` module, paying attention to the IIFE pattern and the returned object at the bottom, which only exposes two functions from the module. Explain out loud what is happening with your pair to solidify the concepts. Now, complete the exercises to build out some additional modules:

Commit often!

#### 1. Create a store module
- Add a `store.js` in your `scripts` folder
- Link the file from your `index.html` - remember ordering is important!
  - The shoppingList needs access to the store, so it should be linked FIRST
- Inside `store.js`, create an IIFE whose return value is captured in a global `store` variable
- Move the `store` object from the `index.js` into your IIFE 
- Declare the `items`, `hideCheckedItems`, `searchterm` as local variables
- Refactor the old `store` object to be a returned object that references the three local variables with the same key names
- For ESLint cleanliness, remember to add/remove global variable definitions at the top of each file when they are/aren't in use. Use the cues when you see errors in your file!
- Test your module! 
  - Create a variable at the top of your `store.js` IIFE (**NOT** the top of the file): `const foo = 'bar';` 
  - At the bottom of your `index.js`, add the following lines:
  ```javascript
  console.log(store);
  console.log(foo);
  ```
  - If everything's written correctly, you should see your store object and get a Reference Error on `foo` because it's hidden inside the module as expected. Once finished testing, remove the temp variable from `store.js` and the log lines from `index.js`

#### 2. Create an Item module
- Add a 'Item.js' into your `scripts` folder
  - Note the initial cap. This is just a convention because we're creating a namespace to hold related functions.
- Link the file from your `index.html` - as before, ordering is important!
  - Your store is going to use the `Item` object, so it needs to be linked FIRST
- Inside `Item.js`, create an IIFE whose return value is captured in a global `Item` variable
- Inside the IIFE: For now, just return an empty object.
- Test your module! 
  - Create a variable at the top of your `Item.js` IIFE (**NOT** the top of the file): `const foo = 'bar';` 
  - At the bottom of your `index.js`, add the following lines:
  ```javascript
  console.log(Item);
  console.log(foo);
  ```
  - If everything's written correctly, you should see an empty `Item` object and get a Reference Error on `foo` because it's hidden inside the module as expected. Once finished testing, remove both the temp variable from `Item.js` and the log lines from `index.js`
