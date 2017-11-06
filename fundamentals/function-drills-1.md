### Complete and commit and push each task below. Parts of the code are shown as hints, the rest as been "redacted" 

1) Write a statement which logs 'Hi, my name is Chris and I'm 29 years old' to the console (you can lie about your age). 

> Notice the single quote in `... and I'm ...`

```
console.l..........my name is Chris and I'm 29 ye..........
```
- Remember to commit and push

2) Wrap the statement in a function called `whoAmI` and call that function

```
function..........
  console.l..........my name is Chris and I'm 29 ye..........
}
whoA.....
```
- Remember to commit and ...

3) Change the hard coded string into a parameters, `name` and `age`
```
funct..........(name, age){ 
  console.l..........my name is Chris and I'm 29 ye..........
}
whoAmI(..........);
```

- Remember to ...

4) Create a variable named `yearOfBirth` and calculate the year based on age (ex 2016 - age).
Then add another `console.log` statement that outputs `I was born in [insert yearOfBirth]`.

```
funct..........(name, age){ 
  var yearOf..........16 - age;
  console.l..........my name is Chris and I'm 29 ye..........
  console.log("I was born in " + yearOf.......
}
whoAmI(..........);
```

- Just do it...

5) Move the year of birth calculation into a new function. 
> Do you get an error if the variable and function are both name `yearOfBirth`?
```
Uncaught TypeError: yearOfBirth is not a function
    at whoAmI (<anonymous>:6:21)
    at <anonymous>:10:1
```

```
function yearOfBirth(age){
  ..........
}

function whoAmI(name, age){
	var yob = yearOfBirth(age);
	..........
	..........
}
whoAmI(..........);
```

- Is it a habit yet?

6) What happens if you enter a negative age? Add a `try/catch`

> Note: a negative age doesn't cause a runtime error but it doesn't make sense.

```
function yearOfBirth(age){
  ..........
		throw new Error("Age can not be negative");
	..
	return 2016 - age;
}

.
.
.
.
.
.

whoAmI("Chris", -5);
```


7) Check if `name` and `age` have been entered. Create a conditional which outputs `console.error("Arguments not valid")`.

> Hint: How do you check if a parameter or variable has not been "defined"?


8) What happens if you pass `"29"` as the age? What about `"twenty nine"`? Implement a check to ensure the name is a `string` and the age is a `number`. 

> Hint: `typeof age`
> Investigate: What is `NaN`?