---
title: WOW Server Status WordPress Widget 1.0.7
layout: post
categories:
  - wordpress-plugin
tags:
  - wow-server-status-widget
---
Thanks Aoife for the info, I didn&#8217;t know Blizzard released their official API.

<span style="color: #000000;">This plugin is now�updated to use official JSON feed,�(finally :p), php 5.2+ <strong>required</strong> (for native json_decode() support), although fallback JSON.php for earlier versions is included as well, no garrantee it works in 5.2-, too bad if it doesn&#8217;t work :(.</span>

<span style="color: #000000;">For non-wordpress users,�feel free to download the package�and extract the wow_ss.php to use it like the <a href="http://53x11.com/blog/2005/04/21/WoW-Server-Status-41.10" target="_blank">original one</a>. (text display mode may contain bugs),</span>�more information about [this plugin](http://ycfreeman.com/wow-server-status-wordpress-widget-10/ "WOW Server Status WordPress Widget 1.0")

&nbsp;

<div>
  <div>
    <p>
      <strong>If you would like to support this project, please consider</strong>
    </p>

    <div style="text-align: center;">
    </div>

    <p>
      , I will give you my Shaman hug <img src="http://i1.wp.com/ycfreeman.com/wp-includes/images/smilies/simple-smile.png?w=660" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" />
    </p>
  </div>
</div>

<div>
  <div>
    <div>
      <div>
        Download from wordpress plugin gallery:�<a href="http://wordpress.org/extend/plugins/wow-server-status-widget/">http://wordpress.org/extend/plugins/wow-server-status-widget/</a>
      </div>
    </div>
  </div>
</div>

<div>
  <div>
    <!--more-->
  </div>
</div>

<span style="font-size: x-large;">Changelog</span>

= 1.0.7 =* just re-upload and make sure all files are newest

= 1.0.6 =* patched to use official JSON feed

= 1.0.5 =* fixed bug of space becomes %20 in the new wow_ss.php, thanks Mike

= 1.0.4 =* since official realm status xml is not there anymore, I&#8217;ve modified the original wow server status badge to use \[Axho&#8217;s WoW Feeds\](http://wowfeeds.wipeitau.com/)&#8230; at least for now, feel free to extract the modified badge php for your own use.

= 1.0.3 =* take 2, fixed the apostrophe realm not showing bug in original wow_ss.php, aparently the original script has 3 places doing the same thing, so I merged them to one, and encode it correctly to ANSIit should be fine now if your keyboard is US keyboard, that renders apostrophe as &#039;, sorry for having it not working for so long
