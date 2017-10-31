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

As with many things in JavaScript there are multiple syntaxes to achieve this. The first we'll look at is **constructor functions**:

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
console.log(store.currentQuestion)    // => 2
```

There's some odd things here! First, our `Store` function has an initial capitalization. This has no inherent affect but is a *convention* in JavaScript (and most languages) when defining a class or prototype, which is the purpose of this function.

Notice inside the function that we don't generate an object. All it's doing is assigning props to a `this` object and not returning anything.

Why? Because when we call `Store()` at the bottom, we prefix with the `new` keyword. It has very special meaning in JavaScript and invokes the `Store()` function with certain hidden behavior. This includes automatically returning an object containing anything we placed on `this`, and attaching the special `prototype` property to the returned object.

We place our prototype methods directly on the `Store.prototype` object and this now means they will be available to all `Store` "instances."

### ES6 always has another way

ES6 created some **syntactic sugar** for our function constructor above which most closely resembles how class-oriented languages build objects:

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

While it's not really a class how a language like Java, Ruby, or Python would define it, because JavaScript doesn't have the engine underneath for many class features. This is an emulation of how classes behave, using the native JavaScript prototype chain. 

If you haven't used class-oriented languages before this course, then these descriptions may be confusing. For now, the takeaway is that **function constructors** or the **class** syntax exist to let you *create objects with functions that can be applied to those objects.* Remember our original OOP definition at the top of this article?


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
