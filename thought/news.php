<?php
//News info
?>
<html>
<head>
<script type="text/javascript" src="getrss.js"></script>
</head>
<body>

<form>
Select an RSS-feed:
<select onChange="showRSS(this.value)">
<option value="Google">Google News</option>
<option value="MSNBC">MSNBC News</option>
</select>
</form>

<p>
<div id="rssOutput" style="width:700px; background:#D5D5D5" >
	<b>RSS-feed will be listed here...</b>
</div>
</body>
</html>