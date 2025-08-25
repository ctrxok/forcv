import "dotenv/config";

import { Telegraf } from "telegraf";
import express, { Request, Response } from "express";
import { GreetingCom, EditMenuCom } from "#controller/commands.js";
import { ReadyCB, EditMenuCB } from "#controller/callbacks.js";
import connectToDB from "#conectingToDb";
import { attachTokens } from "#services/token.service.js";
// import { addUserToDB } from "./services/user.service.js";
await connectToDB();

const app = express();
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

app.use(await bot.createWebhook({ domain: process.env.WEBHOOK_DOMAIN }));

let editMenuCom = new EditMenuCom;
const handlersArray = [
    new ReadyCB,
    new GreetingCom,
    editMenuCom,
    new EditMenuCB,
];

handlersArray.forEach(el => {
    switch (el.type) {
        case "callback":
            bot.action(el.name, el.execute);
            break;
        case "command":
            bot.command(el.name, el.execute);
            break;
    }
});
//! it`s unimportant test, can be removed
bot.on("message", (ctx) => {
    ctx.reply("tytyt");
    console.log(ctx)
});

app.get("/callback", async (req: Request, res: Response) => {
    res.send("OK");
    await attachTokens(Number(req.query.state), req.query.code as string)
    bot.telegram.sendMessage(Number(req.query.state), "Choose option", {
        reply_markup: {
            inline_keyboard: editMenuCom.button
        }
    });
});

app.listen(process.env.PORT, () =>
    console.log("Listening on port: " + process.env.PORT)
);


//wew ew