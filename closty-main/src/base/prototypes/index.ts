/* eslint-disable @typescript-eslint/typedef */

import {
  AppInteraction,
  CommandInteraction,
  SelectMenuInteraction,
  ButtonInteraction,
  ModalSubmitInteraction,
  User,
  Guild,
  GuildEmoji,
} from 'Root';

(async function (): Promise<void> {

  Date.prototype.toUnix = function (type?: 't' | 'T' | 'd' | 'D' | 'f' | 'F' | 'R'): string {

    return `<t:${Math.floor(new Date(this).getTime() / 1000)}:${type || 'F'}>`;
  };

  Number.prototype.toUnix = function (type?: 't' | 'T' | 'd' | 'D' | 'f' | 'F' | 'R'): string {

    return `<t:${Math.floor(new Date(this as number).getTime() / 1000)}:${type || 'F'}>`;
  };

  let interactions = [
    AppInteraction,
    CommandInteraction,
    SelectMenuInteraction,
    ButtonInteraction,
    ModalSubmitInteraction,
  ];

  await Promise.all(interactions.map((interaction) => {

    interaction.prototype.successReply = async function ({ ephemeral, content, timeout }: { ephemeral?: boolean; content: string | string[]; timeout?: number; }): Promise<void> {

      let options: { ephemeral: boolean; content: string; } = {
        ephemeral: timeout ? false : ephemeral,
        content: `${Emoji.Success} ${content instanceof Array ? content.join(`\n`) : content}`,
      };

      if (this.replied) await this.editReply(options).then(() => timeout ? setTimeout(async () => await this.deleteReply().catch(() => undefined), timeout) : undefined);
      else if (this.deferred) await this.followUp(options).then(() => timeout ? setTimeout(async () => await this.deleteReply().catch(() => undefined), timeout) : undefined);
      else await this.reply(options).then(() => timeout ? setTimeout(async () => await this.deleteReply().catch(() => undefined), timeout) : undefined);
    };

    interaction.prototype.errorReply = async function ({ content }: { content: string | string[]; }): Promise<void> {

      let options: { ephemeral: boolean; content: string; } = {
        ephemeral: true,
        content: `${Emoji.Error} ${content instanceof Array ? content.join(`\n`) : content}`,
      };

      if (this.replied) await this.editReply(options);
      else if (this.deferred) await this.followUp(options);
      else await this.reply(options);
    };
  }));

  User.prototype.badges = function (): string {

    let badges: string[] = [];

    if (this.flags?.toArray().length > 0) {

      if (this.flags.has(`Staff`)) badges.push(ctx.case.badge('Staff', { icon: true }));
      if (this.flags.has(`Partner`)) badges.push(ctx.case.badge('Partner', { icon: true }));
      if (this.flags.has(`CertifiedModerator`)) badges.push(ctx.case.badge('CertifiedModerator', { icon: true }));
      if (this.flags.has(`Hypesquad`)) badges.push(ctx.case.badge('Hypesquad', { icon: true }));

      if (this.flags.has(`HypeSquadOnlineHouse1`)) badges.push(ctx.case.badge('HypeSquadOnlineHouse1', { icon: true }));
      if (this.flags.has(`HypeSquadOnlineHouse2`)) badges.push(ctx.case.badge('HypeSquadOnlineHouse2', { icon: true }));
      if (this.flags.has(`HypeSquadOnlineHouse3`)) badges.push(ctx.case.badge('HypeSquadOnlineHouse3', { icon: true }));

      if (this.flags.has(`BugHunterLevel1`)) badges.push(ctx.case.badge('BugHunterLevel1', { icon: true }));
      if (this.flags.has(`BugHunterLevel2`)) badges.push(ctx.case.badge('BugHunterLevel2', { icon: true }));

      if (this.flags.has(`VerifiedDeveloper`)) badges.push(ctx.case.badge('VerifiedDeveloper', { icon: true }));
      if (this.flags.has(`PremiumEarlySupporter`)) badges.push(ctx.case.badge('PremiumEarlySupporter', { icon: true }));
    };

    return badges.length > 0 ? badges.join(``) : `None`;
  };

  User.prototype.link = function (block?: boolean, options: { full?: boolean; } = { full: true }): string {

    return `[${block ? `\`${ctx.case.filter(options.full ? this.tag : this.username)}\`` : ctx.case.filter(this.tag)}](<https://lookup.guru/${this.id}> '${ctx.case.filter(this.tag)} (${this.id})')`;
  };

  Guild.prototype.link = function (bold?: boolean): string {

    let guildName: string = bold ? `**${ctx.case.filter(this.name.length > 20 ? `${this.name.slice(0, 20)}...` : this.name)}**` : ctx.case.filter(this.name);

    return this.vanityURLCode ? `[${guildName}](https://discord.gg/${this.vanityURLCode} 'discord.gg/${this.vanityURLCode}')` : guildName;
  };

  GuildEmoji.prototype.link = function (block?: boolean): string {

    return `[${block ? `\`${this.name}\`` : this.name}](${this.url} 'Click it and view the "${this.name}" emoji in the browser.')`;
  };
})();