//Attributes of a User table
const SongSchema = new Schema({
    userName: String,
    song_file: String
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;