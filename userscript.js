// ==UserScript==
// @name         Soundcloud Album Art Downloader
// @namespace    http://www.dieterholvoet.com
// @version      1.6
// @description  Allows you to download album art on the Soundcloud website.
// @author       Dieter Holvoet
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include      http://www.soundcloud.com/*
// @include	     http://soundcloud.com/*
// @include	     https://www.soundcloud.com/*
// @include	     https://soundcloud.com/*
// @grant        none
// ==/UserScript==

setInterval(function() {
    $('.modal__content:not(.appeared)')
        .addClass('appeared')
        .each(function() {

            var possibleClasses = [".listenArtworkWrapper", ".listenInfo"],
                previewURL,
                imageURL,
                regexp = /t\d{3}x\d{3}/gi;

            for(var i = 0; i < possibleClasses.length; i++) {
                if($(possibleClasses[i] + " .image__full").length > 0) {
                    imageURL = $(possibleClasses[i] + " .image__full").css('background-image');
                }
            }

            if(imageURL === null || imageURL === "") {
                console.log("SoundCloud Album Art Downloader: No suitable selector found!");

            } else {
                imageURL = imageURL.substring(5, imageURL.length - 2);
            }

            previewURL = imageURL.replace(regexp, "t500x500");
            imageURL = imageURL.replace(regexp, "original");

            $(".modal__content .image__full").parent().remove();
            $(".modal__content").append("<img style='width: 500px; height: 500px' src='" + previewURL + "'>");
            $(".modal__content").append("<a class='sc-button sc-button-medium sc-button-responsive' target='_blank' href='" + imageURL + "' title='Open cover art in new tab' style='margin: 15px auto 0 auto; display: block;'>Open in new tab</a>");
            $(".modal__content").append("<a class='sc-button sc-button-medium sc-button-responsive' target='_blank' href='" + imageURL + "' title='Download cover art' style='margin: 10px auto 0 auto; display: block;' download>Download</a>");
        });
}, 250);