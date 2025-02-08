//Attributes of a User table
const SongSchema = new Schema({
    userName: String,
    title: String,
    song_file: String
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;