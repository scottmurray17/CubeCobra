const mongoose = require('mongoose');

const Datapoint = {
  elo: Number,
  rating: Number,
  picks: Number,
  cubes: Number,
  prices: [
    {
      version: String,
      price: Number,
      price_foil: Number,
      price_etched: Number,
      eur: Number,
      tix: Number,
    },
  ],
  size180: [Number],
  size360: [Number],
  size450: [Number],
  size540: [Number],
  size720: [Number],
  pauper: [Number],
  peasant: [Number],
  legacy: [Number],
  modern: [Number],
  standard: [Number],
  vintage: [Number],
  total: [Number],
};

// card schema for analytics only. Use card objects for most use cases
const cardHistorySchema = mongoose.Schema({
  // Normal card name, not lowercased.
  cardName: String,
  oracleId: {
    type: String,
    unique: true,
  },
  versions: [String], // Card IDs for all versions of this card.
  current: Datapoint,
  cubedWith: {
    // oracle ID
    synergistic: [String],
    top: [String],
    creatures: [String],
    spells: [String],
    other: [String],
  },
  history: {
    type: [
      {
        date: String,
        data: Datapoint,
      },
    ],
    default: [],
  },
});

const CardHistory = mongoose.model('CardHistory', cardHistorySchema);

module.exports = CardHistory;
