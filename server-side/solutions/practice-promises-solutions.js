const axios = require('axios');

const searchTerm = process.argv[2];

function personFoundOutput(person, movies) {
  let pronoun;
  switch(person.gender) {
    case 'male': pronoun = 'He has'; break;
    case 'female': pronoun = 'She has'; break;
    default: pronoun = 'They have';
  }

  console.log(`
${person.name.toUpperCase()} has been found!
${pronoun} starred in the following films:

${movies.map((movie, index) => `${index + 1}. ${movie.title}`).join('\n')}

${pronoun} also been associated with a total of ${person.vehicles.length} vehicles and ${person.starships.length} starships.
  `);
}

function personNotFoundOutput(searchTerm) {
  console.log(`${searchTerm.toUpperCase()} is not an entity we're looking for. Move along.`);
}

let person;
axios.get('https://swapi.co/api/people', {
  params: {
    search: searchTerm
  }
})
  .then(res => {
    person = res.data.results[0];
    if (!person) return null;

    const filmPromises = person.films.map(filmUrl => axios.get(filmUrl));
    return Promise.all(filmPromises);
  })
  .then(results => {
    if (!results) {
      personNotFoundOutput(searchTerm);
      return;
    }

    const orderedMovies = results
      .map(({ data }) => {
        return {
          title: data.title,
          release_date: data.release_date
        };
      }) 
      .sort((a, b) => a.release_date > b.release_date);
    
    personFoundOutput(person, orderedMovies);
  })
  .catch(err => console.log(err));


