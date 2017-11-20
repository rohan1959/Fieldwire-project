let mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    floorplans : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Floorplan' }]
});

module.exports = mongoose.model('Project', ProjectSchema);