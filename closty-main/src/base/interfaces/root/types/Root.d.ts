import 'discord.js';

export declare global {

  export {
    ClientEvents,
    Interaction,
    ChatInputCommandInteraction as CommandInteraction,
    ContextMenuCommandInteraction as AppInteraction,
    SelectMenuInteraction,
    ButtonInteraction,
    ModalSubmitInteraction,
  } from 'discord.js';
};