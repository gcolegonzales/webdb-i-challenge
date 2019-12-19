const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: 'Hello there!' })
    })

server.get('/accounts', async (req, res, next) => {
    try {
        let accounts = await db('accounts')
        res.json(accounts)
    }

    catch {
        next(err)
    }
})

server.get('/accounts/:id', async (req, res, next) => {
    try {
        const data = await db('accounts').where('id', req.params.id)
        res.json(data)
    }

    catch(err) {
        next(err)
    }
})

server.post('/accounts', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        const addedItem = await db('accounts').insert(payload)
        res.json(addedItem)
    }
    
    catch(err) {
        next(err)
    }
})

server.delete('/accounts/:id', async (req, res, next) => {
    try {
        await db("accounts").where("id", req.params.id).del()
        res.json(204).end()
    }
    catch(err) {
        next(err)
    }
})

server.put('/accounts/:id', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        const update = await db('accounts').where('id', req.params.id).update(payload)
        res.json(update)
    }

    catch(err) {
        next(err)
    }
})

server.use('/', (err, req, res, next) => {
    res.status(500).json(err)
})

module.exports = server;