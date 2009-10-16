<?php
$xml = 'http://www.ishwar.com/ishwar.xml';
//$xml = 'ishwar.xml';
//$xml = 'http://news.google.com/news?ned=us&topic=h&output=rss';
//$xml = 'http://www.ishwarllc.net/rsswrite/channels.xml' ;

$xmlDoc = new DOMDocument();
$rs = $xmlDoc->load($xml);

$title = $xmlDoc->getElementsByTagName('item');

$thought= $xmlDoc->getElementsByTagName('item')->item(0)->getElementsByTagName('description')->item(0)->nodeValue ;
?>
<link href="thought_css.css" rel="stylesheet" type="text/css" />
<div style="padding: 10px;" class="thborder">
	<div class="thought_main" >
		<?php echo $thought; ?>
	</div>
	
  <div style="clear: both;"/></div>
</div>