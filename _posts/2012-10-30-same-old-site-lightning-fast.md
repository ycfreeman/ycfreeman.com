---
title: Same old site, Lightning fast
layout: post
permalink: /blog/2012/10/same-old-site-lightning-fast/
categories:
  - web-development
---
Finally got the time to migrate my site from crappy shared hosting to AWS,

It&#8217;s now on Amazon Linux (CentOS) with basic AMP (mod\_php) stack &#8212; php php-mysql mysql-server &#8212; I&#8217;m no nginx guru and�mod\_fcgid gives me headache&#8230;

so I just got APC caching &#8212; php-pecl-apc &#8212; which is already much faster than file based caching &#8212; and of course with W3 Total Cache <img src="http://i1.wp.com/ycfreeman.com/wp-includes/images/smilies/simple-smile.png?w=660" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" />

and [mod_pagespeed binary from google](https://developers.google.com/speed/docs/mod_pagespeed/download)�helps a little as well

Site speed should be much faster now, and I haven&#8217;t even looked at this [long list](http://codex.wordpress.org/WordPress_Optimization) yet

&nbsp;
