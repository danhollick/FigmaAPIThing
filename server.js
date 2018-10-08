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

    let figmaFrames = figmaFileStruct.document.children
        .filter(child => child.type === 'CANVAS')[0].children
        .filter(child => child.type === 'FRAME')
    // console.log(JSON.stringify(figmaFrames))
        .map(frame => {
            return {
                name: frame.name,
                id: frame.id
            }
        })

    // console.log(JSON.stringify(figmaFrames))

    // let ids = figmaFrames.map(comp => comp.id).join(',')
    // console.log(JSON.stringify(ids))

    // let imageResult = await fetch('https://api.figma.com/v1/images/' + figmaId + '?scale=3&ids=' + ids, {
    //     method: 'GET',
    //     headers: {
    //         'X-Figma-Token': FigmaAPIKey
    //     }
    // }).catch(error => console.log(error))

    // let figmaImages = await imageResult.json().catch(error => console.log(error))
    // console.log(JSON.stringify(figmaImages))
    // figmaImages = figmaImages.images
    // console.log(JSON.stringify(figmaImages))


    return figmaFileStruct
}



app.use('/', async function (req, res, next) {
    let result = await figmaFileFetch(FigmaFileID).catch(error => console.log(error))
    res.send(JSON.stringify(result))
})

app.listen(3001, console.log("Holy shit, I'm a server and I am listening on port 3001"))
