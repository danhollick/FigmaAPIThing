var express = require('express')
var app = express()
var fetch = require('isomorphic-fetch')
require('dotenv').config();

const FigmaAPIKey = process.env.API_KEY
const FigmaFileID = 'VAyAHaZn1tHmjOFK79pbnMTj'

async function figmaFileFetch(fileId){
    let result = await fetch('https://api.figma.com/v1/files/' + fileId , {
        method: 'GET',
        headers: {
            'X-Figma-Token': FigmaAPIKey
        }
    })

    let figmaFileStruct = await result.json()

    let figmaFrames = figmaFileStruct.document.children
        .filter(child => child.type === 'CANVAS')[0].children
        .filter(child => child.type === 'FRAME')

        .map(frame => {
            return {
                name: frame.name,
                id: frame.id
            }
        })

    let ids = figmaFrames.map(comp => comp.id).join(',')

    let imageResult = await fetch('https://api.figma.com/v1/images/' + fileId + '?scale=2&ids=' + ids, {
        method: 'GET',
        headers: {
            'X-Figma-Token': FigmaAPIKey
        }
    }).catch(error => console.log(error))

    let figmaImages = await imageResult.json()

    figmaImages = figmaImages.images


    return figmaFrames.map(frame => {
        return {
            name: frame.name,
            url: figmaImages[frame.id]
        }
    })
}


app.use('/test', async function (req, res, next) {
    let result = await figmaFileFetch(FigmaFileID).catch(error => console.log(error))
    console.log(result)
    res.send(result)
})

app.listen(3001, console.log("Holy shit, I'm a server and I am listening on port 3001"))
