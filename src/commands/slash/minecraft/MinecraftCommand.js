const Command = require('../../../structures/command/Command')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class MinecraftCommand extends Command {
  constructor() {
    super({
      name: 'minecraft-base',
      aliases: [],
      arguments: 1,
      hasUsage: false,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('minecraft')
        .setDescription('Minecraft Command')
        .addOptions(
          new CommandOptions()
            .setType(1)
            .setName('avatar')
            .setDescription('Shows a player\'s minecraft avatar.')
            .addOptions(
              new CommandOptions()
                .setName('minecraft-nickname')
                .setDescription('Shows a player\'s minecraft avatar.')
                .setType(3)
                .isRequired(),
            ),
          new CommandOptions()
            .setType(1)
            .setName('body')
            .setDescription('Shows a player\'s minecraft avatar.')
            .addOptions(
              new CommandOptions()
                .setName('minecraft-nickname')
                .setDescription('Shows a player\'s minecraft body.')
                .setType(3)
                .isRequired(),
            ),
          new CommandOptions()
            .setType(1)
            .setName('head')
            .setDescription('Shows a player\'s minecraft head.')
            .addOptions(
              new CommandOptions()
                .setName('minecraft-nickname')
                .setDescription('Shows a player\'s minecraft head.')
                .setType(3)
                .isRequired(),
            ),
          new CommandOptions()
            .setType(1)
            .setName('skin')
            .setDescription('Shows a player\'s minecraft skin.')
            .addOptions(
              new CommandOptions()
                .setName('minecraft-nickname')
                .setDescription('Shows a player\'s minecraft avatar.')
                .setType(3)
                .isRequired(),
            ),
          new CommandOptions()
            .setType(1)
            .setName('query')
            .setDescription('Show a Minecraft server info')
            .addOptions(
              new CommandOptions()
                .setName('minecraft-server-ip')
                .setDescription('Shows a information\'s minecraft server.')
                .setType(3)
                .isRequired(),
            )
        )
    })
  }

  // eslint-disable-next-line no-unused-vars
  on(ctx) {

  }
}
