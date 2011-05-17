Feed.JS
=======================

JQuery Plugin for displaying RSS feeds in a web page.


Dependencies 
-----------------------
* jQuery 1.5+
* Google Feed API



Examples
-----------------------
See /examples for full usage details




Usage 
-----------------------
    <ul id="feed"></ul>

    <script type="text/javascript" src="http://www.google.com/jsapi?key=ABQIAAAAibVVzsEEnE8IwCs9tzyIfxRDUIAO2r_QCp2emLH7u6hVxhT6NxSvq2xH_P__wq2OJo7epHUGh17NIg"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.6.min.js"></script>
    <script type="text/javascript" src="../feed.js"></script>    
    <script type="text/javascript">
      $("#feed").displayRSS("http://newsroom.melbourne.edu/studio/rss");             
    </script>

Note: the library assumes that the entries will be rendered in a list 


Parameters
-----------------------
### URL or Array of URLS
Full URL to an RSS feed, or an array of URLs


### Options Hash 
See below


Options 
-----------------------



### template (default: '<a href="{link}">{title}</a>')

String to use as template for rendering entries into li tags. 
Uses a simple variable interpolation scheme allowing variables to be replaced with entry properties in the form {name}.

Entry Fields:

* title
* publishedDate
* content
* author
* categories
* link



### numberOfItems (default: 5)

Controls the number of items to display


### listItemClass

Adds a class to the li tags created by the new entries.

### dateFormat

Allows customisation of the publishedDate display format.

Specify a date format mask using the following examples:

    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
	
	


### onComplete

Callback function triggered when the list has finished being created. 

Useful for adding finishing touches to the completed feed list

eg:

To add a class to the first li item in the list:

    onComplete: function() {
      $("#news li:first").addClass("first");
    }


### renderer 

Function to custom render an individual entry. 
Is passed an entry and the default html used to display the entry - the current template interpolated with entry values.
Returns the html to display for that entry.

eg:
To take an image from the entry content and use that in our rendered list:

    template: '<a href="{link}"><img src="{img}" />{title}</a>',
    renderer: function(entry, _default) {  
      var img = $(entry.content).filter("img").attr("src");
      html = _default.replace(/{img}/, img)       
      return html;
    }

