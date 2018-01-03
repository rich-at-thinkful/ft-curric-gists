# Project Structure and Modules

### Files and Directories

Up until now, we've been building our app in a single JavaScript file. For real world applications, projects will be thousands of lines of code and unmaintainable in a single file. 

The structure of a project can vary wildly, based on conventions and individual development team preferences. Web development can be  particularly open form given the nature of web technologies and how they've organically progressed over time. We're going to start you with a suggested structure for the Shopping List app; while there will be variations throughout the course, some organizational themes will persist.

Download [this repo](#) and open the folder in your code editor. You should notice the following structure:

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

```
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/cuid/1.3.8/browser-cuid.min.js"></script>
  <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script type="text/javascript" src="scripts/shopping-list.js"></script>
  <script type="text/javascript" src="scripts/index.js"></script>
```

Above, the first two lines are libraries we need for the project. The remaining lines are our two files. Note, the order is important: they are loaded into memory in sequence, so if `index.js` uses a variable declared in `shopping-list.js` then it will need to be loaded last.

Later in the course, we will learn how to automate this process of including multiple project files using **build tools** but for now, we're going to do it manually. 

### Modules

Including many JavaScript files in our `index.html` is effectively the same as all the lines being concatenated into one giant file as far as the execution runtime is concerned. This is not ideal. Remember how much [we don't like global variables](https://www.google.com/search?q=why+are+global+variables+evil+javascript)? 

Modules allow us to **encapsulate** all code logic related to one area of our application, keeping all the module's variables out of global scope. Libraries are good examples of a module. Note how jQuery encapsulates all its inner workings and exposes just a single variable into global scope - the `$`. 

JavaScript does not have the functionality of modules built in. Some libraries can emulate this, but the simplest way to accomplish it is using **closures**, which we learned about in earlier drills. To create a closure, we're going to use an immediately-invoked function expression (IIFE) -- essentially a function that exists purely to hide all its inner workings and only expose one thing back.

```
const myModule = (function(){

  const privateFoo = 'this is private';

  const publicFoo = 'this is public';

  const publicFunc = function() {
    console.log('A public function!');
  };

  return {
    publicFoo: publicFoo,
    publicFunc: publicFunc
  };

}());
```

The above code will look strange but it's actually not that complex. We declare a global variable `myModule` and capture the result of our IIFE. Inside the IIFE, we declare three variables. The first we intend to be private and unavailable outside the module. The other two are public. To make them public, we expose them by returning them in an object at the bottom of the IIFE.

So anywhere else in our code, we can access specific content from our module with:

```
console.log(myModule.publicFoo)   // => 'this is public'
myModule.publicFunc()             // => 'a public function!'
myModule.privateFoo               // => undefined
```

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
