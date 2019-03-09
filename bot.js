const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var cron = require('node-cron');
const config = require('./config.json');
const questions = require('./questions.json');

client.on('ready', () => {
    client.user.setStatus('online')
    cron.schedule('0 0 18 * * *', () =>
    {
        EnvoyerQuestion();
    })
});

function EnvoyerQuestion()
{
    client.channels.get(config.id_salon).send(questions.questions[questions.compteur])
    
    questions.compteur === questions.compteur++

    fs.writeFile('./questions.json', JSON.stringify(questions, null, 2), (err) =>
    {
        console.log(questions.compteur)
    })
}

client.login(config.token);