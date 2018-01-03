### ARCHIVED FOR NOW: This lesson is no longer in use. Refer to [Namespacing](namespacing.md)

# Object-Oriented Programming

> Object-oriented programming (OOP) refers to a type of computer programming (software design) in which programmers define not only the data type of a data structure, but also the types of operations (functions) that can be applied to the data structure. - [Webopedia](https://www.webopedia.com/TERM/O/object_oriented_programming_OOP.html)

OOP is a massive topic that includes many concepts to learn and master. The language of JavaScript does not inherently contain some well-established OOP features, but its flexibility allows the use of many programming patterns, including functional programming and OOP.

Let's start with the basic definition above. By now, you've had a lot of practice creating objects, mainly to hold onto some data. Regardless of the programming language, one core tenet of OOP is you have an object with data, but also functions attached to that object that read and manipulate the data.

Let's take our `store` object we've been using with the Shopping List app:

```javascript
const store = {
  items: [ {}, {}, {} ],
  checkedFilter: false,
  searchTerm: ''
};
```

This is just an object with a straightforward data structure. During the usage of our app, we've written functions to manipulate our `store` object, like toggling the `checkedFilter` prop:

```javascript
function toggleCheckedFilter() {
  store.checkedFilter = !store.checkedFilter;
}
```

In the above example, the function **assumes** knowledge of a global `store` object, which is not a maintainable approach once our app gets larger. The functional programming pattern would have us receive an object (as an argument) to manipulate instead of assuming it globally exists.

## Context

Meanwhile, the OOP approach would be to create functions that already have the **context** of the object they need to work on, rather than have the object passed to them. You've seen this done in earlier exercises with the `this` keyword:

```javascript
function toggleCheckedFilter() {
  this.checkedFilter = !this.checkedFilter;
}
```

We know that `this` is a special keyword that is assigned to an object at the exact moment a function is executed (and NOT when it's defined). 

Since this function's only real purpose is to work on `store` objects, we could attach it directly to our `store`:

```javascript
const store = {
  items: [ {}, {}, {} ],
  checkedFilter: false,
  searchTerm: '',

  // Note - ES6 shorthand below for created methods:
  toggleCheckedFilter() {
    this.checkedFilter = !this.checkedFilter;
  }
};

store.toggleCheckedFilter();
```

>**ASIDE:** Methods that would be appropriate for use with multiple objects can also exist. An OOP concept called **polymorphism** refers to this practice, among other things.

We only expect this app to have one `store`, but what happens when we anticipate creating many objects? In the Shopping List app, we intend to have many items in our list. The `item` sounds like a perfect candidate for a **factory**, which we learned about in the earlier Object drills.

```javascript
const createItem = function(itemName) {
  if (!itemName) throw new TypeError('Cannot create Item: Must provide `name`');

  const item = {
    // Attributes
    name: itemName,
    checked: false,
    
    // Methods
    toggleChecked() {
      this.checked = !this.checked;
    },

    editName(name) {
      if (!name) throw new TypeError('Cannot edit Item: Must provide `name`');
      this.name = name;
    }
  };

  return item;
}

const apples = createItem('apples');
const oranges = createItem('oranges');
```

You've also done this in an earlier lesson. In the real world, this works but isn't optimal from a memory/performance perspective. Each `item` and all its properties use memory, but the `toggleChecked` and `editName` functions are identical pieces of code placed on each item object.  If you have 100 items, why would you need this same function repeated 100 times in memory?

### Inheritance and Prototype
The solution for this is **inheritance**, another OOP concept. Specifically, in JavaScript, we use **prototypal inheritance**.

>**ASIDE:** There's [long, involved reading](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9) on the topic of **prototypal inheritance** vs **classical inheritance**, which is used in many class-oriented programming languages. Keep this in your "Read Later" materials; just know that these different types of inheritance structures exist.

So, what does this mean? Every object in JavaScript exists on the **prototype chain**, which always leads back to the global `Object`. Similar to scope chain, every object can see into its parent prototype object. By having a common parent prototype, a single method (or attribute) can live in one place in memory, but be naturally utilized by unlimited objects derived from the prototype.

As with many things in JavaScript there are multiple syntaxes to achieve this. The first we'll look at is **constructor functions**:

```javascript
function Item(itemName){
  if (!itemName) throw new TypeError('Cannot create Item: Must provide `name`');

  this.name = itemName;
  this.checked = false;
}

Item.prototype.toggleChecked = function(){
  this.checked = !this.checked;
};

Item.prototype.editName = function(name) {
  if (!name) throw new TypeError('Cannot edit Item: Must provide `name`');
  this.name = name;
};

const oranges = new Item('oranges');
oranges.toggleChecked();
console.log(oranges.checked)    // => 'true'
```

There's some odd things here! First, our `Item` function has an initial capitalization. This has no inherent effect but is a *convention* in JavaScript (and most languages) when defining a class or prototype, which is the purpose of this function.

Notice inside the function that we don't generate an object. All it's doing is assigning props to a `this` object and not returning anything.

Why? Because when we call `Item()` at the bottom, we prefix with the `new` keyword. It has very special meaning in JavaScript and invokes the `Item()` function with certain hidden behavior. This includes automatically returning an object with any properties we placed on `this` and linking the new object's prototype chain to the `Item.prototype` object.

We place our prototype methods directly on the `Item.prototype` object and this now means they will be available to all `Item` "instances."  Instances are objects created from a class.

### ES6 always has another way

ES6 created some **syntactic sugar** for our function constructor above which most closely resembles how class-oriented languages build objects:

```javascript
class Item {
  // This function runs when a new `store` is instantiated
  constructor(itemName) {
    if (!itemName) throw new TypeError('Cannot create Item: Must provide `name`');

    this.name = itemName;
    this.checked = false;
  }

  // All methods below are available on the Store.prototype
  // -- NOTE: with `class` syntax, you do NOT put commas between 
  // -- methods as you would in a normal object's props!
  toggleChecked() {
    this.checked = !this.checked;
  }

  editName(name) {
    if (!name) throw new TypeError('Cannot edit Item: Must provide `name`');
    this.name = name;
  }
}

const item1 = new Item('oranges');
item1.editName('apples');
```

This is not really a [class](https://en.wikipedia.org/wiki/Class_(computer_programming)) how a language like Java, Ruby, or Python would define it, because JavaScript doesn't have the engine underneath for many class features. This is an emulation of how classes behave, using the native JavaScript prototype chain. 

If you haven't used class-oriented languages before this course, then these descriptions may be confusing. For now, the takeaway is that **function constructors** or the **class** syntax exist to let you *create objects with functions that can be applied to those objects.* Remember our original OOP definition at the top of this article?

### Exercise

Our Shopping List has been built with a lot of standalone functions and global variables. Let's refactor it to use a more object oriented approach.

**IMPORTANT:** You should be starting from the project after completing the exercises in [Project Structure and Modules](modules-ids.md).

Commit often!

#### 1. Build the Item class
- In `Item.js`, add a `constructor` function which takes in a `name` parameter
- Inside the constructor, you will be creating the attributes `id`, `name`, `checked` on all object instances.
- At the top of the constructor, check if `name` exists and throw an error if it doesn't with the message, "Cannot create Item. Must provide name."
- For each attribute:
  - `id` - invoke `cuid()` to create a unique id
  - `name` - the value of parameter `name` passed into the constructor
  - `checked` - defaults to `false`
- Add an `updateName` method inside the class, which takes a `name` parameter and sets `this.name` to the new value passed in
- Add a `toggleChecked` method inside the class, which sets `this.checked` to the **opposite** of the current value
- Inside `store.js`, remove the mock items and have `items` simply be an empty array
- Test your module!
  - At the bottom of `index.js` add the following:
  ```
  const item1 = new Item('apples');
  const item2 = new Item('oranges);
  const item3 = new Item('milk');
  item3.toggleChecked();
  store.items.push(item1, item2, item3);
  console.log(store.items);
  shoppingList.render();
  ```
  - We instantiated three new Items, invoked the `toggleChecked` method on `item3` and then pushed all the items into the store
  - If you built your `Item` class correctly, you should get no errors and the browser will display all items as intended.
  - You can remove this dummy data or keep it in index.js for now, so your browser renders data while testing

#### 2. Update shoppingList to use Item class
- Inside `shoppingList.js`, we need to fix our `addItemToShoppingList` function to instantiate a new `Item` instead of manually creating an object. Capture the object from invoking `new Item(itemName)` and push it into `store.items`.
- ESLint cleanliness: Notice we're no longer using the `cuid` library inside `shoppingList`, but we are using the `Item` module. Change your global definition at the top of `shoppingList` to reflect this and you should no longer have a red underline on `Item`
- Update `toggleCheckedForListItem` method to use the `toggleChecked` method on the `foundItem`
- Update `editListItemName` method to use the `updateName` method on the `item`
- Test it! 
  - Your shopping list app in the web browser should be working as before, but now you're using methods on the `item` instance

#### 3. Update store to create, update, delete items
- Let's add methods directly to our `store` to handle related operations. We're going to be replacing these operations currently living in `shoppingList`
- Inside `store.js`, make a `create` method, which accepts a `name` parameter, and pushes a new Item instance to `this.items` array
- Make a `findAndToggleChecked` method, which accepts an `id`, finds the appropriate item in `this.items`, then calls `toggleChecked` on the item
- Make a `findAndUpdateName` method, which accepts `id` and `newName` parameters, finds the appropriate item, then calls `updateName`
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
