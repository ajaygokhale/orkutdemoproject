<?php
$xml = 'http://www.ishwar.com/ishwar.xml';
//$xml = 'ishwar.xml';
//$xml = 'http://news.google.com/news?ned=us&topic=h&output=rss';
//$xml = 'http://www.ishwarllc.net/rsswrite/channels.xml' ;

$xmlDoc = new DOMDocument();
$rs = $xmlDoc->load($xml);

$title = $xmlDoc->getElementsByTagName('item');

$thought= $xmlDoc->getElementsByTagName('item')->item(0)->getElementsByTagName('description')->item(0)->nodeValue ;

//Find Logo Code
$arrThought = split('--',$thought) ;

$arrLogo = split(',',$arrThought[1]);

$imgCode = trim(strtolower($arrLogo[0])) ;

//Image Array
$arrImages = array(
		'bahai' => 'http://www.ishwar.com/images/person/person01.jpg',
		'buddhism' => 'http://www.ishwar.com/images/person/person02.jpg',
		'christianity' => 'http://www.ishwar.com/images/person/person03.jpg',
		'confucianism' => 'http://www.ishwar.com/images/person/person04.jpg',
		'hinduism' => 'http://www.ishwar.com/images/person/person05.jpg',
		'islam' => 'http://www.ishwar.com/images/person/person06.jpg',
		'jainism' => 'http://www.ishwar.com/images/person/person07.jpg',
		'judaism' => 'http://www.ishwar.com/images/person/person08.jpg',
		'shinto' => 'http://www.ishwar.com/images/person/person09.jpg',
		'sikhism' => 'http://www.ishwar.com/images/person/person10.jpg',
		'taoism' => 'http://www.ishwar.com/images/person/person11.jpg',
		'zoroastrianism' => 'http://www.ishwar.com/images/person/person12.jpg'
		);

$logoName = '<img src="' . $arrImages[$imgCode] . '" alt="$imgCode" />' ;

//echo '<pre>';
//print_r($arrLogo);
//echo '</pre>';
?>
<link href="thought_css.css" rel="stylesheet" type="text/css" />
<!--
<div style="padding: 10px;" class="thborder">
	<div class="thought_main" >
		<?php echo $thought; ?>
	</div>
	
  <div style="clear: both;"/></div>
</div>
<hr />
-->
<!--
<div style="padding: 10px;" class="thborder">
	<div id="div_logo" class="thought_main" style="float:left; padding:1px 10px 10px 10px;" >
		<?php echo $logoName; ?>
	</div>

	<div class="thought_main" style="padding:10px 1px 1px 1px;" >
		<?php echo $thought; ?>
	</div>
	
  <div style="clear: both;"/></div>
</div>
<hr />
-->
<div style="padding: 10px;" class="thborder">
<table width="95%" border="0" cellspacing="5">
	<tr>
	<td width="130px" valign="top"><?php echo $logoName; ?></td>
	<td width="100%" valign="top" class="thought_main" ><?php echo $thought; ?></td>
	</tr>
</table>

</div>

