(function($){
  var loaded;

  function onLoad() {    
    loaded = true;
  }
  
  if (!google.feeds) {
    google.setOnLoadCallback(onLoad);
    google.load("feeds", "1");    
  }

  
  $.fn.displayRSS = function(urls, opts) {     
      if(!opts) {
        opts = {}
      }
      
      var $this = $(this);
      
      var onLoad = function() {

        if (google) {

          clearInterval(loadInterval);  
          var _f = Feedinator($this, urls, opts);
          _f.init();  
        }
      }
      var loadInterval = setInterval(onLoad, 500);
          
      // var _f = Feedinator(this, urls, opts);
      // google.setOnLoadCallback(_f.init);
           
      return $this;      
  }

})(jQuery);



var Feedinator = function(element, urls, opts) {

  console.log(element);
  
  var data = [];
  var loadCount = 0;
  var interval;
  
  var template = '<a href="{link}">{title}</a>';
  if (opts.template) {
    template = opts.template;
  }
  
  var dateFormat = 'htt dd mmmm yyyy';
  if (opts.dateFormat) {
    dateFormat = opts.dateFormat;
  }

  var numberOfItems = 5;
  if (opts.numberOfItems) {
    numberOfItems = opts.numberOfItems;
  }

  var listItemClass = '';
  if (opts.listItemClass) {
    listItemClass = opts.listItemClass;
  }
  
  var renderer = function(entry) {
		var html = template.replace(/{link}/, entry.link);
		html = html.replace(/{title}/, entry.title)
		html = html.replace(/{content}/, entry.content)
    
    try {
      var publishedDate = new Date(Date.parse(entry.publishedDate));
      html = html.replace(/{publishedDate}/, entry.publishedDate);
    } catch(ex) {      
      console.log(ex);
		  html = html.replace(/{publishedDate}/, "");
    }   
    return html; 
  }
  
  
  var load = function() {
    $.each(urls, function(index, url) {          
      var feed = new google.feeds.Feed(url);
      feed.setNumEntries(numberOfItems);
      feed.load(function(result) {
        if (!result.error) {
          data = data.concat(result.feed.entries);
          loadCount++;
        }
      });
    });
    interval = setInterval(onLoad, 500);     
  }
  
  var onLoad = function() { 
    if(loadCount == urls.length) {
      clearInterval(interval);
      entries = sortByPublishedDate(numberOfItems);
      display(entries);
      if (opts.onComplete) {
        opts.onComplete();
      }
    }
  }
  
  var display = function(entries) {
		$(element).empty();
		$.each(entries, function(index, entry) {
      appendEntry(entry);
		});		
  }
  
  var appendEntry = function(entry) { 
    var html = renderer(entry);
    
    if (opts.renderer) {
      html = opts.renderer(entry, html);
    }
    $(element).append( $('<li>').addClass(listItemClass).append(html) );
  }
  
  var sortByPublishedDate = function(count) {
		data.sort(function(entryA,entryB){
		  return new Date(entryB.publishedDate) - new Date(entryA.publishedDate);
		});	
		return data.slice(0, count);
  }
    
  return {
    init: function() {
      console.log("init")
      if (typeof urls == "string") {
        urls = [urls]
      }
      load(); 
    }    
  }
}