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

Or maybe you wrote a function to do it:

```javascript
function nextQuestion(store){
  store.currentQuestion++;
}
```

## Context

The OOP approach would be to create functions that already have the **context** of the object they need to work on, rather than have the object passed to them. You've seen this done in earlier exercises with the `this` keyword:

```javascript
function nextQuestion() {
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

As with many things in JavaScript there are multiple syntaxes to achieve this. Here's one pre-ES6 way using `Object.create()`:

```javascript
const Store = {
  nextQuestion() {
    this.currentQuestion++;
  }
}

function createStore(totalQuestions = 5) {
  const store = Object.create(Store);
  store.currentQuestion = 1;
  store.totalQuestions = totalQuestions;
  return store;
}

const store = createStore();
```

Notice the use of the initial capital for `Store` when creating a prototype. This is a convention but not enforced by JavaScript.

`Object.create` is a special method that generates a new object and assigns it a prototype at the same time. This now means our `store` **instance** (so-called because it's one of possibly many "instances" of a `Store`) has its own unique versions of `currentQuestion` and `totalQuestions` props, but also direct access to the `nextQuestion` method somewhere else in memory. Whether a prop is on the object or on its prototype chain, you call it with the same normal dot notation, `store.nextQuestion()`.

### Something old, something NEW

While the above approach is probably the most "natural" for JavaScript, another very popular syntax exists that appeals to programmers of class-oriented languages --  especially Java, which was at its height of popularity when this syntax was introduced.

Meet the `new` keyword. We're going to create a **function constructor** that looks similar to the factory above, but has important differences:

```javascript
function Store(totalQuestions){
  this.currentQuestion = 1;
  this.totalQuestions = totalQuestions;
}

Store.prototype.nextQuestion = function(){
  this.currentQuestion++;
}

const store = new Store();
store.nextQuestion();
```

Again, we use initial capital for our `Store` function. (This would be very similar to a `class` in class-oriented languages.) However, inside the function, we don't generate an object -- we just start assigning props to `this`. We also don't return an object.

The reason is because the use of the `new` keyword when we invoke the `Store()` function has very special meaning and certain hidden things occur in the background. These include ensuring the function returns an object with whatever we placed on `this` and it attaches the `prototype` property to this returned object.

We place our prototype methods directly on `Store.prototype` object and this now means they will be available to all `Store` instances.

There are other subtle differences, but the important takeaway at this point is that you have a decent understanding of using `new` and the concept of a class (blueprint) and its easy-to-generate instance object.

### ES6 always has another way

Finally, ES6 decided to create further **syntactic sugar** for our function constructor above:

```javascript
class Store {
  constructor(totalQuestions) {
    this.currentQuestion = 1;
    this.totalQuestions = totalQuestions;
  }

  nextQuestion() {
    this.currentQuestion++;
  }
}

const store = new Store();
store.nextQuestion();
```

Again, this was designed to feel more familiar to those who use class-oriented languages. It's not really a class because JavaScript doesn't have the engine underneath for many class features. This is an emulation of how classes behave, using the native JavaScript prototype chain. 

If you haven't used class-oriented languages before this course, then these descriptions may be confusing. For now, the takeaway is that all three constructs -- `Object.create()`, **function constructors**, and the **class** syntax -- all exist to let you *create objects with functions that can be applied to those objects.* Remember our original OOP definition at the top of this article?

### Public and Private

A common use case in application building is the need to hide some data from other areas of the program to avoid bugs or exposing sensitive information. For example, you have a user account that contains a password -- you want to be able to validate a password received but not just easily fetch the password from the account object. The naive approach:

```javascript
class Account {
  constructor(username, password, confirmPassword) {
    this.username = username;
    if (password !== confirmPassword) {
      throw new Error('Cannot create Account. Password does not match.');
    }
    
    this.password = password;
  }

  setNewPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error('Cannot change password: does not match.');
    } 

    this.password = password;
  }

  validate(password) {
    return this.password === password;
  }
} 

const rich = new Account('rich', 'myPassword', 'myPassword');
rich.validate('myPassword')   // => true
rich.setNewPassword('newPassword', 'newPassword');
```

This works, but you could also call `rich.password = 'somethingElse'` and dangerously get or set this information without the confirmation check.

We can use JavaScript's closures (covered in [Object drills day](https://courses.thinkful.com/web-dev-001v1/project/2.6.5)) to protect data so it's not readily available as a prop on the object:

```javascript
const Account = (function() {
  const _accounts = {};

  return class {
    constructor(username, password, confirmPassword) {
      this.username = username;
      if (password !== confirmPassword) {
        throw new Error('Cannot create Account. Password does not match.');
      }
      
      // Store the password in the private _accounts object, 
      // tied to a key of their unique username
      _accounts[username] = password;
    }

    setNewPassword(password, confirmPassword) {
      if (password !== confirmPassword) {
        throw new Error('Cannot change password: does not match.');
      } 

      _accounts[this.username] = password;
    }

    validate(password) {
      return _accounts[this.username] === password;
    }
  };
}());

const rich = new Account('rich', 'bear', 'bear');
const laura = new Account('laura', 'tiger', 'tiger');

rich.password           // => undefined
rich.validate('bear')   // => true
laura.validate('tiger') // => true

```

Notice we can no longer access `rich.password` but the data is persisted and can be validated using our `validate()` method. How is this happening?

The code probably looks very strange, but let's break it down. First, we're creating an immediately invoked function expression ([IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)) that returns back the `Account` class we're building. We need the IIFE so we can create a **scoped variable**, `_accounts`. (By convention, we prefix private or unused variables with underscore `_`, but it has no inherent effect.) Remember from [Function Drills](https://gist.github.com/MrSkinny/dafefdbc8999f186ef755693781d03b9) that variables inside a function are only visible to that function.

So the private data of passwords for each account is now in a variable that can **only** be accessed from within the instanced object's public methods. There's no method to read the password (a good thing!) and one method to change it which ensures it's not set without being typed correctly twice.

>**ASIDE:** This is only an example of hidden data and not how passwords are typically stored. They would often be encrypted before being written to disk storage, which you'll see in action later in the course.

### Exercise

Our Quiz App so far has limited code organization. Take a stab at reorganizing your code to use an object oriented approach. 

Things to keep in mind:

- You should end the exercise with very few global variables.
- Try to look over every function in your app and group them into categories -- each category could be a top-level object/class in your application. Examples:
  - The API calls
  - Template generators
  - Rendering functions
  - Event handlers
- Use one of the object creation methods above (we recommend the ES6 `class` syntax) to define blueprints for your top-level objects
  - Expect to use a constructor for setting 1) default values or 2) values passed in when creating the object.
