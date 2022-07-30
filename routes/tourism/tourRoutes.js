const express = require('express');
const router = express.Router();

const TourService = require('../../services/tourService');

router.get('/', async(req, res) =>{
    res.end("You are in the sauce")
});

router.get('/allsummary', async (req,res,next)=>{
    const allToursSummary =  new TourService().getAllToursSummary();
    res.send(allToursSummary);
})

router.get('/caire',async (req,res,next)=>{
    const tour = new TourService().getCaireTour();
    res.send(tour);
})

router.get('/dubai', async (req,res,next)=>{
    const tour = new TourService().getDubaiTour();
    res.send(tour);
})

router.get('/israel', async (req,res,next)=>{
    const tour =  new TourService().getIsrael();
    res.send(tour);
})

router.get('/kribi',async (req,res,next)=>{
    const tour = new TourService().getKribiTour();
    res.send(tour);
})

router.get('/showcased', async (req,res,next) => {
    const tours = new TourService().getShowcasedTours();
    res.send(tours)
})

router.get('/spotlighted', async (req,res,next) => {
    const tours = new TourService().getSpotlightedTours();
    res.send(tours)
})


/*
    router.get('/israel-egypte',async (req,res,next)=>{
        const tour = new TourService().getIsraelEgypteTour();
        res.send(tour);
    })
*/



module.exports = router;