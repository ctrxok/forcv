import type { IBaseHandler, THandlerType } from "#interfaces/Ihandler.js";
import { Context } from "telegraf";
// import { checkIfExits } from "#service/user.service.js"

export class GreetingCom implements IBaseHandler {
    type: THandlerType = "command";
    name: string = "start";
    execute(ctx: Context): void {
        ctx.reply(
            ` <b>Hello! 👋</b>
I'm your personal assistant for entering data into a table. \n
<b>🔹 You can enter data in two ways:</b>\n
    <b>Quick mode</b> — enter all values in one line separated by a symbol.\n
    <b>Step-by-step mode</b> — I’ll ask for each field one by one.\n
When you're ready — tap the button below 👇\n
            `,
            {
                parse_mode: "HTML",
                reply_markup: { inline_keyboard: [[{ text: "Ready", callback_data: "ready_cb" }]] }
            })

    };
}

export class EditMenuCom implements IBaseHandler {
    type: THandlerType = "command";
    name: string = "editMenu";
    execute(ctx: Context) {
        ctx.reply("Choose option", {
            reply_markup: {
                inline_keyboard: this.button
            }
        })
    };
    button = [
        [{ text: "Edit Table", callback_data: "editMenu_cb" }],
    ]
}
