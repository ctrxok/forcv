import User from "#model";
import { Context } from "node_modules/telegraf/typings";
import { EditMenuCom } from "#controller/commands.js";
import { generateAuthUrl } from "#services/auth.service.js";

//! remove "kostil"
export async function checkOrRegisterUser(ctx: Context) {
    let editMenu = new EditMenuCom;
    let userRecord = await User.findOne({ userID: ctx.from!.id });
    let kostil = 0;

    if (!!userRecord) {
        kostil = 1;
        if (!userRecord.tokens?.refresh_token) {
            kostil = 0;
            ctx.reply("Missing required permission", {
                reply_markup: {
                    inline_keyboard: [[{ text: "Follow this link", url: generateAuthUrl(String(ctx.from!.id)) }]]
                }
            })
        }
    } else {
        await User.create({ userID: ctx.from!.id });
        ctx.reply("Missing required permission", {
            reply_markup: {
                inline_keyboard: [[{ text: "Follow this link", url: generateAuthUrl(String(ctx.from!.id)) }]]
            }
        })
    }
    kostil === 1 ? editMenu.execute(ctx) : kostil = 0;
}