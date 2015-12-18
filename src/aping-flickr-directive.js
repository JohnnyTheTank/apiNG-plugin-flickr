"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-flickr
 @licence MIT
 */

var jjtApingFlickr = angular.module("jtt_aping_flickr", ['jtt_flickr'])
    .directive('apingFlickr', ['apingFlickrHelper', 'apingUtilityHelper', 'flickrFactory', function (apingFlickrHelper, apingUtilityHelper, flickrFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingFlickr, apingFlickrHelper.getThisPlattformString(), appSettings);

                requests.forEach(function (request) {

                    var helperObject = {
                        items: request.items || appSettings.items,
                        model: appSettings.model,
                    };

                    if(request.language) {
                        helperObject.lang = request.language;
                    }

                    if(request.userId) {
                        helperObject.id = request.userId;
                        flickrFactory.getImagesFromUserById(helperObject).success(function(_data){
                            apingController.concatToResults(apingFlickrHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if(request.tags) {
                        helperObject.tags = request.tags;

                        if(request.tagmode) {
                            helperObject.tagmode = request.tagmode;
                        }

                        flickrFactory.getImagesByTags(helperObject).success(function(_data){
                            apingController.concatToResults(apingFlickrHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    }

                });
            }
        }
    }]);