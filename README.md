[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

[![Join the chat at https://gitter.im/JohnnyTheTank/apiNG](https://img.shields.io/badge/GITTER-join%20chat-green.svg)](https://gitter.im/JohnnyTheTank/apiNG?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://badge.fury.io/js/aping-plugin-flickr.svg)](https://badge.fury.io/js/aping-plugin-flickr)
[![Bower version](https://badge.fury.io/bo/apiNG-plugin-flickr.svg)](https://badge.fury.io/bo/apiNG-plugin-flickr)

**_apiNG-plugin-flickr_** is a [Flickr API](https://www.flickr.com/services/api/) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `social`, `image`**
* This plugin supports the [`get-native-data` parameter](https://aping.readme.io/docs/advanced#parameters)
* Used promise library: [angular-flickr-api-factory](https://github.com/JohnnyTheTank/angular-flickr-api-factory) _(included in distribution files)_

# Documentation
1. [INSTALLATION](#1-installation)
    1. Get file
    2. Include file
    3. Add dependency
    4. Add plugin
2. [USAGE](#2-usage)
    1. Models
    2. Requests
    3. Rate limit

## 1. INSTALLATION

### I. Get file
Install via either [bower](http://bower.io/), [npm](https://www.npmjs.com/), CDN (jsDelivr) or downloaded files:

* `bower install apiNG-plugin-flickr --save`
* `npm install aping-plugin-flickr --save`
* use [CDN file](https://www.jsdelivr.com/projects/aping.plugin-flickr)
* download [apiNG-plugin-flickr.zip](https://github.com/JohnnyTheTank/apiNG-plugin-flickr/zipball/master)

### II. Include file
Include `aping-plugin-flickr.min.js` in your apiNG application

```html
<!-- when using bower -->
<script src="bower_components/apiNG-plugin-flickr/dist/aping-plugin-flickr.min.js"></script>

<!-- when using npm -->
<script src="node_modules/aping-plugin-flickr/dist/aping-plugin-flickr.min.js"></script>

<!-- when using cdn file -->
<script src="//cdn.jsdelivr.net/npm/aping-plugin-flickr@latest/dist/aping-plugin-flickr.min.js"></script>

<!-- when using downloaded files -->
<script src="aping-plugin-flickr.min.js"></script>
```


### III. Add dependency
Add the module `jtt_aping_flickr` as a dependency to your app module:
```js
angular.module('app', ['jtt_aping', 'jtt_aping_flickr']);
```

### IV. Add the plugin
Add the plugin's directive `aping-flickr="[]"` to your apiNG directive and [configure your requests](#ii-requests)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-flickr="[{'tags':'berlin'}]">
</aping>
```

## 2. USAGE

### I. Models
Supported apiNG models

|  model   | content | support | max items<br>per request | (native) default items<br>per request |
|----------|---------|---------|--------|---------|
| `social` | **images** | full    | `20`   | `20`   |
| `image`  | **images** | full    | `20`   | `20`   |

**support:**
* full: _the source platform provides a full list with usable results_ <br>
* partly: _the source platfrom provides just partly usable results_


### II. Requests
Every **apiNG plugin** expects an array of **requests** as html attribute.

#### Requests by User
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`userId`** | `67221971@N06` |  | A single user ID ([Username converter](http://idgettr.com/)) | no |
| **`items`**  | `10` | `20` | Items per request (`0`-`20`) |  yes  |
| **`language`**  | `de-de` |  | The display language for the feed. Valid values: `de-de`, `en-us`, `es-us`, `fr-fr`, `it-it`, `ko-kr`, `pt-br`, `zh-hk`  |  yes  |

Sample requests:
* `[{'userId':'67221971@N06'}, {'userId':'74103707@N02'}]`
* `[{'userId':'125053471@N07', 'items':10}]`

#### Requests by Tags
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`tags`** | `wood,forest` |  | A comma delimited list of tags to filter the feed by | no |
| **`tagmode`**  | `any` | `all` | Control whether items must have ALL the tags, or ANY of the tags |  yes  |
| **`items`**  | `10` | `20` | Items per request (`0`-`20`) |  yes  |
| **`language`**  | `de-de` |  | The display language for the feed. Valid values: `de-de`, `en-us`, `es-us`, `fr-fr`, `it-it`, `ko-kr`, `pt-br`, `zh-hk`  |  yes  |


Sample requests:
* `[{'tags':'fcbayern'}, {'tags':'readmadrid'}]`
* `[{'tags':'ocean,sea', 'tagmode':'any', 'items':10}]`

### III. Rate limit
Visit the official [Flickr API documentation](https://www.flickr.com/services/developer/api/)

# Licence
MIT
