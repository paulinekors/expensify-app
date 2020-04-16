// OBJECT DESTRUCTURING

const person = {
    //name: 'Andrew',
    age: 26,
    location: {
        city: 'Philly',
        temp: 92 
    }
};

// this is equivalent to:
// const name = person.name;
// const age = person.age;
const {name: firstName = 'Pauline', age} = person;
console.log(`${firstName} is ${age}`);

const {city, temp: temperature} = person.location;
if (city && temperature) {
    console.log(`It's ${temperature} in ${city}`);
}

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}

const {title, author} = book;
const {name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName);



// ARRAY DESTRUCTURING

const address = ['1299 S Juniper Street', 'Philadelphia', 'Ohio', '19123'];

const [, city2, state = 'New York'] = address;

//console.log(`You are in ${address[1]} ${address[2]}`)
console.log(`You are in ${city2}, ${state}`)
