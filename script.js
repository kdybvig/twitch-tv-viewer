const container = document.getElementById('container')
const boxes = document.getElementsByClassName('box');
let lastOnline = 1;
const addBox = (username) => {
const xhr = new XMLHttpRequest();
const chanUrl = 'https://wind-bow.glitch.me/twitch-api/channels/' + username
const streamUrl = 'https://wind-bow.glitch.me/twitch-api/streams/' + username
xhr.open('GET', chanUrl, false);
xhr.send();
const userData = JSON.parse(xhr.response);
const logo = document.createElement('img');
const box = document.createElement('div');
box.className='box'
logo.className = 'logo';
const displayName = document.createElement('a');
displayName.className = 'display-name';
displayName.innerHTML= userData.display_name;
displayName.href= 'https://www.twitch.tv/' + username;
displayName.target = '_blank'
logo.src = userData.logo;
box.appendChild(logo);
box.appendChild(displayName);
const xhr2 = new XMLHttpRequest();
xhr2.open('GET', streamUrl, false);
xhr2.send();
const userStream = JSON.parse(xhr2.response);
const status = document.createElement('p');
status.className = 'status';
if (!userStream.stream) {
  status.innerHTML = 'Offline';
  box.appendChild(status);
  box.style.backgroundColor = '#BBB';
  container.appendChild(box);
} else {
  status.innerHTML = userData.game + ': ' + userData.status;
  box.appendChild(status);
  container.insertBefore(box, boxes[lastOnline]);
  lastOnline ++;
}
}

const rawUsers = ["ninja", "freecodecamp", "JavaScriptCodingGuru", "MTGGoldfish", "RobotCaleb", "OgamingSC2", "ESL_SC2", "noobs2ninjas"]
const users = rawUsers.map(str => str.toLowerCase());
users.sort();
for (i=0; i < users.length; i++) {
addBox(users[i]);
}

function changeButtons (index) {
  const buttons = document.getElementsByTagName('button');
  for (i=0; i<3; i++) {
    if (i === index) {
      buttons[i].className = 'white';
    } else {
      buttons[i].className = '';
    }

  }
}

function getAllUsers () {
  changeButtons(0);
  for (i=1; i<boxes.length; i++) {
  boxes[i].style.display = 'grid';
  }
}
function getOnlineUsers () {
   changeButtons(1);
  for (i=1; i< boxes.length; i++) {
    if (boxes[i].getElementsByClassName('status')[0].innerHTML === 'Offline') {
    boxes[i].style.display = 'none';
  } else {boxes[i].style.display = 'grid'}
}
}

function getOfflineUsers () {
  changeButtons(2);
  for (i=1; i< boxes.length; i++) {
    if (boxes[i].getElementsByClassName('status')[0].innerHTML != 'Offline') {
    boxes[i].style.display = 'none';
  } else {
    boxes[i].style.display = 'grid'}
}
}

function searchFor (input) {
  getAllUsers();
  input = input.toLowerCase();
  for (i=1; i<boxes.length; i++) {
    const dispName = boxes[i].getElementsByTagName('a')[0].innerHTML.toLowerCase();
    if (dispName.indexOf(input) > -1) {
      boxes[i].style.display = 'grid';
    } else {
      boxes[i].style.display = 'none';
    }
  }
}
