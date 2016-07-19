---
title: WOW Recruitment Widget Customization
layout: post
permalink: /blog/2010/08/wow-recruitment-wordpress-widget-customization/
categories:
  - wordpress-plugin
tags:
  - wow-recruit-widget
---
11/12/2012: updated�[demo site](http://ycfreeman.com/wrdemo)css samples

17/9/2012: this tutorial is a bit outdated, you can now use <a style="line-height: 1.714285714; font-size: 1rem;" href="http://wordpress.org/extend/plugins/jetpack/">jetpack</a>�or plugins like <a style="line-height: 1.714285714; font-size: 1rem;" href="http://wordpress.org/extend/plugins/scripts-n-styles/">scripts and styles</a> to easily write override css rules after all your theme and plugin style sheets, however I believe this is still a good introduction to DOM and CSS and so on.

<span style="font-size: x-large;">Introduction</span>

I had always been trying to make this widget really customizable in the first place, because I just don&#8217;t want to make all of these wordpress sites look like those in Guild Launch or those Joomla sites out there. At one point I even thought about making a drag & drop type of customization like Facebook, but it is just not feasible to do something like that with the time I want to spend on this plugin.

So what I did is to make it fully customizable with some CSS techniques. This feature had been supported since 1.1 when I had got rid of all table layouts, today I finally have the time to write this tutorial after the release of 1.2.2

This is a little tutorial of how to customize this widget, if you read through this, it may help you learn some CSS techniques as well.

Before writing any codes, you will want to keep your changes right? so copy all style codes of the widget css (go to Plugins > Editor > Select plugin to edit: WOW Recruitment Widget > wow-recruit-widget/css/style.css) copy everything inside, and paste to bottom of your theme css (Appearance > Editor > Select your theme > style.css), then tick &#8220;Use Custom Style Sheet&#8221; in Settings > WOW Recruit Widget.

This will stop the widget style sheet from loading at all, which reduces a lot of conflicts and headache.

<div style="margin: 0px;">
  then�remember to point .wr-icon sprite to a correct image, i.e. if you want to use the default image sprite, change .wr-icon > background-image to
</div>

<div style="margin: 0px;">
  <div class="wp_syntax">
    <table>
      <tr>
        <td class="code">
          <pre class="css" style="font-family:monospace;"><span style="color: #993333;">url</span><span style="color: #00AA00;">&#40;</span><span style="color: #ff0000; font-style: italic;">../../plugins/wow-recruit-widget/img/class-sprite.png</span><span style="color: #00AA00;">&#41;</span></pre>
        </td>
      </tr>
    </table>
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    <div style="margin: 0px;">
      <div style="margin: 0px;">
        or using absolute link
      </div>
    </div>

    <div class="wp_syntax">
      <table>
        <tr>
          <td class="code">
            <pre class="css" style="font-family:monospace;"><span style="color: #993333;">url</span><span style="color: #00AA00;">&#40;</span>http<span style="color: #00AA00;">:</span>//<span style="color: #00AA00;">&#123;</span>your site<span style="color: #ff0000;">'s url}/wp-content/plugins/wow-recruit-widget/img/class-sprite.png)</span></pre>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

&nbsp;

<div style="margin: 0px;">
  ** If you don&#8217;t want to edit your theme style sheet, there is a plugin�<a href="http://wordpress.org/extend/plugins/persistent-styles-plugin/">here</a> that helps you keep all your widget styles separated�from your main theme style, I may consider including something like this in the future
</div>

I&#8217;ll separate this tutorial into 3 difficulty levels, in some WOW terms, Casual(Basic CSS), Intermediate(Advanced CSS), Hard Core(for Coders)

<a name="more"></a>

<span style="color: red;">*All screenshots are taken with chrome 5, but they should look the same (or very similar) on chrome 4+, firefox 3.5+ and safari 4+, opera does not support specific corner roundness thingy, so all will become rounded, Internet explorer does not support any css3 rounded corner and shadows (but it&#8217;s hackable with <a href="http://css3pie.com/">filter</a>).</span>

<span style="font-size: x-large;">Casual</span>

So your guild just make you web master but you don&#8217;t know any html or css,

and you just want to change some colors right? no worries, it&#8217;s easy.

just find out the class that you want to change color, and replace the original color code to the new one you want, or even easier, add those lines to very bottom of your style sheet and they should do just fine.

That&#8217;s how [cascading style sheet](http://www.w3schools.com/css/css_intro.asp) works, &#8220;the second mouse gets the cheese&#8221;, latter rule always overwrite previous rule, if there is no special rule or id involved

which means, if you add your custom style code to very bottom to the only style sheet you have (aka the theme style sheet), those rules will always overwrite previous ones.

say you have a white theme and want to change Priest class to something instead of white, and other classes to a darker tone,

just change the corresponding color codes

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-priest</span> <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">color</span><span style="color: #00AA00;">:</span> <span style="color: #cc00cc;">#FFFFFF</span><span style="color: #00AA00;">;</span> <span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

to something else say grey

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-priest</span> <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">color</span><span style="color: #00AA00;">:</span> <span style="color: #cc00cc;">#999999</span><span style="color: #00AA00;">;</span> <span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i0.wp.com/4.bp.blogspot.com/_qDb3uKm69NY/TFUWmAYEYBI/AAAAAAAAHCM/3zsGLj1cL0g/s1600/beginner1.PNG"><img src="http://i2.wp.com/4.bp.blogspot.com/_qDb3uKm69NY/TFUWmAYEYBI/AAAAAAAAHCM/3zsGLj1cL0g/s320/beginner1.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

or background of each item (.wr-item) to a different color, just add in this line

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-item</span>  <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#222222</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i0.wp.com/3.bp.blogspot.com/_qDb3uKm69NY/TFUWs50EbyI/AAAAAAAAHCU/8FpVBySK-G4/s1600/beginner2.PNG"><img src="http://i2.wp.com/3.bp.blogspot.com/_qDb3uKm69NY/TFUWs50EbyI/AAAAAAAAHCU/8FpVBySK-G4/s320/beginner2.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

or background of alternate item (.wr-odd, .wr-even) *yes I know CSS3 offers alternating row styling, but my plugin is using all divs so it may not suppoort seamlessly, and remember, IE8 doesn&#8217;t support many CSS3 features

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-odd</span>  <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#999999</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-even</span>  <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#222222</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i2.wp.com/2.bp.blogspot.com/_qDb3uKm69NY/TFUW1ZoBwxI/AAAAAAAAHCk/QFiEjHSP3Nk/s1600/beginner3.PNG"><img src="http://i0.wp.com/2.bp.blogspot.com/_qDb3uKm69NY/TFUW1ZoBwxI/AAAAAAAAHCk/QFiEjHSP3Nk/s320/beginner3.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

still doesn&#8217;t look quite right? let&#8217;s add a background for the whole widget

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wow-recruit-widget</span> <span style="color: #00AA00;">&#123;</span>
&nbsp;
        <span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#111111</span><span style="color: #00AA00;">;</span>
        <span style="color: #000000; font-weight: bold;">padding</span><span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i0.wp.com/4.bp.blogspot.com/_qDb3uKm69NY/TFUWwWi_YJI/AAAAAAAAHCc/4vP5reMCSpw/s1600/beginner4.PNG"><img src="http://i0.wp.com/4.bp.blogspot.com/_qDb3uKm69NY/TFUWwWi_YJI/AAAAAAAAHCc/4vP5reMCSpw/s320/beginner4.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

looks a bit weird, let&#8217;s add border to each item instead.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wow-recruit-widget</span> <span style="color: #00AA00;">&#123;</span>
&nbsp;
        <span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#111111</span><span style="color: #00AA00;">;</span>
        <span style="color: #000000; font-weight: bold;">padding</span><span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i1.wp.com/3.bp.blogspot.com/_qDb3uKm69NY/TFUW6XBKJNI/AAAAAAAAHCs/QhGogWp429Y/s1600/beginner5.PNG"><img src="http://i1.wp.com/3.bp.blogspot.com/_qDb3uKm69NY/TFUW6XBKJNI/AAAAAAAAHCs/QhGogWp429Y/s320/beginner5.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

hmm, how about different border color, lol looks a bit like old school windows xp button

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-item</span> <span style="color: #00AA00;">&#123;</span><span style="color: #000000; font-weight: bold;">padding</span><span style="color: #00AA00;">:</span><span style="color: #933;">5px</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-odd</span> <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#444444</span><span style="color: #00AA00;">;</span>
        <span style="color: #000000; font-weight: bold;">border-top</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#cccccc</span><span style="color: #00AA00;">;</span>
        <span style="color: #000000; font-weight: bold;">border-left</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#cccccc</span><span style="color: #00AA00;">;</span>
        <span style="color: #000000; font-weight: bold;">border-right</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#999999</span><span style="color: #00AA00;">;</span>
        <span style="color: #000000; font-weight: bold;">border-bottom</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#999999</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-even</span> <span style="color: #00AA00;">&#123;</span><span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#222222</span><span style="color: #00AA00;">;</span>
        <span style="color: #000000; font-weight: bold;">border-top</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#cccccc</span><span style="color: #00AA00;">;</span>
        <span style="color: #000000; font-weight: bold;">border-left</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#cccccc</span><span style="color: #00AA00;">;</span>
        <span style="color: #000000; font-weight: bold;">border-right</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#666666</span><span style="color: #00AA00;">;</span>
        <span style="color: #000000; font-weight: bold;">border-bottom</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> so
lid <span style="color: #cc00cc;">#666666</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i2.wp.com/2.bp.blogspot.com/_qDb3uKm69NY/TFUW-Lv68BI/AAAAAAAAHC0/wkMPpzV6prg/s1600/beginner6.PNG"><img src="http://i1.wp.com/2.bp.blogspot.com/_qDb3uKm69NY/TFUW-Lv68BI/AAAAAAAAHC0/wkMPpzV6prg/s320/beginner6.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

now how about some rounded corners (it&#8217;s css3 so&#8230; sorry IE fans.

-moz-border-radius is for Firefox, -webkit-border-radius is for Safari and Chrome, border-radius is css3 standard, since not all 3 browsers are supporting standard css3 yet, so it&#8217;s better to have them all)

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-odd</span> <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#444444</span><span style="color: #00AA00;">;</span>
          <span style="color: #000000; font-weight: bold;">border-top</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#cccccc</span><span style="color: #00AA00;">;</span>
          <span style="color: #000000; font-weight: bold;">border-left</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#cccccc</span><span style="color: #00AA00;">;</span>
          <span style="color: #000000; font-weight: bold;">border-right</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#999999</span><span style="color: #00AA00;">;</span>
          <span style="color: #000000; font-weight: bold;">border-bottom</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#999999</span><span style="color: #00AA00;">;</span>
          -moz-border-radius<span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
          -webkit-border-radius<span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
          <span style="color: #000000; font-weight: bold;">border-radius</span><span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-even</span> <span style="color: #00AA00;">&#123;</span><span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#222222</span><span style="color: #00AA00;">;</span>
          <span style="color: #000000; font-weight: bold;">border-top</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#cccccc</span><span style="color: #00AA00;">;</span>
          <span style="color: #000000; font-weight: bold;">border-left</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#cccccc</span><span style="color: #00AA00;">;</span>
          <span style="color: #000000; font-weight: bold;">border-right</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#666666</span><span style="color: #00AA00;">;</span>
          <span style="color: #000000; font-weight: bold;">border-bottom</span><span style="color: #00AA00;">:</span><span style="color: #933;">3px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#666666</span><span style="color: #00AA00;">;</span>
          -moz-border-radius<span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
          -webkit-border-radius<span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
          <span style="color: #000000; font-weight: bold;">border-radius</span><span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i1.wp.com/2.bp.blogspot.com/_qDb3uKm69NY/TFUXB_2zazI/AAAAAAAAHC8/eM8gsaFPNNI/s1600/beginner7.PNG"><img src="http://i2.wp.com/2.bp.blogspot.com/_qDb3uKm69NY/TFUXB_2zazI/AAAAAAAAHC8/eM8gsaFPNNI/s320/beginner7.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

hmm how about rounded corner for those icons?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-icon</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">border</span><span style="color: #00AA00;">:</span><span style="color: #933;">2px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#cccccc</span><span style="color: #00AA00;">;</span>
    -moz-border-radius<span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
    -webkit-border-radius<span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
&nbsp;
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i2.wp.com/1.bp.blogspot.com/_qDb3uKm69NY/TFUXEhIvNEI/AAAAAAAAHDE/IgcqqVrEDBE/s1600/beginner8.PNG"><img src="http://i0.wp.com/1.bp.blogspot.com/_qDb3uKm69NY/TFUXEhIvNEI/AAAAAAAAHDE/IgcqqVrEDBE/s320/beginner8.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

hmm how about [fonts](http://web.mit.edu/jmorzins/www/fonts.html), I just don&#8217;t like my theme default font for my widget

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wow-recruit-widget</span> <span style="color: #00AA00;">&#123;</span>
&nbsp;
    <span style="color: #000000; font-weight: bold;">font-family</span><span style="color: #00AA00;">:</span>verdana<span style="color: #00AA00;">;</span>
&nbsp;
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i0.wp.com/3.bp.blogspot.com/_qDb3uKm69NY/TFUXNlSZ_UI/AAAAAAAAHDU/NrQvyd-NTg4/s1600/beginner9.PNG"><img src="http://i1.wp.com/3.bp.blogspot.com/_qDb3uKm69NY/TFUXNlSZ_UI/AAAAAAAAHDU/NrQvyd-NTg4/s320/beginner9.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

So I want different color for different spec text (1.2.2 I&#8217;ve made note has a class name corresponding to what you typed in the note, i.e. if you typed &#8220;Frost&#8221; in the note, the class of that note will be &#8220;wr-frost&#8221;)

*note Death Knight becomes DKnight here, class texts are now fully customizable in 1.2.x, so you can change to whatever you want

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-frost</span>                       <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">color</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#409FFF</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-blood</span>                       <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">color</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#FF4F4F</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-feraltank</span>                   <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">color</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#52B2A5</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span>
&nbsp;
<span style="color: #6666ff;">.wr-note</span>                        <span style="color: #00AA00;">&#123;</span><span style="color: #000000; font-weight: bold;">font-style</span><span style="color: #00AA00;">:</span><span style="color: #993333;">normal</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i0.wp.com/4.bp.blogspot.com/_qDb3uKm69NY/TFUXQ2TpMCI/AAAAAAAAHDc/KVr_OmKWoCY/s1600/beginner10.PNG"><img src="http://i2.wp.com/4.bp.blogspot.com/_qDb3uKm69NY/TFUXQ2TpMCI/AAAAAAAAHDc/KVr_OmKWoCY/s320/beginner10.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

<span style="font-size: x-large;">Intermediate</span>

So you do know some html and css, but maybe not much php,�enough for](http://html-color-codes.com/) and](http://code.google.com/webfonts) as you probably know all of those already, since the outputs of this widget are all divs, we can do a lot more than that.

At this point I assume you should know and understand](http://www.w3schools.com/css/) , so I will only post important style codes for each examples below

From here, a good [text editor with syntax highlighting](http://notepad-plus-plus.org/) or even [IDE with�syntax checking](http://netbeans.org/) will help big time.

Then you may want to [work with a local](http://www.wampserver.com/en/) [wordpress installation](http://wordpress.org/) before you put them onto your site.

And if you want to make rounded corner and box shadow work in IE, you may want to have a look at](http://css3pie.com/) , upload that to root folder of your server and add

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;">behavior<span style="color: #00AA00;">:</span> <span style="color: #993333;">url</span><span style="color: #00AA00;">&#40;</span><span style="color: #ff0000; font-style: italic;">/PIE.htc</span><span style="color: #00AA00;">&#41;</span><span style="color: #00AA00;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

to your rounded classes, and it should work, but it sometimes break in IE 6 if coupled with other filters like png filters and definitely not work at 5.x &#8230;&#8230;. that is, [if you care about those ancient technologies](http://idroppedie6.com/), believe me, your [target audiences](http://www.dailygame.net/forums/index.php?topic=375.0) won&#8217;t be using that 2002 computer that came with [those browsers](http://en.wikipedia.org/wiki/Internet_Explorer#Internet_Explorer_6)

Ok let&#8217;s go back to our tute.

say you want something look like this, it looks like a big change? nah, it is still achievable by just editing a few classes!

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i2.wp.com/4.bp.blogspot.com/_qDb3uKm69NY/TFUXWgTG5-I/AAAAAAAAHDk/_nJcOnK3x1U/s1600/intermediate1.PNG"><img src="http://i1.wp.com/4.bp.blogspot.com/_qDb3uKm69NY/TFUXWgTG5-I/AAAAAAAAHDk/_nJcOnK3x1U/s320/intermediate1.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

&nbsp;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-item</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">display</span><span style="color: #00AA00;">:</span><span style="color: #993333;">block</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">float</span><span style="color: #00AA00;">:</span><span style="color: #000000; font-weight: bold;">left</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span><span style="color: #933;">90px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">65px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">padding</span><span style="color: #00AA00;">:</span><span style="color: #933;">0px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">margin</span><span style="color: #00AA00;">:</span><span style="color: #933;">2px</span><span style="color: #00AA00;">;</span>
    -moz-border-radius<span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
    -webkit-border-radius<span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">border-radius</span><span style="color: #00AA00;">:</span><span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
    -moz-border-radius-bottomright<span style="color: #00AA00;">:</span><span style="color: #933;">0px</span><span style="color: #00AA00;">;</span>
    -webkit-border-bottom-right-radius<span style="color: #00AA00;">:</span><span style="color: #933;">0px</span><span style="color: #00AA00;">;</span>
    -moz-box-shadow<span style="color: #00AA00;">:</span> <span style="color: #933;">3px</span> <span style="color: #933;">3px</span> <span style="color: #933;">3px</span> <span style="color: #cc00cc;">#666</span><span style="color: #00AA00;">;</span> <span style="color: #808080; font-style: italic;">/* Firefox */</span>
    -webkit-box-shadow<span style="color: #00AA00;">:</span> <span style="color: #933;">3px</span> <span style="color: #933;">3px</span> <span style="color: #933;">3px</span> <span style="color: #cc00cc;">#666</span><span style="color: #00AA00;">;</span> <span style="color: #808080; font-style: italic;">/* Safari, Chrome */</span>
    box-shadow<span style="color: #00AA00;">:</span> <span style="color: #933;">3px</span> <span style="color: #933;">3px</span> <span style="color: #933;">3px</span> <span style="color: #cc00cc;">#666</span><span style="color: #00AA00;">;</span> <span style="color: #808080; font-style: italic;">/* CSS3 */</span>
    <span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#444444</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-odd</span> <span style="color: #00AA00;">&#123;</span>
&nbsp;
<span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-even</span> <span style="color: #00AA00;">&#123;</span>
&nbsp;
<span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-left</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">display</span><span style="color: #00AA00;">:</span><span style="color: #993333;">block</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">float</span><span style="color: #00AA00;">:</span> <span style="color: #000000; font-weight: bold;">left</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span> <span style="color: #933;">25px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span> <span style="color: #933;">30px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">text-align</span><span style="color: #00AA00;">:</span><span style="color: #993333;">center</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-right</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">display</span><span style="color: #00AA00;">:</span><span style="color: #993333;">block</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">float</span><span style="color: #00AA00;">:</span><span style="color: #000000; font-weight: bold;">left</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">30px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span><span style="color: #933;">50px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">position</span><span style="color: #00AA00;">:</span><span style="color: #993333;">relative</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
&nbsp;
<span style="color: #6666ff;">.wr-class-text</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">display</span><span style="color: #00AA00;">:</span><span style="color: #993333;">block</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">margin-left</span><span style="color: #00AA00;">:</span><span style="color: #933;">5px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">30px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">line-height</span><span style="color: #00AA00;">:</span><span style="color: #933;">15px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span><span style="color: #933;">40px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">margin-top</span><span style="color: #00AA00;">:</span><span style="color: #933;">5px</span><span style="color: #00AA00;">;</span>
    <span style="color: #808080; font-style: italic;">/*position:absolute;
    top:0px;
    left:0px;*/</span>
<span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-status</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">display</span><span style="color: #00AA00;">:</span><span style="color: #993333;">block</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">margin-left</span><span style="color: #00AA00;">:</span><span style="color: #933;">5px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">15px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">line-height</span><span style="color: #00AA00;">:</span><span style="color: #933;">15px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span><span style="color: #933;">20px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">position</span><span style="color: #00AA00;">:</span><span style="color: #993333;">absolute</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">top</span><span style="color: #00AA00;">:</span><span style="color: #933;">45px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">left</span><span style="color: #00AA00;">:</span><span style="color: #933;">-25px</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-note</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">display</span><span style="color: #3333ff;">:inline-</span>block<span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">font-weight</span><span style="color: #00AA00;">:</span><span style="color: #993333;">normal</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">font-style</span><span style="color: #00AA00;">:</span><span style="color: #993333;">italic</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">color</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#cee683</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">line-height</span><span style="color: #00AA00;">:</span><span style="color: #933;">15px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span><span style="color: #933;">30px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">15px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">margin-left</span><span style="color: #00AA00;">:</span><span style="color: #933;">5px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">position</span><span style="color: #00AA00;">:</span><span style="color: #993333;">absolute</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">top</span><span style="color: #00AA00;">:</span><span style="color: #933;">30px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">left</span><span style="color: #00AA00;">:</span><span style="color: #933;">-25px</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
&nbsp;
<span style="color: #6666ff;">.wr-icon</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">vertical-align</span><span style="color: #00AA00;">:</span><span style="color: #993333;">middle</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span> <span style="color: #933;">25px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">25px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">background</span><span style="color: #00AA00;">:</span><span style="color: #993333;">url</span><span style="color: #00AA00;">&#40;</span><span style="color: #ff0000; font-style: italic;">../../plugins/wow-recruit-widget/img/class-sprite.png</span><span style="color: #00AA00;">&#41;</span><span style="color: #00AA00;">;</span>
&nbsp;
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

so you want to change the icon? no worries

(note that css background resizing is very problematic, so it&#8217;s better not doing it, the work around is to resize .wr-icon class to fit the icon,�or resize the icon image itself with paint or whatsoever,�hot linking image is not a very good practice, unless it&#8217;s a very reliable source, code below is just an example)

note that here I&#8217;ve used .wr-icon.wr-deathknight, and removed background from .wr-icon, because if you only put background to .wr-deathknight, the background image will apply to class text block as well.

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i0.wp.com/2.bp.blogspot.com/_qDb3uKm69NY/TFUXfcnBlDI/AAAAAAAAHDs/2HEC-06HiE0/s1600/intermediate2.PNG"><img src="http://i2.wp.com/2.bp.blogspot.com/_qDb3uKm69NY/TFUXfcnBlDI/AAAAAAAAHDs/2HEC-06HiE0/s320/intermediate2.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

&nbsp;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-icon</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">vertical-align</span><span style="color: #00AA00;">:</span><span style="color: #993333;">middle</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span><span style="color: #933;">40px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">40px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">position</span><span style="color: #00AA00;">:</span><span style="color: #993333;">absolute</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">top</span><span style="color: #00AA00;">:</span><span style="color: #933;">-10px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">left</span><span style="color: #00AA00;">:</span><span style="color: #933;">-10px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">background-position</span><span style="color: #00AA00;">:</span><span style="color: #993333;">center</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">background-repeat</span><span style="color: #00AA00;">:</span> <span style="color: #993333;">no-repeat</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-icon</span><span style="color: #6666ff;">.wr-deathknight</span> <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">background-image</span><span style="color: #00AA00;">:</span><span style="color: #993333;">url</span><span style="color: #00AA00;">&#40;</span><span style="color: #ff0000; font-style: italic;">http://area52.wowstead.com/files/icons/favicon/classround/class_deathknight.png</span><span style="color: #00AA00;">&#41;</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span>
&nbsp;
<span style="color: #6666ff;">.wr-icon</span><span style="color: #6666ff;">.wr-druid</span>   <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">background-image</span><span style="color: #00AA00;">:</span><span style="color: #993333;">url</span><span style="color: #00AA00;">&#40;</span><span style="color: #ff0000; font-style: italic;">http://area52.wowstead.com/files/icons/favicon/classround/class_druid.png</span><span style="color: #00AA00;">&#41;</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span>
&nbsp;
<span style="color: #6666ff;">.wr-icon</span><span style="color: #6666ff;">.wr-priest</span>  <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">background-image</span><span style="color: #00AA00;">:</span><span style="color: #993333;">url</span><span style="color: #00AA00;">&#40;</span><span style="color: #ff0000; font-style: italic;">http://area52.wowstead.com/files/icons/favicon/classround/class_priest.png</span><span style="color: #00AA00;">&#41;</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.wr-icon</span><span style="color: #6666ff;">.wr-rogue</span>  <span style="color: #00AA00;">&#123;</span> <span style="color: #000000; font-weight: bold;">background-image</span><span style="color: #00AA00;">:</span><span style="color: #993333;">url</span><span style="color: #00AA00;">&#40;</span><span style="color: #ff0000; font-style: italic;">http://area52.wowstead.com/files/icons/favicon/classround/class_rogue.png</span><span style="color: #00AA00;">&#41;</span><span style="color: #00AA00;">;</span><span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

I just think status is not very necessary

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i1.wp.com/3.bp.blogspot.com/_qDb3uKm69NY/TFUXi7A0J2I/AAAAAAAAHD0/P1nce-Ja2e4/s1600/intermediate3.PNG"><img src="http://i1.wp.com/3.bp.blogspot.com/_qDb3uKm69NY/TFUXi7A0J2I/AAAAAAAAHD0/P1nce-Ja2e4/s320/intermediate3.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

&nbsp;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-status</span>
<span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">display</span><span style="color: #00AA00;">:</span><span style="color: #993333;">none</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
&nbsp;
<span style="color: #6666ff;">.wr-item</span>
<span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">50px</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

nope I changed my mind, I don&#8217;t want class text instead.

<div class="separator" style="clear: both; text-align: center;">
  <a href="http://i0.wp.com/2.bp.blogspot.com/_qDb3uKm69NY/TFUXmDgeEkI/AAAAAAAAHD8/9N0UliKh9ek/s1600/intermediate4.PNG"><img src="http://i1.wp.com/2.bp.blogspot.com/_qDb3uKm69NY/TFUXmDgeEkI/AAAAAAAAHD8/9N0UliKh9ek/s320/intermediate4.PNG?w=660" alt="" border="0" data-recalc-dims="1" /></a>
</div>

&nbsp;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.wr-item</span>
<span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">40px</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
&nbsp;
<span style="color: #6666ff;">.wr-status</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">display</span><span style="color: #00AA00;">:</span><span style="color: #993333;">block</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">margin-left</span><span style="color: #00AA00;">:</span><span style="color: #933;">5px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">15px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">line-height</span><span style="color: #00AA00;">:</span><span style="color: #933;">15px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span><span style="color: #933;">20px</span><span style="color: #00AA00;">;</span>
   <span style="color: #808080; font-style: italic;">/*position:absolute;
    top:45px;
    left:-25px;*/</span>
<span style="color: #00AA00;">&#125;</span>
&nbsp;
<span style="color: #6666ff;">.wr-note</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">display</span><span style="color: #00AA00;">:</span><span style="color: #993333;">block</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">font-weight</span><span style="color: #00AA00;">:</span><span style="color: #993333;">normal</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">font-style</span><span style="color: #00AA00;">:</span><span style="color: #993333;">italic</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">color</span><span style="color: #00AA00;">:</span><span style="color: #cc00cc;">#cee683</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">line-height</span><span style="color: #00AA00;">:</span><span style="color: #933;">15px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span><span style="color: #933;">30px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">height</span><span style="color: #00AA00;">:</span><span style="color: #933;">15px</span><span style="color: #00AA00;">;</span>
    <span style="color: #000000; font-weight: bold;">margin-left</span><span style="color: #00AA00;">:</span><span style="color: #933;">5px</span><span style="color: #00AA00;">;</span>
    <span style="color: #808080; font-style: italic;">/*position:absolute;
    top:30px;
    left:-25px;*/</span>
<span style="color: #00AA00;">&#125;</span>
&nbsp;
<span style="color: #6666ff;">.wr-class-text</span> <span style="color: #00AA00;">&#123;</span>
    <span style="color: #000000; font-weight: bold;">display</span><span style="color: #00AA00;">:</span><span style="color: #993333;">none</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<span style="font-family: 'Times New Roman'; font-size: x-large;">Hard Core</span>

hey you are coder already what do you need me to teach you? you maybe better than me already

<div style="margin: 0px;">
  <p>
    At this point you may notice, I have only used very few�<a href="http://www.w3schools.com/css/">css</a> properties, not even used much�<a href="http://www.w3schools.com/css/css_positioning.asp">positioning</a>,�<a href="http://www.w3schools.com/css/css_float.asp">float</a>,�<a href="http://www.w3schools.com/css/pr_pos_z-index.asp">z-index</a>,�<a href="http://www.w3schools.com/css/css_align.asp">alignment</a>, etc, as well as�<a href="http://www.css3.info/preview/">css3</a> <a href="http://www.css3.com/">stuffs</a> like transform(rotate), alpha, text shadow, etc and I haven&#8217;t used any graphic manipulation tools at all for the whole article.
  </p>
</div>

<div style="margin: 0px;">
  so you can even do more if you can do some graphic manipulation, like adding gradient backgrounds, (<a href="http://www.zenelements.com/blog/css3-gradients/">css3 gradient</a> is not supported by quite a few browsers yet, so I don&#8217;t recommend that option), make cooler icons, etc etc.
</div>

ok something more for you. that is, wordpress gives each widget a unique id, say your 10 man recruit widget is wow-recruit-widget-6 and 25 man one is wow-recruit-widget-9,

you can style individual widget with its own class by specifying css id, check your browser&#8217;s developer tool for the actual div id on the generated html

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #cc00cc;">#wow-recruit-widget-6</span> <span style="color: #6666ff;">.wow-recruit</span>
<span style="color: #00AA00;">&#123;</span>
    <span style="color: #808080; font-style: italic;">/*something something*/</span>
<span style="color: #00AA00;">&#125;</span>
&nbsp;
<span style="color: #cc00cc;">#wow-recruit-widget-9</span> <span style="color: #6666ff;">.wr-item</span>
<span style="color: #00AA00;">&#123;</span>
    <span style="color: #808080; font-style: italic;">/*something something*/</span>
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<span style="font-size: x-large;">Conclusion</span>

so you can pretty much break the whole layout and reconstruct as long as they are still having the same elements, or if you know jQuery or know how to use DOM model with other javascript libraries, you can even replace those elements with what you want. here I won&#8217;t say much about those, since if it requires so much code, it loses the point of plug in already.

at this point I have no plan to make a more graphical version for this widget, like with more icons instead of texts

hope this tutorial helps to customize your WOW Recruitment Widget, and maybe you&#8217;ve learnt some css here, if you like this article about css, feel free to leave a comment here or recommend to your friends

Oh yeah, share with me with your cool looking themes! :smile:

Have fun!

<span style="font-size: x-large;">Appendix</span>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    <strong>CSS Block Structure for reference:</strong>
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    wow-recruit-widget
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    |wr-container
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    ||wr-item wr-odd
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    |||wr-left
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    ||||wr-icon wr-shaman
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    |||wr-right
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    ||||wr-class-text wr-shaman
  </div>

  <div style="margin: 0px;">
    ||||wr-note
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    ||||wr-status wr-High
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    ||wr-item wr-even
  </div>
</div>

<div style="margin: 0px;">
  <div style="margin: 0px;">
    <strong>Default Layout (lines below illustrate CSS block structure):</strong>
  </div>
</div>

<div class="separator" style="clear: both; text-align: center; margin: 0px;">
  <a href="http://i0.wp.com/3.bp.blogspot.com/_qDb3uKm69NY/TBw3Uj7uOJI/AAAAAAAAHBA/Bqit2noV9-k/s1600/Capture.JPG"><img src="http://i1.wp.com/3.bp.blogspot.com/_qDb3uKm69NY/TBw3Uj7uOJI/AAAAAAAAHBA/Bqit2noV9-k/s400/Capture.JPG?resize=315%2C400" alt="" border="0" data-recalc-dims="1" /></a>
</div>
