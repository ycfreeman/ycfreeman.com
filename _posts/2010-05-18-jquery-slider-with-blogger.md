---
title: JQuery slider with blogger
date: 2010-05-18
layout: post
categories:
  - web development
tags:
  - blogger
  - css
  - javascript
  - jquery
  - web design
---
   <img alt="Capture" src="http://i0.wp.com/ycfreeman.com/wp-content/uploads/2010/05/Capture%5B6%5D.jpg?resize=400%2C290" style="float: none;margin-left: auto;margin-right: auto" data-recalc-dims="1" />  
gonna love jquery  
<http://sixrevisions.com/tutorials/javascript_tutorial/create-a-slick-and-accessible-slideshow-using-jquery/>  
with just a couple of lines, it can make a slider, and it works nicely with blogger structure  <img src="http://i1.wp.com/ycfreeman.com/wp-includes/images/smilies/simple-smile.png?w=660" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" />now I can add a nice looking slider to my blogger based portfolio  
i can even keep the original post layout and just wrap the slider on top, it just slides the whole block <img src="http://i1.wp.com/ycfreeman.com/wp-includes/images/smilies/simple-smile.png?w=660" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" />

Here&#8217;s how:  
simply look for the post loop in your blogger template, which is between

<pre>&lt;b:loop values="data:posts" var="post"&gt;<br />...<br />&lt;/b:loop&gt;<br /></pre>

then wrap &#8220;slideshow&#8221; and &#8220;slideContainer&#8221; divs outside the loop and &#8220;slide&#8221; div inside the loop for each post  
others pretty much copy and paste and edit those width and height to fit your site
