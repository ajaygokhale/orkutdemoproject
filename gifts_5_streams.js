var globalGivenGifts = {};
var globalViewer = {};
var globalFriends = {};

function postActivity(nut, friend) {
  var options = ['a cashew nut', 'a peanut', 'a hazelnut', 'a red pistachio nut'];
  
  var title = globalViewer.getDisplayName() + ' gave ' + globalFriends[friend] + ' ' + options[nut];
  var params = {};
  params[opensocial.Activity.Field.TITLE] = title;
  var activity = opensocial.newActivity(params);
  opensocial.requestCreateActivity(activity, opensocial.CreateActivityPriority.HIGH, function() {});
}

function updateReceivedList(viewer, data, friends) {
  var viewerId = viewer.getId();
  
  var options = ['a cashew nut', 'a peanut', 'a hazelnut', 'a red pistachio nut'];
  
  var html = new Array();
  html.push('You have received:<ul>');
  friends.each(function(person) {
    var personData = data[person.getId()];
    if (personData) {
      var json = data[person.getId()]['gifts'];
    
      var gifts = {}
      if (!json) {
        gifts = {};
      }
      try {
        gifts = gadgets.json.parse(gadgets.util.unescapeString(json));
      } catch (e) {
        gifts = {};
      }
    
      for (i in gifts) {
        if (+(i) > 0 && i == viewerId) {
          html.push('<li>' + options[gifts[i]] + ' from ' + person.getDisplayName() + '</li>');
        }
      }
    }
  });
  html.push('</ul>');
  document.getElementById('received').innerHTML = html.join('');
}

function updateGiftList(viewer, data, friends) {
  var json = data[viewer.getId()]['gifts'];
  
  if (!json) {
    globalGivenGifts = {};
  }
  try {
    globalGivenGifts = gadgets.json.parse(gadgets.util.unescapeString(json));
  } catch (e) {
    globalGivenGifts = {};
  }
  
  var options = ['a cashew nut', 'a peanut', 'a hazelnut', 'a red pistachio nut'];
  
  var html = new Array();
  html.push('You have given:');
  html.push('<ul>');
  for (i in globalGivenGifts) {
    if (+(i) > 0) {
      html.push('<li>' + friends[i] + ' received ' + options[globalGivenGifts[i]] + '</li>');
    }
  }
  html.push('</ul>');
  document.getElementById('given').innerHTML = html.join('');
}

function giveGift() {
  var nut = document.getElementById('nut').value;
  var friend = document.getElementById('person').value;
  
  globalGivenGifts[friend] = nut;
  var json = gadgets.json.stringify(globalGivenGifts);
  
  var req = opensocial.newDataRequest();
  req.add(req.newUpdatePersonAppDataRequest(opensocial.DataRequest.PersonId.VIEWER, 'gifts', json));
  req.add(req.newFetchPersonRequest('VIEWER'), 'viewer');
  req.add(req.newFetchPeopleRequest('VIEWER_FRIENDS'), 'viewerFriends');
  req.add(req.newFetchPersonAppDataRequest('VIEWER', 'gifts'), 'data');
  req.add(req.newFetchPersonAppDataRequest('VIEWER_FRIENDS', 'gifts'), 'viewerFriendData');
  req.send(onLoadFriends);
  
  postActivity(nut, friend);
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
  req.add(req.newFetchPersonAppDataRequest('VIEWER', 'gifts'), 'data');
  req.add(req.newFetchPersonAppDataRequest('VIEWER_FRIENDS', 'gifts'), 'viewerFriendData');
  req.send(onLoadFriends);
}

function onLoadFriends(data) {
  var viewer = globalViewer = data.get('viewer').getData();
  var viewerFriends = data.get('viewerFriends').getData();
  var giftData = data.get('data').getData();
  var viewerFriendData = data.get('viewerFriendData').getData();
  var friends = new Array();
  
  html = new Array();
  html.push('<select id="person">');
  viewerFriends.each(function(person) {
    html.push('<option value="' + person.getId() + '">' + person.getDisplayName() + "</option>");
    
    friends[person.getId()] = person.getDisplayName();
  });
  html.push('</select>');
  document.getElementById('friends').innerHTML = html.join('');
  
  globalFriends = friends;
  updateGiftList(viewer, giftData, friends);
  updateReceivedList(viewer, viewerFriendData, viewerFriends);
}

function init() {
  loadFriends();
  
  makeOptionsMenu();
}
