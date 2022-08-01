const express = require('express');
const router = express.Router();

const EmployeService = require('../../services/employeService');

router.get('/', async(req, res) =>{

    res.end("You are in the sauce")
});

router.get('/list', async(req, res) =>{

    const employeList = new EmployeService().getEmployees();
    res.send(employeList);
});

module.exports = router;