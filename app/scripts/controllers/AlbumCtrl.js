(function(){
    function AlbumCtrl() {
        albumData = angular.copy(albumPicasso);
        this.title = albumData.title;
        this.artist = albumData.artist;
        this.release = albumData.year + " " + albumData.label;
        this.albumArtUrl = albumData.albumArtUrl;
        this.songs = albumData.songs;
        
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl',AlbumCtrl);
    
})();