//Attributes of a User table
const SongSchema = new Schema({
    userName: String,
    title: String,
    file: String,
    comment: Map,
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;