# Object-Oriented Programming

> Object-oriented programming (OOP) refers to a type of computer programming (software design) in which programmers define not only the data type of a data structure, but also the types of operations (functions) that can be applied to the data structure. - [Webopedia](https://www.webopedia.com/TERM/O/object_oriented_programming_OOP.html)

OOP is a massive topic that includes many concepts to learn and master. The language of JavaScript does not inherently contain some well-established OOP features, but its flexibility allows the use of many programming patterns, including functional programming and OOP.

Let's start with the basic definition above. By now, you've had a lot of practice creating objects, mainly to hold onto some data. Regardless of the programming language, one core tenet of OOP is you have an object with data, but also functions attached to that object that read and manipulate the data.

Let's take a small version of our store object we've been using for the Quiz App:

```javascript
const store = {
  totalQuestions: 5,
  currentQuestion: 1
};
```

This is just an object with a straightforward data structure. Throughout our app, we know we're going to need to increment `currentQuestion`. In your past iterations, you may have done this directly in an event handler:

```javascript
store.currentQuestion++;
```

Or maybe you wrote a function to do it so it can check there are more questions before incrementing:

```javascript
function nextQuestion(store){
  if (store.currentQuestion <= store.totalQuestions) return;
  store.currentQuestion++;
}
```

## Context

The OOP approach would be to create functions that already have the **context** of the object they need to work on, rather than have the object passed to them. You've seen this done in earlier exercises with the `this` keyword:

```javascript
function nextQuestion() {
  if (this.currentQuestion <= this.totalQuestions) return;
  this.currentQuestion++;
}
```

We know that `this` is a special keyword that is assigned to an object at the exact moment a function is executed (and NOT when it's defined). 

Since this function's only real purpose is to work on `store` objects, we could attach it directly to our `store`:

```javascript
const store = {
  currentQuestion: 1,
  totalQuestions: 5,

  nextQuestion() {
    if (this.currentQuestion <= this.totalQuestions) return;
    this.currentQuestion++;
  }
};

store.nextQuestion();
```

>**ASIDE:** Methods that would be appropriate for use with multiple objects can also exist. An OOP concept called **polymorphism** refers to this practice, among other things.

The above works fine if our application only needs one store. What if it needed to operate multiple stores at once? This is where **factories** can come into play: a factory is a regular ol' function that builds objects:

```javascript
const createStore = function(totalQuestions = 5) {
  const store = {
    currentQuestion: 1,
    totalQuestions: totalQuestions,

    // fyi: this is an es6 shorthand function
    nextQuestion() {  
      if (this.currentQuestion <= this.totalQuestions) return;
      this.currentQuestion++;
    }
  };

  return store;
}

const store1 = createStore();
const store2 = createStore(10);
```

You've also done this in an earlier lesson. In the real world, this works but isn't optimal from a memory/performance perspective. Each store and all its properties use memory, but the `nextQuestion` function is an identical piece of code for every store.  If you have 100 stores, why would you need this same function repeated 100 times in memory?

### Inheritance and Prototype
The solution for this is **inheritance**, another OOP concept. Specifically, in JavaScript, we use **prototypal inheritance**.

>**ASIDE:** There's [long, involved reading](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9) on the topic of **prototypal inheritance** vs **classical inheritance**, which is used in many class-oriented programming languages. Keep this in your "Read Later" materials; just know that these different types of inheritance structures exist.

So, what does this mean? Every object in JavaScript exists on the **prototype chain**, which always leads back to the global `Object`. Similar to scope chain, every object can see into its parent prototype object. By having a common parent prototype, a single method can live in one place in memory, but be naturally utilized by unlimited objects derived from the prototype.

As with many things in JavaScript there are multiple syntaxes to achieve this. The first we'll look at is **constructor functions**:

```javascript
function Store(totalQuestions = 5){
  this.currentQuestion = 1;
  this.totalQuestions = totalQuestions;
}

Store.prototype.nextQuestion = function(){
  if (this.currentQuestion <= this.totalQuestions) return;
  this.currentQuestion++;
}

const store = new Store();
store.nextQuestion();
console.log(store.currentQuestion)    // => 2
```

There's some odd things here! First, our `Store` function has an initial capitalization. This has no inherent effect but is a *convention* in JavaScript (and most languages) when defining a class or prototype, which is the purpose of this function.

Notice inside the function that we don't generate an object. All it's doing is assigning props to a `this` object and not returning anything.

Why? Because when we call `Store()` at the bottom, we prefix with the `new` keyword. It has very special meaning in JavaScript and invokes the `Store()` function with certain hidden behavior. This includes automatically returning an object with any properties we placed on `this` and linking the new object's prototype chain to the `Store.prototype` object.

We place our prototype methods directly on the `Store.prototype` object and this now means they will be available to all `Store` "instances."  Instances are objects created from a class.

### ES6 always has another way

ES6 created some **syntactic sugar** for our function constructor above which most closely resembles how class-oriented languages build objects:

```javascript
class Store {
  // This function runs when a new `store` is instantiated
  constructor(totalQuestions = 5) {
    this.currentQuestion = 1;
    this.totalQuestions = totalQuestions;
  }

  // All methods below are available on the Store.prototype
  // -- NOTE: with `class` syntax, you do NOT put commas between 
  // -- methods as you would in a normal object's props!
  nextQuestion() {
    if (this.currentQuestion <= this.totalQuestions) return;
    this.currentQuestion++;
  }

  foo() {
    return 'bar';
  }
}

const store = new Store();
store.nextQuestion();
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
johnAccount.balance = 200;  // => Would work!
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

Our Quiz App so far has limited code organization. Take a stab at reorganizing your code to use an object oriented approach. 

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
