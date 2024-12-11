const mongoose = require('mongoose');

const ArtisanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ['artisan', 'user'],
        default: 'artisan'
    }
});

const Artisan = mongoose.model('Artisan', ArtisanSchema);

module.exports = Artisan;
