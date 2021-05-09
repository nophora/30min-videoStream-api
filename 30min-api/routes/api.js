const express = require('express');

const router = express.Router();
const fs = require('fs')
const path = require('path')


//VIDEO STREAM
router.get('/videostream/:id', (req, res, error) => {

    const filename = { file: req.params.id }
    console.log(req.params.id )
    const paths = `./routes/video/${filename.file}`

    const streams = (path) => {
        const stat = fs.statSync(path)


        const fileSize = stat.size
        const range = req.headers.range

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
            const chunkSize = (end - start) + 1
            const file = fs.createReadStream(path, { start, end })
            const head = {
                'Content-Range': `bytes ${start} - ${end} / ${fileSize}`,
                'Content-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'content-Type': 'video/mp4'
            }
            res.writeHead(206, head)
            file.pipe(res)

        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4'
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
        }

    }


    fs.exists(paths, (file) => {
        if (file) {
            const path = `./routes/video/${filename.file}`
            streams(path)
          
        }
        else {
            const path = `./routes/video/male.mp4`
            streams(path)
          
        }
    })



})

module.exports = router;
