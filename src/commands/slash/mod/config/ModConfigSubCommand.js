const { Command } = require('../../../../utils')
const status = {
  TYPE_1: 'enable',
  TYPE_2: 'disable'
}

module.exports = class ModConfigSubCommand extends Command {
  constructor() {
    super({
      name: 'config mod',
      aliases: ['module', 'configurações', 'configurar'],
      permissions: [{
        entity: 'user',
        permissions: ['manageGuild']
      },
      {
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  run(ctx) {
    switch (ctx.args.get('status').value) {
      case status.TYPE_1: {
        // Tag: NEED_CHANNEL
        // Message: You need to search the channel in the command to select it and set the correct channel.
        if (ctx.args.get('channel')?.value === undefined) return ctx.replyT('error', 'commands:config.channel.needChannel')
        // Tag: CHANNEL_NOT_WAS_FOUND
        // Message: Woah! Channel not found check permissions from Chino Kafuu most likely she is without permission, if not permission then channel has been deleted.
        if (ctx.message.guild.channels.get(ctx.args.get('channel')?.value) === undefined) return ctx.replyT('error', 'commands:config.channel.channelNotWasFound')
        // Tag:  SAME_CHANNEL
        // Message: It looks like it's the same channel you selected. (<#{channel-id}> - {channel-id})
        if (ctx.args.get('channel').value === ctx.db.guild.punishChannel) return ctx.replyT('error', 'commands:config.channel.sameChannel')
        ctx.db.guild.punishModule = true
        ctx.db.guild.punishChannel = ctx.args.get('channel').value
        ctx.db.guild.save()

        // Tag:  CHANNEL_SELECTED_WITH_SUCCESS
        // Message: {module-name} is set to connect to the voice channel automatically on {channel-id}
        ctx.replyT('success', 'commands:config.modules.mod.enable')
        return
      }
      case status.TYPE_2: {
        // Tag:  CHANNEL_SELECTED_WITH_SUCCESS
        // Message: The module is already disabled!
        if (ctx.db.guild.punishModule === false) return ctx.replyT('error', 'commands:config.channel.moduleHasDisabled')

        ctx.db.guild.punishModule = false
        ctx.db.guild.punishChannel = ''
        ctx.db.guild.save()

        // Tag:  CHANNEL_SELECTED_WITH_SUCCESS
        // Message: The module has been successfully disabled!
        ctx.replyT('success', 'commands:config.modules.mod.disable')
        return
      }
    }
    // Tag: CONFIG_BUG_DETECTED
    // Message: That's weird! Apparently some bug occurred... What happened?!?
    ctx.replyT('error', 'commands:config.channel.moduleIfFoundBug', { 0: this.name })
    new Error({})
  }
}
