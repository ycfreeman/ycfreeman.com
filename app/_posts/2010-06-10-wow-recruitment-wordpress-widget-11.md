---
title: WOW Recruitment Widget 1.1
layout: post
permalink: /blog/2010/06/wow-recruitment-wordpress-widget-11/
categories:
  - wordpress-plugin
tags:
  - wow-recruit-widget
---

for more information about this plugin please go to [plugin description]({% post_url 2010-12-15-wow-recruitment-widget %})

<ul>
  <li>
    <span style="color: red"><strong>current stable release 1.1.4<br /> </strong></span>
  </li>
  <li>
    <span style="color: red"><strong><span style="font-weight: normal"><strong>please save the widget once after upgrading from 1.0.x to make data work with new codes<br /> </strong></span></strong></span>
  </li>
</ul>

<ul>
  <li>
    The 1.1.3 admin panel bug only happened to Internet Explorer due to an incomplete html tag (IE hides contents inside while all other browsers show contents inside), so if you are using Internet Explorer, please update to 1.1.4 to fix this bug.
  </li>
</ul>

<ul>
  <li>
    Update 24/6/2010: eh&#8230;. took me ages to find the bug&#8230; turns out it is only missing a close &#8220;>&#8221; so the drop down box breaks in certain browsers, namely, freaking Internet Explorer, come on, stop using IE guys! anyway, 1.1.4 released, enjoy.
  </li>
  <li>
    Update 23/6/2010: looks like there can be a bug on admin form on some servers, if you have problem using 1.1.x just revert back to 1.0.1 at the mean time. I&#8217;ll upload a beta version to this page these few days, please stay tuned with this post thanks!
  </li>
  <li>
    Update 19/6/2010: fixed a bug that may cause by css float
  </li>
  <li>
    Update 19/6/2010: fixed a typo &#8220;Huner&#8221; and released 1.1.2 lol, also fixed some subversion stuffs, now it won&#8217;t give you dead images if you need to revert to older versions.
  </li>
  <li>
    Update 18/6/2010: turns out there&#8217;s really some bug on sorting algorithm also does not quite work on multi-site, I&#8217;ve fixed and released 1.1.1, it should work fine now, please comment here it doesn&#8217;t work on your site :smile:
  </li>
  <li>
    Update 16/6/2010: er &#8230; the sorting algorithm is still buggy, I&#8217;ll look into it again in the next update.
  </li>
</ul>

<p>
  <span style="font-size: x-large">Description</span>
</p>

<p>
  This version is updated to work with 3.0 single and multi site :smile:
</p>

<p>
  I&#8217;ve revamped the whole widget and did a lot of changes to old codes, it should be way much cleaner than before.
</p>

<p>
  <strong>New Features in 1.1:</strong>
</p>

<ul>
  <li>
    no more old school table layout, all are recoded with css2 (works on IE8 as well)
  </li>
  <li>
    since there is no more layout codes in the widget itself, custom layout can be done just by editing the css
  </li>
  <li>
    color and layout are seperated into 2 css files
  </li>
  <li>
    data structure is changed, old data will be changed to new structure automatically
  </li>
  <li>
    class icons are combined into css sprite
  </li>
  <li>
    new sorting method used, it should sort by status then class as intended now.
  </li>
</ul>

<p>
  ** row order in widget settings does not affect order that displays in front, it will just automatically sorts by status then class, I will improve this in future version
</p>

<p>
  <strong>Thank you for all your support, stay tuned for updates~</strong>
</p>

<div style="margin: 0px">
  <div style="margin: 0px">
    Download from wordpress plugin gallery:�<a href="http://wordpress.org/extend/plugins/wow-recruit-widget/">http://wordpress.org/extend/plugins/wow-recruit-widget/</a>
  </div>
</div>

<p>
  Full change log, plugin description after the break.
</p>

<p>
  <a name="more"></a>
</p>

<div style="margin: 0px">
  <span style="font-size: x-large">Changelog</span>
</div>

<p>
  = 1.1 =<br /> * major recode to everything including data structure<br /> * no more table layout, all replaced by div, which can be easily customized by editing css/layout.css<br /> * color and layout are seperated into css/layout.css and css/color.css<br /> * class icons are combined into css sprite<br /> * new sorting method used, it should sort by status then class as intended now<br /> = 1.1.1 =<br /> * fixed a few non-set variable and duplicate function declaration bug, thanks Ramides<br /> * fixed sorting mechanism, it should sort by status from high to low, then by class in alphabetical order, tell me if it is still bugged<br /> = 1.1.2 =<br /> * fixed a typing mistake &#8220;Huner&#8221;, lol, thanks KGBAgent<br /> = 1.1.3 =<br /> * fixed a layout bug that may cause by css float<br /> = 1.1.4 =<br /> * fixed a lovely IE only bug, thanks KGBAgent again
</p>

<p>
  <span style="font-size: x-large">Future Improvements:</span>
</p>

<ul>
  <li>
    Custom order
  </li>
  <li>
    Custom status text
  </li>
  <li>
    More readable widget settings
  </li>
  <li>
    Able to toggle display/not display instead of hiding all Closed status
  </li>
  <li>
    Able to toggle usage of embedded style sheets
  </li>
</ul>
