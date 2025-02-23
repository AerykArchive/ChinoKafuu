const { Command, EmbedBuilder, version } = require('../../../utils')
const moment = require('moment')
const os = require('os')
require('moment-duration-format')
const { CommandBase } = require('eris')

module.exports = class BotInfoCommand extends Command {
  constructor() {
    super({
      name: 'botinfo',
      aliases: ['infobot'],
      arguments: 0,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('botinfo')
        .setDescription('Shows more information about me.')
    })
  }

  async run(ctx) {
    const getCommit = ctx.client.pluginManager.pluginStore.get('buildStore').classState
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setTitle(ctx._locale('commands:botinfo.title'))
    embed.setDescription(ctx._locale('commands:botinfo.inviteMe', { 0: ctx.client.user.id }))
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()
    embed.setUrl(`https://discord.com/oauth2/authorize?client_id=${ctx.client.user.id}&scope=bot%20applications.commands&permissions=8560045566`)
    embed.addField(ctx._locale('commands:botinfo.guildsAmount'), this.markDown('js', Number(ctx.client.guilds.size).toLocaleString()), true)
    embed.addField(ctx._locale('commands:botinfo.usersAmount'), this.markDown('js', Number(ctx.client.users.size).toLocaleString()), true)
    embed.addBlankField()
    embed.addField(ctx._locale('commands:botinfo.shardLatency'), this.markDown('glsl', `#[Shard: ${ctx.message.guild.shard.id}] ${ctx.message.guild.shard.latency}ms`), true)
    embed.addField(ctx._locale('commands:botinfo.memoryUsage'), this.markDown('glsl', `#${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB (${(process.resourceUsage().maxRSS / 1024 / 1024).toFixed(2)}MB)`), true)
    embed.addField(ctx._locale('commands:botinfo.clientVersion'), this.markDown('glsl', `#${version} ${getCommit.commit === null ? '' : `(${getCommit.commit.substring(0, 7)})`}`), true)
    embed.addField(ctx._locale('commands:botinfo.shardUptime'), this.markDown('js', `${moment.duration(Date.now() - ctx.client.shardUptime.get(ctx.message.guild.shard.id).uptime).format('dd:hh:mm:ss', { stopTrim: 'd' })}`), true)
    embed.addField(ctx._locale('commands:botinfo.cpuModel'), this.markDown('diff', `- ${os.cpus().map(i => i.model)[0]}`), true)
    embed.addBlankField()
    embed.addField(ctx._locale('commands:botinfo.supportServer'), `[${ctx._locale('basic:clickHere')}](https://discord.gg/Jr57UrsXeC)`, true)
    embed.addField('Github', `[${ctx._locale('basic:clickHere')}](https://github.com/RabbitHouseCorp/ChinoKafuu)`, true)
    embed.addField('Twitter', '[@ChinoKafuuBot](https://twitter.com/ChinoKafuuBot)', true)
    embed.addField('top.gg', '[top.gg](https://top.gg/bot/481282441294905344/vote)', true)
    embed.addField('Crowdin', '[crowdin.com/project/chinokafuu](https://crowdin.com/project/chinokafuu)', true)

    ctx.send(embed.build())
  }

  markDown(code, text) {
    return `\`\`\`${code}\n${text}\`\`\``
  }
}
