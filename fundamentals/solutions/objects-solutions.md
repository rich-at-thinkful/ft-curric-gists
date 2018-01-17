Example solutions to [today's object drills](https://gist.github.com/MrSkinny/41a75fc08a402358384226ec22fdd0de).
This is not the sole right way to solve any of these problems.

## 1. Object Initializers and Methods

```javascript
const loaf = {
    flour: 300,
    water: 210
};
console.log("Flour:", loaf.flour);
console.log("Water:", loaf.water);
```

```javascript
const loaf = {
    flour: 300,
    water: 210,
    hydration: function() {}
};
```

```javascript
const loaf = {
    flour: 300,
    water: 210,
    hydration: function() {
        return this.water / this.flour * 100;
    }
};
console.log("Hydration:", loaf.hydration());
```

## 2. Iterating over an object's properties

```javascript
const meta = {
    foo: "scram",
    bar: "whiskey",
    fum: "giant",
    quux: "steele",
    spam: "van rossum"
};
for (let name in meta) {
    console.log(name, meta[name]);
}
```

## 3. Arrays in objects

```javascript
const hobbit = {meals: ['breakfast', 'second breakfast', 'elevenses', 'lunch', 'afternoon tea', 'dinner', 'supper']};
console.log(hobbit.meals[3]);
```

## 4. Arrays of objects

```javascript
const staff = [
    {name: "Roy", job_title: "Off-And-On Again Guy"},
    {name: "Moss", job_title: "Nerd"},
    {name: "Jen", job_title: "IT manager"},
    {name: "Reynholm", job_title: "Large Ham"},
];
for (let i=0; i<staff.length; i++) {
    const employee = staff[i];
    console.log(employee.name, "is the", employee.job_title);
}
```

## 5. Properties that aren't there

```javascript
const staff = [
    {name: "Roy", job_title: "Off-And-On Again Guy", boss: "Jen"},
    {name: "Moss", job_title: "Nerd", boss: "Jen"},
    {name: "Jen", job_title: "IT manager", boss: "Reynholm"},
    {name: "Reynholm", job_title: "Large Ham"},
];
for (let i=0; i<staff.length; i++) {
    const employee = staff[i];
    console.log(employee.job_title, employee.name, "reports to", employee.boss);
}
```

* The owner is shown as "reports to undefined", because looking up a property that doesn't exist yields the special value `undefined`.

```javascript
for (let i=0; i<staff.length; i++) {
    const employee = staff[i];
    if (!employee.boss) {
        console.log(employee.job_title, employee.name, "doesn't report to anybody.");
    }
    else {
        console.log(employee.job_title, employee.name, "reports to", employee.boss);
    }
}
```

## 6. Cracking the Code

```javascript
function decode(words){
    const cipher = {
        a: 2,
        b: 3,
        c: 4,
        d: 5  
    };
    
    const wordsArray = words.split(' ');
    const decodedChars = wordsArray.map(word => {
        let offset;
        if (cipher[word[0]]) {
            offset = cipher[word[0]] - 1
        };

        return offset ? word[offset] : ' ';
    });
    
    return decodedChars.join('');
}
```

## 7. Factory Functions with LOTR

```javascript
// Create the factory function:

function createCharacter(name, nickname, race, origin, atk, def){
  return {
    name, nickname, race, origin, atk, def,

    describe() {
      console.log(`${name} is a ${race} from ${origin}.`);
    },
    
    evaluateFight(character) {
      let dmgDealt = 0, dmgReceived = 0;
      
      if (this.atk > character.def) {
        dmgDealt = this.atk - character.def
      }
      
      if (this.def < character.atk) {
        dmgReceived = character.atk - this.def;
      }
      
      console.log(`Your opponent takes ${dmgDealt} damage and you receive ${dmgReceived} damage.`);
    }
  };
}

// Create array of characters:

const characters = [
  createCharacter('Gandalf the White', 'gandalf', 'Wizard', 'Middle Earth', 10, 6),
  createCharacter('Bilbo Baggins', 'bilbo', 'Hobbit', 'The Shire', 2, 1),
  createCharacter('Frodo Baggins', 'frodo', 'Hobbit', 'The Shire', 3, 2),
  createCharacter('Aragorn son of Arathorn', 'aragorn', 'Man', 'Dunedain', 6, 8),
  createCharacter('Legolas', 'legolas', 'Elf', 'Woodland Realm', 8, 5)
];

// Add character to array:

characters.push(createCharacter('Arwen Undomiel', 'arwen', 'Half-elf', 'Rivendell', 3, 5));

// Find character and call its `describe` method

characters.find(char => char.nickname === 'aragorn').describe();

// Create array of only hobbits:

const onlyHobbits = characters.filter(char => char.race === 'Hobbit');
console.log(onlyHobbits);

// Create array of only high attack characters:

const onlyHighAttack = characters.filter(char => char.atk > 5);
console.log(onlyHighAttack);
```

## 8. Database Search

This solution aims to perform the **least** iterations necessary for best performance, exiting a loop at earliest known moment where further searching is not necessary. It implements the [`continue`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue) and [`break`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) keywords.

```javascript
const findOne = function(arr, query) {
  
  // See for-of loops - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
  // Iterates through array placing current element in locally scoped variable `hero`
  for (const hero of arr) {
    let assumeMatch = true;

    // loop through each key in `query` object
    for (const key in query) {
      
      // when first value in query[key] does NOT match hero[key]
      // break out of the loop and set assumeMatch = false
      if (query[key] !== hero[key]) {
        assumeMatch = false;
        break;
      }
    }
    
    // if failed to match, continue to next hero or exit loop if at last hero
    if (!assumeMatch) continue;
    
    // otherwise a match was found! return the hero
    return hero;
  }

  // heroes array was exited without a match so return null
  return null;
};
```
## 8a. Bonus Database Method

Same `findOne` solution as above, except we loop through `this.store.heroes` and place the function on the `Database` object.

```js
const Database = {
  store: {
    heroes: [ /* {}, {}, {} */ ]
  },

  findOne: function(query) {
    for (const hero of this.store.heroes) {
      let assumeMatch = true;

      for (const key in query) {
        if (query[key] !== hero[key]) {
          assumeMatch = false;
          break;
        }
      }
      
      if (!assumeMatch) continue;
      
      return hero;
    }

    return null;
  }
};
```
