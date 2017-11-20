let mongoose = require('mongoose');

const FloorplanSchema = new mongoose.Schema({
    _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    name: String,
    type: String,
    version: Number,
    blueprint: String,
    thumb_300: String,
    thumb_2000: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    toJSON: {
        virtuals: true
    }
});
FloorplanSchema.virtual('thumb_300_url').get(function() {
    return this.thumb_300 ? `https://storage.googleapis.com/floorplans-store/${this.thumb_300}` : "";
});
FloorplanSchema.virtual('thumb_2000_url').get(function() {
    return this.thumb_2000 ? `https://storage.googleapis.com/floorplans-store/${this.thumb_2000}` : "";
});
FloorplanSchema.virtual('blueprint_url').get(function() {
    return `https://storage.googleapis.com/floorplans-store/${this.blueprint}`;
});

module.exports = mongoose.model('Floorplan', FloorplanSchema);