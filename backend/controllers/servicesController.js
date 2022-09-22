const Services = require("../models/Services.js");
const Room = require("../models/Room.js")

const createService = async (req, res, next) => {
    const newService = new Services(req.body)

    try{
        const savedService = await newService.save();
        res.status(200).json(savedService);
    }catch(err){
        next(err);
    }
}


const updateService = async (req, res, next) => {
    try{
        const updatedService = await Services.findByIdAndUpdate(req.params.id,
             {$set: req.body},
             {new: true}
             );
        res.status(200).json(updatedService);
    }catch(err){
        next(err);
    }
}


const deleteService = async (req, res, next) => {
    try{
        await Services.findByIdAndDelete(req.params.id);
        res.status(200).json("Service has been deleted");
    }catch(err){
        next(err);
    }
}


const getService = async (req, res, next) => {
    try{
        const getServicebyId = await Services.findById(req.params.id);
        res.status(200).json(getServicebyId);
    }catch(err){
        next(err);;
    }
}

const getServices = async (req, res, next) => {
    const {min, max, ...others} = req.query;
    try{
        const getAllService = await Services.find({...others, 
            cheapestPrice: {$gt: min | 1, $lte:max || 999}}).limit(req.query.limit);
        res.status(200).json(getAllService);
    }catch(err){
        next(err);
    }
}

const getServiceRoom = async (req, res, next)=>{
    try{
        const service = await Services.findById(req.params.id)
        const list = await Promise.all(service.rooms.map(room=>{
            return Room.findById(room);
        }));
        res.status(200).json(list);
    }catch(err){
        next(err)
    }
}


module.exports = {createService, updateService, deleteService, getService, getServices, getServiceRoom};