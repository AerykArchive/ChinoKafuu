const { Command } = require('../../../utils')

module.exports = class AddRoleCommand extends Command {
  constructor() {
    super({
      name: 'addrole',
      arguments: 2,
      aliases: ['adicionarcargo'],
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageRoles']
      }]
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const role = ctx.getRole(ctx.args[1])
    if (!role) return ctx.replyT('error', 'basic:invalidRole')

    const guildMember = ctx.message.guild.members.get(member.id)
    guildMember.addRole(role.id)
      .then(() => {
        ctx.replyT('success', 'commands:addrole.success')
      })
      .catch(() => ctx.replyT('error', 'commands:addrole.higher'))
  }
}
