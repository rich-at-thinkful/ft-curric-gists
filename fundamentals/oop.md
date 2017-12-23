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

We only expect this app to have one `store`, but what happens when we anticipate creating many objects? In the Shopping List app, we frequently create, edit, and remove items in the list. The `item` sounds like a perfect candidate for a **factory**, which we learned about in the earlier Object drills.

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

### Private data

It's a common use case in programming that our objects will hold data we want to be more difficult to access. 

For example, imagine a class for a bank account where you have a balance and want to enable withdrawals. You want to be able to read the account balance (`account.balance`), but you *don't* want the ability to **set** the balance directly (`account.balance = 50`).  Instead you want to call a withdraw method that will take care of reconciling the balance and ensuring you have the funds to withdraw (`account.withdraw(50)`).

Making the `balance` property ordinarily visible means a developer could easily change that balance directly by accident. 

```javascript
class BankAccount {
  constructor() {
    this.balance = 100;
  }
}

const johnAccount = new BankAccount();
johnAccount.balance = 200;  // => This works, but we want to prevent it!
```

In class-oriented languages, there are built-in protections for creating private data and methods. In JavaScript, there are only standards and patterns you can adopt to emulate this. We're not going to learn all of those today; instead, we'll cover one convention used that indicates to a programmer they should not touch the property directly - the underscore `_` prefix.

```javascript
class BankAccount {
  constructor() {
    this._balance = 100;
  }

  getBalance() {
    return this._balance;
  }

  withdraw(amount) {
    if (amount > this._balance) {
      throw new Error('Your balance is insufficient for that withdrawal.');
    }

    this._balance -= amount;
  }
}

const johnAccount = new BankAccount();
console.log(johnAccount.balance)        // => undefined
console.log(johnAccount.getBalance())   // => 100
johnAccount.withdraw(200);              // => Error: Your balance is insufficient...
```

In the above example, we have "hidden" the actual balance on a property prefixed with `_`, shown in the constructor as `this._balance`. JavaScript won't prevent access, but as a developer, you should know not to access data named with a prefix directly. To get the balance, we've built a `getBalance()` method that will deliver the value of the `_balance` property and there's no 'setter' method as we don't want to set the balance directly. Then our `withdraw()` method does the necessary check and changes our `_balance`.

>**ASIDE:** JavaScript's `class` syntax provides for special *getter/setter* methods also known as accessors, which are common in class oriented languages, but we're going to save those extra concepts for future lessons.

### Exercise

Our Shopping List App so far has limited code organization. Let's refactor it to use a more object oriented approach.

Things to keep in mind:

- You should end the exercise with very few global variables.
- Try to look over every function in your app and group them into categories -- each category could be a top-level object/class in your application. Examples:
  - The API calls
  - Template generators
  - Rendering functions
  - Event handlers
- Use `class` to define blueprints for your top-level objects
  - Expect to use a constructor for setting 1) default values or 2) values passed in when creating the object.
- Use private attributes/methods wherever appropriate
