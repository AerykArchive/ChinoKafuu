const { Command } = require('../../../utils')

module.exports = class ClapCommand extends Command {
  constructor() {
    super({
      name: 'clap',
      aliases: ['palmas'],
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['useExternalEmojis']
      }]
    })
  }

  async run(ctx) {
    const clap = ctx.args.join(' ').split(' ').join('<a:clap:554482751542132736>')
    if (!clap) return ctx.replyT('error', 'commands:clap.noArgs')
    const option = ctx.message.member.permission.has('mentionEveryone')

    ctx.send(clap, option)
  }
}
