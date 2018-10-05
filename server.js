var express = require('express')
var app = express()
var fetch = require('isomorphic-fetch')
require('dotenv').config();

const FigmaAPIKey = process.env.API_KEY
const FigmaFileID = 'VAyAHaZn1tHmjOFK79pbnMTj'

async function figmaFileFetch(projectId){
    let result = await fetch('https://api.figma.com/v1/files/' + projectId , {
        method: 'GET',
        headers: {
            'X-Figma-Token': FigmaAPIKey
        }
    })

    let figmaFileStruct = await result.json()

    return figmaFileStruct
}

app.use('/', async function (req, res, next) {
    let result = await figmaFileFetch(FigmaFileID).catch(error => console.log(error))
    res.send(JSON.stringify(result))
})

app.listen(3001, console.log("Holy shit, I'm a server and I am listening on port 3001"))
