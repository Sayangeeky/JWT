const express = require('express')
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())
const jwtPassword = "123456"

const ALL_USERS = [
    {
        username: "sayan@gmail.com",
        password: "123",
        name: "Sayan Dasgupta"
    },
    {
        
        username: "biswadip@gmail.com",
        password: "456",
        name: "Biswadip Saha"
    },
    {
        
        username: "debanil@gmail.com",
        password: "789",
        name: "Debanil Mukhpadhaya"
    }
]

function userExists(username, password){
    let userExists = false

    for(let i=0; i<ALL_USERS.length; i++){
        if(ALL_USERS[i].username == username && ALL_USERS[i].password == password)
            userExists = true
    }


    return userExists
}

app.post('/signin', (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    if(!userExists(username,password)){
        return res.status(403).json({
            msg: "User doesn't exist"
        })
    }

    var token = jwt.sign({username: username}, jwtPassword)
    return res.json({
        token
    })
})

app.get('/users', (req,res)=>{
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token, jwtPassword)
        const username = decoded.username
        console.log(username);
        res.json({
            users: ALL_USERS
        })
    } catch (error) {
        return res.status(403).json({
            msg: "Invalid token"
        })
    }
})

app.listen(5000) 