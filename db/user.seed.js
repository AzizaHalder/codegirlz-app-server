// have an array of database
// connect to database 
// call user.create many method using the array 

const connect = require('./index')
const User = require('../models/User.model')
const bcrypt = require('bcrypt')

const users = [{
    "email": "jerry@gmail.com",
    "password": "$2b$10$YKPlp4naeNuxl25STuk0lOAIyGuLFOY/BPoeSphYKy81xWWMUx1O.",
    "name": "Jerry Bell",
    "currentLocation": "Havana, Cuba",
    "city": "Narayanganj",
    "level": "Intermediate",
    "linkedin": "www.linkedin.com/in/cnicolebell",
    "github": "https://github.com/ozzleme",
    "newOpp": true,
    "eventsAttended": [],
    "myResource": [],
    "profileImg": "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Abby",
    "description": "this is the description of myself.",
}, {

    "email": "kerri@gmail.com",
    "password": "$2b$10$MDTVygEKqnakLYnUlHSUm.CvztKR50eu2onZVxUFAXxDmBAG/0Lpa",
    "name": "Kerri Koziel",
    "currentLocation": "Sea Bird Apartment, New Kantwadi Road, Pali Hill, Mumbai, Maharashtra, India",
    "city": "Mumbai",
    "level": "Junior",
    "linkedin": "http://www.linkedin.com/",
    "github": "https://github.com/",
    "newOpp": true,
    "eventsAttended": [],
    "myResource": [],
    "profileImg": "https://api.dicebear.com/6.x/pixel-art/svg?seed=Buster",
    "description": "I am an engineer interested in projects which enable humans to study space using AI and robotics.",

}, {

    "email": "coral@gmail.com",
    "password": "$2b$10$1ug7QWXuozyeSd8Vni4MHOiKE8NGDeLt7HjbHrtGt1p.rgqVgwKau",
    "name": "Coral Fin",
    "currentLocation": "Brisbane Entertainment Centre, Melaleuca Drive, Boondall QLD, Australia",
    "city": "Brisbane",
    "level": "Lead",
    "linkedin": "http://www.linkedin.com/",
    "github": "https://github.com/",
    "newOpp": true,
    "eventsAttended": [],
    "myResource": [],
    "profileImg": "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Bob",
    "description": "I am a MERN stack engineer that is designing the best experience for users. ",
}, {
    "email": "maria@gmail.com",
    "password": "$2b$10$5y4mGVHGpW3VmhpCDQ0n8OibIb/3KkEW.htxp0Jekxpf0AtQRV6c.",
    "name": "Maria",
    "currentLocation": "Washington University in St. Louis, Brookings Dr, St. Louis, MO, USA",
    "city": "St Louis",
    "level": "Entry Level",
    "linkedin": "http://www.linkedin.com/",
    "github": "https://github.com/",
    "newOpp": false,
    "eventsAttended": [],
    "myResource": [],
    "profileImg": "https://api.dicebear.com/6.x/pixel-art/svg?seed=Lucy",
    "description": "I am a frontend developer passionate about creating digital solutions to customer problems. ",
}, {
    "email": "rosa@gmail.com",
    "password": "$2b$10$ILSS0lJrdaoC5CqacPyj8Ob.Qfl7LcAaLPiKOfLYv/DJdwO/B0z0O",
    "name": "Rosa",
    "currentLocation": "Lviv National Opera, Svobody Avenue, Lviv, Lviv Oblast, Ukraine",
    "city": "Lviv",
    "level": "Entry Level",
    "linkedin": "http://www.linkedin.com/",
    "github": "https://github.com/ozzleme",
    "newOpp": false,
    "eventsAttended": [],
    "myResource": [],
    "profileImg": "https://api.dicebear.com/6.x/pixel-art/svg?seed=Boots",
    "description": "I am a ChatPT pro and robotics genius.",
}]

const passHashed = users.map(user => {
    const hash = bcrypt.hashSync(user.password, 10)

    return { ...user, password: hash }
})

// console.log(passHashed)

User.create(passHashed).then(resp => console.log(resp)).catch(err => console.log(err))