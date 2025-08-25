import { IBaseHandler, THandlerType } from "#interfaces/Ihandler.js";
import { Context } from "telegraf";
import { checkOrRegisterUser } from "#services/user.service.js";
import { clearMessages } from "#utils/clearMessages.js";
import { cache } from "#cache";


export class ReadyCB implements IBaseHandler {
    type: THandlerType = "callback";
    name: string = "ready_cb";
    async execute(ctx: Context): Promise<void> {

        checkOrRegisterUser(ctx);

        clearMessages(ctx, { firstMessageID: ctx.callbackQuery!.message!.message_id });

        ctx.answerCbQuery("text");
    }
}

export class EditMenuCB implements IBaseHandler {
    type: THandlerType = "callback";
    name: string = "editMenu_cb";
    execute(ctx: Context): void {
        cache.has(ctx.callbackQuery!.message!.message_id) ? console.log("has") : cache.updateUser(ctx.callbackQuery!.message!.message_id, { state: "chating" });
        ctx.answerCbQuery("Edit menu enter")
    }
}
