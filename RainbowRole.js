const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const size    = config.colors;
const rainbow = new Array(size);


for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); 
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); 
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); 

  rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;
const servers = config.servers;


function changeColor() {
  for (let b = 0; b < servers.length; ++b) {		
    client.guilds.get(servers[b]).roles.find('name' , config.roleName  ).setColor(rainbow[place])
    
		.catch(console.error);
		
    if(config.logging){
      console.log(`Renk ${rainbow[place]}  server: ${servers[b]}`);
      
    }
    if(place == (size - 1)){
      place = 0;
    }else{
      place++;
    }
  }
}

client.on('ready', () => {
  console.log(`Giriş Yaptı => ${client.user.username}!`);
  if(config.speed < 1){console.log("Minimum hız 1 den yüksek olmalı"); process.exit(1);}
  setInterval(changeColor, config.speed);
});


client.login(config.token);
