"use strict";
apingApp.config(['$provide', function ($provide) {

    $provide.constant("apingApiKeys", {});

    $provide.constant("apingDefaultSettings", {
        templateUrl : "aping_design_flickr.html",
        items : 20, //items per request
        maxItems: 100, //max items per aping
        orderBy : "timestamp",
        orderReverse : "true",
        model: "social",
    });

}]);