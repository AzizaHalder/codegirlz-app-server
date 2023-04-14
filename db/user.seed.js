// have an array of database
// connect to database 
// call user.create many method using the array 

const connect = require('./index')
const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const Resource = require('../models/Resource.model')

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
},
{
    "email": "zoe@gmail.com",
    "password": "$2b$10$vKMSVgTqs.v6mGyJQqqqsO8xrHYMd.VeWRdcMmEuhxOMahfzG.ryK",
    "name": "Zoe",
    "currentLocation": "Havana, Cuba",
    "city": "Havana",
    "level": "Intermediate",
    "linkedin": "http://www.linkedin.com/",
    "github": "https://github.com/",
    "newOpp": true,
    "eventsAttended": [],
    "myResource": [],
    "profileImg": "https://api.dicebear.com/6.x/pixel-art/svg?seed=Charlie",
    "description": "I am passionate about educational technology and pioneering AI learning models."
}, {
    "email": "ananya@gmail.com",
    "password": "$2b$10$KOqYu4aKoSbI7RVJqPnQ/.8HE.hRJlOWA/85qDwNSYy47KE.UJkDC",
    "name": "Ananya",
    "currentLocation": "Chennai, Tamil Nadu, India",
    "city": "Chennai",
    "level": "Entry Level",
    "linkedin": "http://www.linkedin.com/",
    "github": "https://github.com/",
    "newOpp": true,
    "eventsAttended": [],
    "myResource": [],
    "profileImg": "https://api.dicebear.com/6.x/pixel-art/svg?seed=Bailey",
    "description": "Frontend developer who loves flexbox."
}, {
    "email": "jack@gmail.com",
    "password": "$2b$10$Jj6exCgOXjQkIAYMbVcooOtQFwYcV551VUKgtmodaq.K/rzvhLuIW",
    "name": "Jack",
    "currentLocation": "Marco de Canaveses, Portugal",
    "city": "Marco de Canaveses",
    "level": "Junior",
    "linkedin": "http://www.linkedin.com/",
    "github": "https://github.com/",
    "newOpp": true,
    "eventsAttended": [],
    "myResource": [],
    "profileImg": "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Boots",
    "description": "Ruby on the Rails. SQL. Punk Rock."
}, {
    "email": "jada@gmail.com",
    "password": "$2b$10$bMFv.iGHPCTOWsPjuRGtMexnYMFOSF4f77O6gKBcPDl8xVtzGeAGi",
    "name": "Jada",
    "currentLocation": "Tel Aviv University, Tel Aviv-Yafo, Israel",
    "city": "Tel Aviv",
    "level": "Entry Level",
    "linkedin": "http://www.linkedin.com/",
    "github": "https://github.com/",
    "newOpp": false,
    "eventsAttended": [],
    "myResource": [],
    "profileImg": "https://api.dicebear.com/6.x/pixel-art/svg?seed=Bob",
    "description": "Love developing projects which bring communities together. "
}, {
    "email": "imani@gmail.com",
    "password": "$2b$10$1j7NkDS6rKkRxmGSsx0ST.6mM26jDrZuSzY9QPhBOIT.tpdIWy08e",
    "name": "Imani",
    "currentLocation": "Osogbo City Hall Olonkoro, Oke Fia Road, Osogbo, Nigeria",
    "city": "Osogbo",
    "level": "Intermediate",
    "linkedin": "http://www.linkedin.com/",
    "github": "https://github.com/",
    "newOpp": false,
    "eventsAttended": [],
    "myResource": [],
    "profileImg": "https://api.dicebear.com/6.x/pixel-art/svg?seed=Lilly",
    "description": "Data lover. Give me a data set and I'll make you a model worth your time."
}]

// const passHashed = users.map(user => {
//     const hash = bcrypt.hashSync(user.password, 10)
//     console.log(user.email)
//     return { ...user, password: hash }
// })

const userMap = users.map(user => {
    return user
});


// User.create(passHashed).then(resp => console.log(resp)).catch(err => console.log(err));
User.create(userMap).then(resp => console.log(resp)).catch(err => console.log(err));



// const resources = [{
//     "resourceTitle": "Introduction to ChatGPT: A Practical Guide",
//     "resourceImage": "https://res.cloudinary.com/ddieot9rc/raw/upload/v1681239768/code-girlz/e8jw65zx2wp2x4hrul5r",
//     "resourceURL": "https://skaf.medium.com/an-introduction-to-chatgpt-a-practical-guide-3ad6d5c1e7fb#:~:text=Using%20ChatGPT%20is%20simple.,a%20general%20conversation%20with%20it.",
//     "resourceContent": "",
//     "resourceType": "Article",
//     "videoUpload": "",
//     "podcastUpload": "",
//     "author": {
//         "$oid": "6432fa3b0006ad03e945e132"
//     },
//     "comments": [
//         {
//             "$oid": "6435bd71658267a2b832aa91"
//         },
//         {
//             "$oid": "6435c103658267a2b832aac6"
//         }
//     ]
// }, {
//     "resourceTitle": "The GeoJSON Format",
//     "resourceImage": "https://res.cloudinary.com/ddieot9rc/raw/upload/v1681240118/code-girlz/x5w6xc35quewrdpm6txn",
//     "resourceURL": "https://www.rfc-editor.org/rfc/rfc7946",
//     "resourceContent": "",
//     "resourceType": "Article",
//     "videoUpload": "",
//     "podcastUpload": "",
//     "author": {
//         "$oid": "6432fa3b0006ad03e945e132"
//     },
//     "comments": [
//         {
//             "$oid": "6435bdcc658267a2b832aa9a"
//         },
//         {
//             "$oid": "6435c06c658267a2b832aaaf"
//         },
//         {
//             "$oid": "6435c0bc658267a2b832aabb"
//         }
//     ]
// }, {
//     "resourceTitle": "Becoming a Frontend Developer in 100 Days: A Step-by-Step Guide",
//     "resourceImage": "https://res.cloudinary.com/ddieot9rc/raw/upload/v1681240473/code-girlz/xuzzdwwdmjzulmcdctka",
//     "resourceURL": "https://dev.to/abhixsh/becoming-a-frontend-developer-in-100-days-a-step-by-step-guide-28jp",
//     "resourceContent": "",
//     "resourceType": "Article",
//     "videoUpload": "",
//     "podcastUpload": "",
//     "author": {
//         "$oid": "64357cf8c0013c822d77d6ad"
//     },
//     "comments": [
//         {
//             "$oid": "6435c04d658267a2b832aaa4"
//         },
//         {
//             "$oid": "6435c13c658267a2b832aad1"
//         }
//     ]
// }, {
//     "resourceTitle": "What you need to know before transitioning from JavaScript to React: A Guide",
//     "resourceImage": "https://res.cloudinary.com/ddieot9rc/raw/upload/v1681240609/code-girlz/dugbkotrg42g6qsupiam",
//     "resourceURL": "https://dev.to/kelvintech_99/what-you-need-to-know-before-transitioning-from-javascript-to-react-a-guide-1ij7",
//     "resourceContent": "",
//     "resourceType": "Article",
//     "videoUpload": "",
//     "podcastUpload": "",
//     "author": {
//         "$oid": "64357cf8c0013c822d77d6ad"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "Explaining \"this\" Keyword In JavaScript Like You're Five",
//     "resourceImage": "https://res.cloudinary.com/ddieot9rc/raw/upload/v1681240738/code-girlz/m1o5tbbklerxl6fd5gon",
//     "resourceURL": "https://dev.to/vayo/explaining-this-keyword-in-javascript-like-youre-five-191",
//     "resourceContent": "",
//     "resourceType": "Article",
//     "videoUpload": "",
//     "podcastUpload": "",
//     "author": {
//         "$oid": "64357cf8c0013c822d77d6ad"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "How a Single Mom in a Shelter Became a Successful Software Developer",
//     "resourceImage": "",
//     "resourceURL": "",
//     "resourceContent": "Saron sits down with Brittney Ball, Documentation Engineer at Meta. Brittney shares her experience going from being a homeless single mom living in a shelter to a Software Engineer. She talks about her journey to get to where she is today, the role a viral tweet played in kick-starting her coding journey. ",
//     "resourceType": "Podcast",
//     "videoUpload": "",
//     "podcastUpload": "/6JEtnit8uz81mQaIGS4f7c?si=28e39e55c435429d",
//     "author": {
//         "$oid": "64357cf8c0013c822d77d6ad"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "Coding Bootcamps & Coding Journeys",
//     "resourceImage": "",
//     "resourceURL": "",
//     "resourceContent": "In this final episode of Season 22,  Saron speaks with Mark Thompson, Senior Developer Relations Engineer at Google. Mark loves to teach and code. He is an award winning university instructor and engineer with a passion for creating meaningful learning experiences. Listen as they discuss Mark's interest in code, coding bootcamps and how to manage your career.",
//     "resourceType": "Podcast",
//     "videoUpload": "",
//     "podcastUpload": "/1zhOKw5o3U6vFl9B7gEcBv?si=b7521db193564aca",
//     "author": {
//         "$oid": "6434369e9713970c0d859b37"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "Don Norman: Design Matters with Debbie Millman",
//     "resourceImage": "",
//     "resourceURL": "",
//     "resourceContent": "Don Norman, the Godfather of UX Design and Cognitive Science's foremost pioneer, joins to discuss his new book \"Design for a Better World\" and how human behavior can save the world from its dire predicament. ",
//     "resourceType": "Podcast",
//     "videoUpload": "",
//     "podcastUpload": "/0kGtRmCrizCGt6Ua7fahSf?si=8e3cf00ab6b04316",
//     "author": {
//         "$oid": "6434369e9713970c0d859b37"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "Brene with Debbie Millman on Why Design matters",
//     "resourceImage": "",
//     "resourceURL": "",
//     "resourceContent": "In this episode, I'm talking with the legendary Debbie Millman- designer, author, educator, curator, brand strategist, and host of the long running, multi-award winning podcast Design Matters - about her new book, Why Design matters: Conversations With The World's Most Creative People. ",
//     "resourceType": "Podcast",
//     "videoUpload": "",
//     "podcastUpload": "/4osFS16WON0H4KjG29sbsP?si=065e6787862a4f1a",
//     "author": {
//         "$oid": "64357e32c0013c822d77d6b5"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "Lea Verou: The Humble Border-radius",
//     "resourceImage": "",
//     "resourceURL": "",
//     "resourceContent": "How border-radius works. In extreme depth.",
//     "resourceType": "Video",
//     "videoUpload": "https://www.youtube.com/watch?v=b9HGzJIcfDE",
//     "podcastUpload": "",
//     "author": {
//         "$oid": "64357e32c0013c822d77d6b5"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "What Is JWT and Why Should You Use JWT",
//     "resourceImage": "",
//     "resourceURL": "",
//     "resourceContent": "JSON Web Tokens (JWT) are talked about all the time, but what exactly are they and how do they work. In this video I will explain in depth exactly what JWT is, how it works, why it is secure, and when you should use it. We will go through multiple visual demonstrations of exactly how and why JWT works. We will also compare JWT to the more common and traditional session based user authorization. By the end of this video you will have a complete understanding of JWT, how it works, and when you should use it.",
//     "resourceType": "Video",
//     "videoUpload": "https://www.youtube.com/watch?v=7Q17ubqLfaM",
//     "podcastUpload": "",
//     "author": {
//         "$oid": "64357e32c0013c822d77d6b5"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "Building An API is Half The Battle ",
//     "resourceImage": "",
//     "resourceURL": "",
//     "resourceContent": "Kong is a cloud-native API platform. The first iteration of an API marketplace Marco and his colleagues built was Mashape. ",
//     "resourceType": "Podcast",
//     "videoUpload": "",
//     "podcastUpload": "/2tJLhfhtbW2sQLW9ySrw3z?si=3f9a6f83e3b246a3",
//     "author": {
//         "$oid": "64357e32c0013c822d77d6b5"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "Learn useContext in 13 Minutes",
//     "resourceImage": "",
//     "resourceURL": "",
//     "resourceContent": "In this video I cover everything you need to know about the useContext hook. I go over all the main use cases for useContext as well as many common mistakes that developers make. This is part of a series of React videos where I cover all the important hooks in React.",
//     "resourceType": "Video",
//     "videoUpload": "https://www.youtube.com/watch?v=5LrDIWkK_Bc",
//     "podcastUpload": "",
//     "author": {
//         "$oid": "64357f1fc0013c822d77d6bd"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "ReactJs The Documentary",
//     "resourceImage": "",
//     "resourceURL": "",
//     "resourceContent": "React is easily one of the single most popular libraries in use today. Given that it was made within a juggernaut like Facebook, you might have assumed it was always destined for success.\n\nWhat if we told you that React’s first brush with the public sphere was anything but glamorous? React.js: The Documentary brings you the full story behind the early days of React, focusing on the dedicated group of developers who helped bring it to the world stage. This story is told by an all-star cast of developers like Tom Occhino, Christopher Chedeau, Pete Hunt, Sebastian Markbåge, Dan Abramov, and many more.",
//     "resourceType": "Video",
//     "videoUpload": "https://www.youtube.com/watch?v=8pDqJVdNa44",
//     "podcastUpload": "",
//     "author": {
//         "$oid": "64357f1fc0013c822d77d6bd"
//     },
//     "comments": []
// }, {
//     "resourceTitle": "How To Think Like a Programmer",
//     "resourceImage": "",
//     "resourceURL": "",
//     "resourceContent": "Learning to program is hard because programming feels different than other skills. But programming isn't about the languages - it is about the way one should think. ",
//     "resourceType": "Video",
//     "videoUpload": "https://www.youtube.com/watch?v=azcrPFhaY9k",
//     "podcastUpload": "",
//     "author": {
//         "$oid": "64357f1fc0013c822d77d6bd"
//     },
//     "comments": []
// }]

// const resourceMap =
//     resources.map(resource => {
//         return resource
//     })

// Resource
//     .create(resourceMap)
//     .then(resp => console.log(resp))
//     .catch(err => console.log(err));