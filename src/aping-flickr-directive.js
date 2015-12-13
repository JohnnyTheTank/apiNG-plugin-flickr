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

                    var flickrSearchObject = {
                        items: request.items || appSettings.items,
                    };

                    if(request.language) {
                        flickrSearchObject.lang = request.language;
                    }

                    if(request.userId) {
                        flickrSearchObject.id = request.userId;
                        flickrFactory.getImagesFromUserById(flickrSearchObject).success(function(_data){
                            apingController.concatToResults(apingFlickrHelper.getObjectByJsonData(_data, appSettings.model, flickrSearchObject.items));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if(request.tags) {
                        flickrSearchObject.tags = request.tags;

                        if(request.tagmode) {
                            flickrSearchObject.tagmode = request.tagmode;
                        }

                        flickrFactory.getImagesFromUserById(flickrSearchObject).success(function(_data){
                            apingController.concatToResults(apingFlickrHelper.getObjectByJsonData(_data, appSettings.model, flickrSearchObject.items));
                        }).error(function (_data) {
                            //on error
                        });
                    }

                });
            }
        }
    }]);