var xmlhttp;

function showRSS(str)
  {
  xmlhttp=GetXmlHttpObject();
  if (xmlhttp==null)
    {
    alert ("Your browser does not support XML HTTP Request");
    return;
    }
  var url="getrss.php";
  url=url+"?q="+str;
  url=url+"&sid="+Math.random();
  xmlhttp.onreadystatechange=stateChanged;
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
  }

function stateChanged()
  {
  if (xmlhttp.readyState==4)
    {
    document.getElementById("rssOutput").innerHTML=xmlhttp.responseText;
    }
  }

function GetXmlHttpObject()
{
if (window.XMLHttpRequest)
  {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  return new XMLHttpRequest();
  }
if (window.ActiveXObject)
  {
  // code for IE6, IE5
  return new ActiveXObject("Microsoft.XMLHTTP");
  }
return null;
}