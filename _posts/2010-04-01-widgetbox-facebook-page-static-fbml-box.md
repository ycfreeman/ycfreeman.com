---
title: Widgetbox + Facebook Page + static FBML box
layout: post
categories:
  - web-development
tags:
  - fbml
  - facebook
  - flash
  - widgetbox
---
So I finally got the time and mood to put a little bit work on this problem.

While there&#8217;s seem to be very few clear tutorial or some sort in google specifically for this matter, I thought it would be either too simple that no one bothers to give a tutorial, or simply too complicated that no one bothers to do it.

Widgetbox is a useful site that allow you to create some dynamic content to your website in widget form, or simply use those widgets that created by someone else. Every time you want to insert a widget in widgetbox, simply copy the embed code generated and paste to the place you want to add. It works like charm for most contents like blog, website, etc.

However, as its code contains external script and object tag, it simply violates Facebook&#8217;s terms of page contents&#8230; aka, it does not work with Facebook page, if you directly copy and paste those codes into that static FBML box ([here&#8217;s some info about it](http://ycfreeman.com/wp-content/uploads/2010/04/fb-fanpages-fbml-box)). So this &#8220;new&#8221; Facebook page has banned most sort of external scripts and objects, so the generated embed code which consist of &#8220;object&#8221; and &#8220;script&#8221;

tags just simply doesn&#8217;t work on static FBML boxes.

<a name="more"></a>

&#8220;but Facebook says they support swf!&#8221;, Yes they support swf, in a weird way. First, you have to use FB:SWF to include the flash object, Second, it does not play on page load.

So the way to solve this problem is to convert that object tag and those variables�into the fb:swf tag. Ya simple as that.

now here&#8217;s what you get from widgetbox &#8220;embed&#8221; button

```
&lt;object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
 codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"
 type="application/x-shockwave-flash"
 width="350px" height="523px"
 id="InsertWidget_883e1e81-33bf-42ba-a364-985360a915e3"
 align="middle"&gt; &lt;param name="movie"
 value="http://widgetserver.com/syndication/flash/wrapper/InsertWidget.swf"&gt;
    &lt;param name="quality"
 value="high"&gt;
   &lt;param name="wmode" value="transparent"&gt;
    &lt;param name="menu" value="false"&gt;
    &lt;param name="flashvars" value="r=2&appId=883e1e81-33bf-42ba-a364-985360a915e3"&gt;
    &lt;param name="allowScriptAccess" value="sameDomain"&gt;
    &lt;embed src="http://ycfreeman.com/wp-content/uploads/2010/04/InsertWidget.swf"
 name="InsertWidget_883e1e81-33bf-42ba-a364-985360a915e3"
 width="350px" height="523px" quality="high" menu="false"
    pluginspage="http://www.macromedia.com/go/getflashplayer"
 type="application/x-shockwave-flash" wmode="transparent" align="middle"
 allowscriptaccess="sameDomain"
 flashvars="r=2&appId=883e1e81-33bf-42ba-a364-985360a915e3" /&gt; &lt;/object&gt;
 ```

pretty much clear on how to convert here now  <img src="http://i1.wp.com/ycfreeman.com/wp-includes/images/smilies/simple-smile.png?w=660" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" />, just change embed tag to fb:swf, and delete some not allowed parameters, then convert those like src to swfsrc. And finally add a printscreen or something to be the �lid of your hot pot�.

the converted code would be something like this:

<pre>&lt;fb:swf
 imgsrc="http://ycfreeman.com/wp-content/uploads/2010/04/playbuttonm.jpg"
 swfsrc="http://ycfreeman.com/wp-content/uploads/2010/04/InsertWidget.swf"
 flashvars='r=2&appId=883e1e81-33bf-42ba-a364-985360a915e3'
 width='350' height='500'
 align='middle'
 wmode='transparent'
 waitforclick='false'
 scale='exactfit'
/&gt;</pre>

update 19/02/2011: demo page no longer available, but there should be some fb pages with flash these days.

one more thing, you can always test those FBML codes at [FBML test console](http://ycfreeman.com/wp-content/uploads/2010/04/tools.php?fbml) before publish <img src="http://i1.wp.com/ycfreeman.com/wp-includes/images/smilies/simple-smile.png?w=660" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" />

update: FBML test console is no longer working <img src="http://i1.wp.com/ycfreeman.com/wp-includes/images/smilies/frownie.png?w=660" alt=":(" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" />

Have fun!
