const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}] // we will update this field a bit later when we create review model
  });

module.exports = model('Restaurant', restaurantSchema);