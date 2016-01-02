[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

**_apiNG-plugin-flickr_** is a [Flickr API](https://www.flickr.com/services/api/) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `social`, `image`**
* Used promise library: [angular-flickr-api-factory](https://github.com/JohnnyTheTank/angular-flickr-api-factory) _(included in minified distribution file)_

# Documentation
    I.  INSTALLATION
    II. USAGE

## I. INSTALLATION
    a) Get files
    b) Include files
    c) Add dependencies
    d) Add the plugin

### a) Get files
You can choose your preferred method of installation:

* Via bower: `bower install apiNG-plugin-flickr --save`
* Download from github: [apiNG-plugin-flickr.zip](https://github.com/JohnnyTheTank/apiNG-plugin-flickr/zipball/master)

### b) Include files
Include `apiNG-plugin-flickr.min.js` in your apiNG application
```html
<script src="bower_components/apiNG-plugin-flickr/dist/aping-plugin-flickr.min.js"></script>
```

### c) Add dependencies
Add the module `jtt_aping_flickr` as a dependency to your app module:
```js
var app = angular.module('app', ['jtt_aping', 'jtt_aping_flickr']);
```

### d) Add the plugin
Add the plugin's directive `aping-flickr="[]"` to your apiNG directive and configure your requests (_**II. USAGE**_)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-flickr="[{'tags':'berlin'}]">
</aping>
```

## II. USAGE
    a) Models
    b) Requests
    c) Rate limit

### a) Models
Supported apiNG models

|  model   | content | support | max items<br>per request | (native) default items<br>per request |
|----------|---------|---------|--------|---------|
| `social` | **images** | full    | `20`   | `20`   |
| `image`  | **images** | full    | `20`   | `20`   |

**support:**
* full: _the source platform provides a full list with usable results_ <br>
* partly: _the source platfrom provides just partly usable results_


### b) Requests
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

### c) Rate limit
Visit the official [Flickr API documentation](https://www.flickr.com/services/developer/api/)

# Licence
MIT
