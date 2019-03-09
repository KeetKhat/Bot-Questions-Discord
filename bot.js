const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var cron = require('node-cron');
const config = require('./config.json');
const questions = require('./questions.json');

client.on('ready', () => {
    client.user.setStatus('online')
    cron.schedule('0 0 17 * * *', () =>
    {
        EnvoyerQuestion();
    })
});

function EnvoyerQuestion()
{
    const embed = new Discord.RichEmbed()

    embed.addField('Réflexion du jour', questions.questions[questions.compteur])
        .setColor(config.couleur)

    client.channels.get(config.id_salon).send(embed)
    
    questions.compteur === questions.compteur++

    fs.writeFile('./questions.json', JSON.stringify(questions, null, 2), (err) =>
    {
        if (err)
        {
            console.log('Impossible d\'enregistrer le fichier');
        }
    })
}

client.login(config.token);