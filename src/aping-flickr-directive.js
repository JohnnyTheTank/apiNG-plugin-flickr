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
                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };
                    if(typeof request.items !== "undefined") {
                        helperObject.items = request.items;
                    } else {
                        helperObject.items = appSettings.items;
                    }
                    if(typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    if(helperObject.items == 0) {
                        return false;
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if(helperObject.items < 0 || isNaN(helperObject.items)) {
                        helperObject.items = undefined;
                    }

                    // the api has a limit of 20 items per request
                    if(helperObject.items > 20) {
                        helperObject.items = 20;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        items: helperObject.items,
                    };
                    if(typeof request.language !== "undefined") {
                        requestObject.lang = request.language;
                    }

                    if(request.userId) {
                        requestObject.id = request.userId;
                        flickrFactory.getImagesFromUserById(requestObject).success(function(_data){
                            apingController.concatToResults(apingFlickrHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if(request.tags) {
                        requestObject.tags = request.tags;

                        if(request.tagmode) {
                            requestObject.tagmode = request.tagmode;
                        }

                        flickrFactory.getImagesByTags(requestObject).success(function(_data){
                            apingController.concatToResults(apingFlickrHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    }

                });
            }
        }
    }]);