(function() {
    function SongPlayer(Fixtures) {
        
        var SongPlayer = {};
        
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
            
            // 1. Check to see if there's a current buzz object
            if (currentBuzzObject) {
                // 2. If there is, stop it from playing
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            
            // 3. Create  a new buzz sound instance for the song
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            // 4. Set the current song to this song
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
        * @function stopSong
        * @desc stops currentBuzzObject and sets the boolean value of the song's playing method to null
        * @param {Object} song
        */
        var stopSong = function(song){
            currentBuzzObject.stop();
            song.playing = null;
        };
        
        
        /**
        * @function getSongIndex
        * @desc returns the index of the input song object
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return SongPlayer.currentAlbum.songs.indexOf(song);
        }
        
        /**
        * @desc holds the contents of the current album object including title, artist, label, year, albumArtUrl, and an array of song objects each with a title, duration, and audioUrl.
        * @type {Object}
        */
        SongPlayer.currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Holds the currently playing song data
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        * @function SongPlayer.play
        * @desc When the currently playing song is not the song we want to play, we should set and play the provided song.  Otherwise, we should pause the currently playing song.
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
                currentSongIndex = SongPlayer.currentAlbum.songs.length - 1;
            }
            
            var song = SongPlayer.currentAlbum.songs[currentSongIndex];
            
            stopSong(SongPlayer.currentSong);
            setSong(song);
            playSong(song);
        };
        
        /**
        * @function SongPlayer.next
        * @desc increments the index of the current song by one and plays the next track in the album
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex === SongPlayer.currentAlbum.songs.length) {
                currentSongIndex = 0
            } 
            
            var song = SongPlayer.currentAlbum.songs[currentSongIndex];
            stopSong(SongPlayer.currentSong);
            setSong(song);
            playSong(song);
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject){
                currentBuzzObject.setTime(time);
            }
        }
        
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();