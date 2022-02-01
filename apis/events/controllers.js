const Event = require("../../db/models/Event")

exports.getEvents= async (req, res) => {
    const bysDate = req.body.startDate;
    try {
        if (!bysDate) {
        const events = await Event.find({},{"organizer": 0,"email": 0,"image": 0,"numOfSeats": 0, "bookedSeats": 0, "endDate": 0});
        res.json({ events });
        }
        else if (bysDate) {
        const aftersDate = await Event.find({ startDate: { $gte: req.body.startDate }},{"organizer": 0,"email": 0,"image": 0,"numOfSeats": 0, "bookedSeats": 0, "endDate": 0})
        res.json(aftersDate);
        }
        else {
        res.status(404).json({ message: "Event Not Found !"});
        }
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

exports.getDetails = async (req,res) => {
    try {
    const { id } = req.params;
    const event = await event.find((e) => e.id === id)
    res.json(event); 
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

exports.postEvents = async (req, res) => {
    try {
    const newEvent = await Event.create(req.body)
    res.status(201).json(newEvent); 
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

exports.deleteEvents = async (req, res) => {
    try {
    const { eventId } = req.params;
    const findEvent = await Event.findByIdAndDelete({ _id: eventId });
    if (findEvent){
    res.status(204).end();
    }
    else {
    res.status(404).json({ message: "Event Not Found !"});
    }
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

exports.updateEvents = async (req, res) => {
    try{
    const { eventId } = req.params;
    const event = await Event.findByIdAndUpdate({_id: eventId}, req.body,{new: true, runValidators: true,})
    if (event) {
    res.json(event);
    }
    else {
    res.status(404).json({ message:"Event Not Found"})
    }
    }
    catch(error) {
    res.status(500).json({ message: error.message });
    }
};

exports.bookedEvents = async (req, res) => {
    try {
    const fullyBooked = await Event.find({ $expr: { $eq:["$numOfSeats", "$bookedSeats"]}});
    if (fullyBooked) {
    res.status(201).json(fullyBooked);
    }
    else {
    res.status(404).json({ message:"Events Not Found"});}
    } 
    catch(error) {
    res.status(500).json({ message: error.message });
    }
};

exports.searchForEvent = async (req, res) => {
    try {
    const { eventName } = req.params;
    const findName = await Event.find({ name: eventName});
    if (findName){
    res.status(201).json(findName);
    }
    else {
    res.status(404).json({ message:"Events Not Found"});    
    }
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}