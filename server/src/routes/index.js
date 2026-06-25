const express = require('express')
const questionario = require('./questionarioRoutes')


module.exports = app => {
    app.use(express.json(),
            express.urlencoded({ extended: false }),
            questionario
            )
}