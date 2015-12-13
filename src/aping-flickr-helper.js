"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-flickr
 @licence MIT
 */

jjtApingFlickr.service('apingFlickrHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlattformString = function () {
        return "flickr";
    };

    this.getThisPlattformLink = function () {
        return "http://flickr.com/";
    };

    this.getObjectByJsonData = function (_data, _model) {
        var requestResults = [];
        if (_data) {
            var _this = this;

            if (_data.items) {

                angular.forEach(_data.items, function (value, key) {
                    var tempResult = _this.getItemByJsonData(value, _model);
                    if(tempResult) {
                        requestResults.push(tempResult);
                    }
                });
            }

        }
        return requestResults;
    };

    this.getItemByJsonData = function (_item, _model) {
        var returnObject = {};
        if (_item && _model) {
            switch (_model) {
                case "social":
                    returnObject = this.getSocialItemByJsonData(_item);
                    break;
                case "image":
                    returnObject = this.getImageItemByJsonData(_item);
                    break;

                default:
                    return false;
            }
        }
        return returnObject;
    };

    this.getSocialItemByJsonData = function (_item) {
        var socialObject = apingModels.getNew("social", this.getThisPlattformString());

        //fill _item in socialObject
        $.extend(true, socialObject, {
            "blog_name": _item.author || false,
            "blog_id": _item.author_id || false,
            "blog_link": _item.author_id ? this.getThisPlattformLink()+_item.author_id : false,
            "timestamp": apingTimeHelper.getTimestampFromDateString(_item.published, 1000, 3600*1000),
            "post_url": _item.link,
            "intern_id": (_item.link).split("flickr.com").length >= 2 ? (_item.link).split("flickr.com")[1] : false,
            "img_url": _item.media ? (_item.media.m).replace("_m.",".") : false,
            "text": _item.description || false,
        });

        if(_item.title) {
            if(socialObject.text) {
                socialObject.caption = _item.title;
            } else {
                socialObject.text = _item.title;
            }
        }

        socialObject.date_time = new Date(socialObject.timestamp);

        if( (_item.description).indexOf("posted a photo") > -1 ) {
            socialObject.type = "image";
        } else {
            return false;
        }

        return socialObject;
    };

    this.getImageItemByJsonData = function (_item) {
        var imageObject = apingModels.getNew("image", this.getThisPlattformString());

        //fill _item in imageObject
        $.extend(true, imageObject, {
            "blog_name": _item.author || false,
            "blog_id": _item.author_id || false,
            "blog_link": _item.author_id ? this.getThisPlattformLink()+_item.author_id : false,
            "timestamp": apingTimeHelper.getTimestampFromDateString(_item.published, 1000, 3600*1000),
            "post_url": _item.link,
            "intern_id": (_item.link).split("flickr.com").length >= 2 ? (_item.link).split("flickr.com")[1] : false,
            "img_url": _item.media ? (_item.media.m).replace("_m.",".") : false,
            "text": _item.description || false,
        });

        if(_item.title) {
            if(imageObject.text) {
                imageObject.caption = _item.title;
            } else {
                imageObject.text = _item.title;
            }
        }

        imageObject.date_time = new Date(imageObject.timestamp);

        if( (_item.description).indexOf("posted a photo") <= 0 ) {
            return false;
        }

        return imageObject;
    };
}]);