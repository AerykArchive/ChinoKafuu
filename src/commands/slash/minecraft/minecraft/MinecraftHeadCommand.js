const { Command, EmbedBuilder, Emoji } = require('../../../../utils')

module.exports = class MinecraftHeadCommand extends Command {
  constructor() {
    super({
      name: 'minecraft head',
      aliases: [],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const body = `https://mc-heads.net/head/${ctx.args.get('minecraft-nickname').value}`
    const embed = new EmbedBuilder()
    embed.setColor('MINECRAFT')
    embed.setImage(body.toString())
    embed.setDescription(`${Emoji.getEmoji('minecraft').mention} [[Download]](${body})`)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
