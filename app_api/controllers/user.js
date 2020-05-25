const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUsers = async (req, res) => {
    console.log('Get Users. ');
    try {
        const results = await User.find().exec();
        console.log('Fetched Users.');
        res.status(200).json(results);
    } catch (err) {
        console.log('Failed to fetch Users: ' + err);
        res.status(404).json(err);
    }
};

const deleteUser = async (req, res) => { 
    console.log('Delete a User: ' + JSON.stringify(req.params.userID));
    try {
        const result = await User.deleteOne({_id:req.params.userID}).exec();
        console.log('Deleted a User: ' + JSON.stringify(result));
        res.status(200).json(result);
    } catch (err) {
        console.log('Failed to delete a User: ' + err);
        res.status(404).json(err);
    }    
};

module.exports = {
    getUsers,
    deleteUser
};