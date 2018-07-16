### Complete and commit and push each task below. Parts of the code are shown as hints, the rest as been "redacted" 

1) Write a statement which logs 'Hi, my name is Chris and I'm 29 years old' to the console (use your name and you can lie about your age). 

> Notice the single quote in `... and I'm ...`

- Remember to commit and push

2) Wrap the statement in a function called `createGreeting` and call that function

- Remember to commit and ...

3) Have the function **return** the greeting instead of logging it out. Then invoke the function, capture the returned value, and log that out.

```
function createGreeting() {
  return ...
}

const greeting1 = createGreeting();
console.log(greeting1);
```

- Remember to commit and ...

4) Change the hardcoded string so it uses parameters passed into the function: `name` and `age`

```
function createGreeting(name, age){ 
  return ...
}
```

- Remember to ...

5) Create a variable named `yearOfBirth` and calculate the year based on age (ex. 2016 - age). Then add sentence to the return value that outputs 'I was born in [yearOfBirth]'.

```
function createGreeting(name, age){ 
  const yearOf..........16 - age;
  return ...
}
```

- Just do it...

6) Move the year of birth calculation into a new function. 

```
function getYearOfBirth(age){
  ...
}

function createGreeting(name, age){
  const yob = .....
  return ...
}
```

- Is it a habit yet?

7) What happens if you enter a negative age? The function wouldn't cause an error but the result wouldn't make sense. Let's force an error if it's negative and add a `try/catch` when we call the top-level `createGreeting`...


```
function yearOfBirth(age){
  if () ...
    throw new Error("Age can not be negative");
	
  return ...;
}

.
.
.

try {
  const greeting1 = createGreeting(...);
} catch ...
```

- Commit, push.

7) Check if `name` and `age` have been entered. Create a conditional which throws an error if not with the message: 'Arguments not valid'.

> Hint: How do you check if a parameter or variable has not been "defined"?


8) What happens if you pass `"29"` (string) as the age? What about `"twenty nine"`? Implement a check to ensure the name is a `string` and the age is a `number`. If not, `throw new TypeError()`.

> Hint: `typeof age`
> Investigate: What is `NaN`?

