---
title: WOW Server Status WordPress Widget 1.0
layout: post
permalink: /blog/2010/06/wow-server-status-wordpress-widget-10/
categories:
  - wordpress-plugin
tags:
  - wow-server-status-widget
---
[Demo Site](http://demo.ycfreeman.com)

* 14/5/2011:

seems this feed is much more stable now, I&#8217;m still looking at ways to improve the speed of this image generation.

* 26/2/2011:

lol GG, unofficial realm status feed is down due to bandwidth limit exceeded. if it is not going back up, i&#8217;m gonna look for alternative solution.

Maybe write an adapter to screen scrap official realm status page and convert it to xml or something.

* 20/12/2010:

1.0.4: since official feed is moved to some mysterious place, this widget is changed to use�[Axho&#8217;s WoW Feeds](http://wowfeeds.wipeitau.com/)&#8230; at least for now. for any kind of widget that is using similar method (old xml feed) to look for data, you can look for the same feed to do things, it provides JSON and XML feed, and rather getting all realms at once and filter on your widget, their feed can provide only one realm on request, which would be slightly faster for something like desktop widget. Data is formated slightly different there, but it should be pretty obvious what has to be changed.

alternatively, you can always screen scrap official realm status page. good luck and have fun <img src="http://i1.wp.com/ycfreeman.com/wp-includes/images/smilies/simple-smile.png?w=660" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" />

* 18/12/2010: confirmed it is breaking everywhere, appears blizzard has completely turned off the old xml realm status, maybe they&#8217;ve moved somewhere else, if that is the case it should be a quick fix. will look at it tomorrow

* 10/12/2010: �ok ok, yea I know Blizzard has changed their data and the badge is not working any more, thanks Blizzard! I&#8217;m still looking for solution, should be fixed within next 2 weeks.

Easily add WOW Server Status 4.1 badge to your site by just a few clicks.

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i2.wp.com/ycfreeman.com/wp-content/uploads/2010/06/screenshot-1.jpg"><img src="http://i2.wp.com/ycfreeman.com/wp-content/uploads/2010/06/screenshot-11.jpg?w=660" border="0" alt="" data-recalc-dims="1" /></a>
</div>

<span style="font-size: x-large;">Description</span>

This is a simple widget that displays WOW Server Status 4.1 badge, without having to upload the script with ftp and write an img tag to run it.

The original script can be found here, which is not my work:

[http://53&#215;11.com/blog/2005/04/21/WoW-Server-Status-41.10](http://53x11.com/blog/2005/04/21/WoW-Server-Status-41.10)

If you managed to find bugs or want to correct some of my codes, please don&#8217;t hesitate to leave a comment <img src="http://i1.wp.com/ycfreeman.com/wp-includes/images/smilies/simple-smile.png?w=660" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" />

<div style="margin: 0px;">
  <div style="margin: 0px;">
    Download from wordpress plugin gallery :): &#8211;�<a href="http://wordpress.org/extend/plugins/wow-server-status-widget/">http://wordpress.org/extend/plugins/wow-server-status-widget/</a>
  </div>
</div>

Full change log and descriptions after the break

<a name="more"></a>

<span style="font-size: x-large;">Installation</span>

1. Unpack and Upload all files to the \`/wp-content/plugins/wow-server-status-widget\` directory

2. Activate the plugin through the &#8216;Plugins&#8217; menu in WordPress

3. Drag &#8216;WOW Server Status Widget&#8217; to your sidebar

4. Enter details and done!

<span style="font-size: x-large;"><br /> </span>

<span style="font-size: x-large;">Frequently Asked Questions</span>

The badge script is not my work, I just make it easy to drag and drop in wordpress.

It should be able to run properly on most servers, but if there is a problem

please visit [http://53&#215;11.com/blog/2005/04/21/WoW-Server-Status-41.10](http://53x11.com/blog/2005/04/21/WoW-Server-Status-41.10) and look for solutions there.

**= It says &#8220;No Status Source&#8221;, what&#8217;s wrong? =**

Make sure you check the realm name and region carefully, it won&#8217;t work if you&#8217;ve typed it wrong.

If official realm status page: http://www.worldofwarcraft.com/realmstatus/compat.html is working fine, this badge should be working fine, in some rare cases like when they are upgrading server hardware or something, the realm page just breaks and so the badge will also break.

**= It doesn&#8217;t reflect the actual realm status correctly, what&#8217;s wrong? =**

See above. Also, update timer of this badge is set to 10 minutes, so it may not reflect immediately if the server status has just changed within 10 minutes.

<span style="font-size: x-large;">Changelog</span>

= 1.0.2 =

* fixed the quotation realm not showing bug in original wow_ss.php, thanks Nullinger

= 1.0.1 =

* better plugin path handling, added bug report icon, updated license wordings

= 1.0 =

* First released version
