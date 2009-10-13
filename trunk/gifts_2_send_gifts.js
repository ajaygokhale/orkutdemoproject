var givenGifts = {};

function giveGift() {
  var nut = document.getElementById('nut').value;
  var friend = document.getElementById('person').value;
  
  givenGifts[friend] = nut;
  var json = gadgets.json.stringify(givenGifts);
  
  var req = opensocial.newDataRequest();
  req.add(req.newUpdatePersonAppDataRequest(opensocial.DataRequest.PersonId.VIEWER, 'gifts', json));
  req.send();
}

function makeOptionsMenu() {
  var options = ['a cashew nut', 'a peanut', 'a hazelnut', 'a red pistachio nut'];
                 
  var html = new Array();
  html.push('<select id="nut">');
  for (var i = 0; i < options.length; i++) {
    html.push('<option value="' + i + '">' + options[i] + '</option>');
  }
  html.push('</select>');
  document.getElementById('gifts').innerHTML = html.join('');
}

function loadFriends() {
  var req = opensocial.newDataRequest();
  req.add(req.newFetchPersonRequest('VIEWER'), 'viewer');
  req.add(req.newFetchPeopleRequest('VIEWER_FRIENDS'), 'viewerFriends');
  req.send(onLoadFriends);
}

function onLoadFriends(data) {
  var viewer = data.get('viewer').getData();
  var viewerFriends = data.get('viewerFriends').getData();
  
  html = new Array();
  html.push('<select id="person">');
  viewerFriends.each(function(person) {
    html.push('<option value="' + person.getId() + '">' + person.getDisplayName() + "</option>");
  });
  html.push('</select>');
  document.getElementById('friends').innerHTML = html.join('');
}

function init() {
  loadFriends();
  
  makeOptionsMenu();
}
