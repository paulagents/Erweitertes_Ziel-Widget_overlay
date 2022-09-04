let fieldData;
let isMet = false;

window.addEventListener('onWidgetLoad', function (obj) {
  let timeToRefresh = 60;
  fieldData = obj.detail.fieldData;
  channelName = obj.detail.fieldData.channel;
  getData();
  setInterval(function () {
  getData();
  }, timeToRefresh * 1000);
  function getData() {
  if (fieldData.goaltype == 'Viewers') {
    $.get("https://decapi.me/twitch/viewercount/" + channelName, function (data2) {
      $('#Viewers').text(data2);
    });
  }
  }
  
   $.get("https://decapi.me/twitch/avatar/" + channelName, function (data2) {
      $('#user_pic').attr('src', data2);
    });
  
  let data = obj["detail"]["session"]["data"];
  channelName = obj.detail.fieldData.channel;
  let _Viewers = fieldData.viewergoal;
  let _Followers = fieldData.followergoal;
  let _Subcount = fieldData.subgoal;
  let _Donations = fieldData.donogoal;
  let _Cheers = fieldData.cheergoal;
  let goaltype = fieldData.goaltype;
  let goaltype2 = fieldData.goaltype2;
  let isMet = false;
  mainNumber(data);
});

  window.addEventListener('onSessionUpdate', function (obj) {
    let data = obj["detail"]["session"];
    mainNumber(data);
});

  function mainNumber(data) {
  $('#channel').text(fieldData.channel);
  $('#Subcount').text(data["subscriber-{{goalrange}}"]["count"]);
  $('#Cheers').text(data["cheer-{{goalrange}}"]["amount"]);
  $('#Donations').text(data["tip-{{goalrange}}"]["amount"]);
  $('#Followers').text(data["follower-{{goalrange}}"]["count"]);

    updateBar(data);
}
  
function updateBar(amount) {
  let _Viewers = fieldData.viewergoal;
  let _Followers = fieldData.followergoal;
  let _Subcount = fieldData.subgoal;
  let _Donations = fieldData.donogoal;
  let _Cheers = fieldData.cheergoal;
  let goaltype = fieldData.goaltype;
  let goaltype2 = fieldData.goaltype2;
    var width = $('#{{goaltype}}').text() / _{{goaltype}};
    var bargoal = $('#{{goaltype}}').text()
    console.log(_{{goaltype}});
    if (width >= 1) {
      width = 1;
    }
    console.log();
    $('#barCont').width(width * 226);
    var width2 = $('#{{goaltype2}}').text() / _{{goaltype2}};
    var bargoal2 = $('#{{goaltype2}}').text()
    if (width2 >= 1) {
      width2 = 1;
    }
    $('#barCont2').width(width2 * 226);

    if (parseInt(bargoal) >= parseInt(_{{goaltype}}) && isMet == false) {
      isMet = true;
      playVid();
    }
    if (parseInt(bargoal2) >= parseInt(_{{goaltype2}}) && isMet == false) {
      isMet = true;
      playVid();
    }
  }

function playVid() {
  var vid = document.getElementById("vid");
  var goalAudio = document.getElementById("goalAudio");
  var soundVolume = 10;
  vid.volume = soundVolume * .01;
  vid.play();
  goalAudio.play();
  $("#vid").fadeIn("slow");

  setTimeout(function () {
    $("#vid").fadeOut("slow");
    $("#vid")[0].pause();
  }, 8000);
}

