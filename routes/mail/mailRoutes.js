const express = require('express');
const router = express.Router();

const MailService = require('../../services/mailService');

router.get('/', async(req, res) =>{

    res.send('mail router')
});

router.post('/contact', async (req,res,next)=>{
        
    const { civility, firstname, lastname, email, phone, preference, subject, message } = req.body;
    new MailService().sendContactMail(civility, firstname, lastname, email, phone, preference, subject, message)
    .then((result)=>
        res.json({message: 'success'})
    )
    .catch((err)=>
        res.json({message: 'error'})
    );
  
})

router.post('/flight', (req,res,next)=>{

    const { way, cabine, departure, arrival, dateDep, dateRet, adult, child, infant, lastname, email, phone, message } = req.body;
    new MailService().sendFlightMail(way, cabine, departure, arrival, dateDep, dateRet, adult, child, infant, lastname, email, phone, message) 
    .then((result)=>
        res.json({message: 'success'})
    )
    .catch((err)=>
        res.json({message: 'error'})
    );

})

router.post('/dhl', (req,res,next)=>{

    const { civility, firstname, lastname, email, phone, country, weight, contains, dimensions } = req.body;
    new MailService().sendDhlMail(civility, firstname, lastname, email, phone, country, weight, contains, dimensions)
    .then((result)=>
        res.json({message: 'success'})
    )
    .catch((err)=>
        res.json({message: 'error'})
    );

})

router.post('/car', (req,res,next)=>{

    const {reason, town, capacity, driver, dateDeb, dateFin, heureDeb, heureFin, extras, civility, firstname, lastname, email, phone} = req.body;
    new MailService().sendCarMail(reason, town, capacity, driver, dateDeb, dateFin, heureDeb, heureFin, extras, civility, firstname, lastname, email, phone) 
    .then((result)=>
        res.json({message: 'success'})
    )
    .catch((err)=>
        res.json({message: 'error'})
    );

})

router.post('/apart', (req,res,next) =>{
    
    const {type, town, dateDeb, dateFin, extras, civility, firstname, lastname, email, phone} = req.body;
    new MailService().sendApartMail(type, town, dateDeb, dateFin, extras, civility, firstname, lastname, email, phone)
    .then((result)=>
        res.json({message: 'success'})
    )
    .catch((err)=>
        res.json({message: 'error'})
    );

})

router.post('/hostel', (req,res,next) =>{
    
    const {nbr, town, dateDeb, dateFin, extras, civility, firstname, lastname, email, phone, hotels} = req.body;
    new MailService().sendHostelMail(nbr, town, dateDeb, dateFin, extras, civility, firstname, lastname, email, phone,hotels) 
    .then((result)=>
        res.json({message: 'success'})
    )
    .catch((err)=>
        res.json({message: 'error'})
    );

})


router.post('/car-paris', (req,res,next) =>{
    
    const {departure, arrival, date, hour, civility, firstname, lastname, email} = req.body;
    new MailService().sendCarParisMail(departure, arrival, date, hour, civility, firstname, lastname, email) 
    .then((result)=>
        res.json({message: 'success'})
    )
    .catch((err)=>
        res.json({message: 'error'})
    );
})

router.post('/tour', (req,res,next) =>{
    
    const {circuit,date,logement,civility,lastname,firstname,email,nombrePassagerAdult,nombrePassagerEnfant,nombrePassagerBebe} = req.body;
    new MailService().sendTourMail(circuit,date,logement,civility,lastname,firstname,email,nombrePassagerAdult,nombrePassagerEnfant,nombrePassagerBebe)
    .then((result)=>
        res.json({message: 'success'})
    )
    .catch((err)=>{
        res.json({message: 'error'})}
    );

})


router.post('/newsletter', (req,res,next) =>{
    
    const {email} = req.body;
    new MailService().addToNewsletter(email)
    .then((result)=>
        res.json({message: 'success'})
    )
    .catch((err)=>
        res.json({message: 'error'})
    );
})






module.exports = router;