(function() {
    function SongPlayer(Fixtures) {
        
        var SongPlayer = {};
        
        /**
        * @desc holds the contents of the current album object including title, artist, label, yeay, albumArtUrl, and an array of song objects each with a title, duration, and audioUrl.
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc plays currentBuzzObject and sets the boolean value of the song's playing method to true
        * @param {Object} song
        */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        
        
        /**
        * @function getSongIndex
        * @desc returns the index of the input song object
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }
        
        /**
        * @desc Holds the currently playing song data
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @function SongPlayer.play
        * @desc handles playing the music when the play button is clicked.
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            console.log(getSongIndex(song));
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    //currentBuzzObject.play();
                    playSong(song);
                }
            }
        };
        
        /**
        * @function SongPlayer.pause
        * @desc handles pausing the music when the pause button is clicked.
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }
        
        /**
        * @function SongPlayer.previous
        * @desc decrements the index of the current song by one and plays the previous track in the album
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();