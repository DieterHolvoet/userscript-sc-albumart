// ==UserScript==
// @name         Soundcloud Album Art Downloader
// @namespace    http://www.dieterholvoet.com
// @version      1.9
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
                sizes = { 't500x500': '500x500', 'original': 'original size' },
                regexp = /t\d{3}x\d{3}/gi;

            for (var i = 0; i < possibleClasses.length; i++) {
                if ($(possibleClasses[i] + " .image__full").length > 0) {
                    imageURL = $(possibleClasses[i] + " .image__full").css('background-image');
                }
            }

            if (!imageURL) {
                console.log("SoundCloud Album Art Downloader: No suitable selector found!");
            } else {
                imageURL = /url\("(.+)"\)/.exec(imageURL)[1];
            }

            $(".modal__content .image__full").parent().remove();
            $(".modal__content .imageContent").append("<img style='width: 500px; height: 500px; margin-bottom: 15px;' src='" + imageURL.replace(regexp, 't500x500') + "'>");

            Object.keys(sizes).forEach(function (size) {
                var url = imageURL.replace(regexp, size);
                $.ajax({
                    type: 'HEAD',
                    url: url,
                    complete: function(xhr) {
                        if (xhr.status !== 200) {
                            return;
                        }

                        $(".modal__content .imageContent").append(
                            "<a class='sc-button sc-button-medium sc-button-responsive' target='_blank' href='" + url + "' title='Download " + sizes[size] + "' style='margin: 10px auto 0 auto; display: block;' download>Download " + sizes[size] + "</a>"
                        );
                    }
                });
            });
        });
}, 250);
