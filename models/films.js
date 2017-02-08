/**
 * Created by Vlad on 28.01.2017.
 */
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var filmSchema = new Schema( {
    title: String,
    releaseYear: Number,
    format: String,
    stars: String
}); // создание конструктора
filmSchema.index({ title: "text", stars: "text" });
 module.exports = mongoose.model('Film', filmSchema);
