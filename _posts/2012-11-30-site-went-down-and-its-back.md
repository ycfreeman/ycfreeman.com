---
title: 'Site went down, but it&#8217;s back'
layout: post
categories:
  - web-development
---
This site went down for a few days due to a common AWS micro instance issue &#8212; out of memory and mysqld got killed.

So I went in and [tweaked some apache settings](http://imperialwicket.com/tuning-apache-for-a-low-memory-server-like-aws-micro-ec2-instances)�&#8230;�<span style="line-height: 1.6em;">also upgraded to apache 2.4+php 5.4&#8230; for maybe slightly lower memory usage&#8230;</span>

hope it won&#8217;t go down again that soon

&nbsp;

&#8212; just tried nginx,  <img src="http://i1.wp.com/ycfreeman.com/wp-includes/images/smilies/frownie.png?w=660" alt=":(" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" />got it running and doing phpinfo() correctly but takes too long to manually setup all these rewriting stuff for wordpress&#8230;&#8230; maybe I&#8217;ll try that again some time

&nbsp;

&#8230;. down again, added [swap partition](http://randomind.com/tips/how-to-create-swap-partition-on-amazon-aws-micro-instance-linux-2012-08-29)&#8230;..
