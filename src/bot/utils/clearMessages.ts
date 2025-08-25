import { Context } from "telegraf/typings";

export function clearMessages(ctx: Context, { firstMessageID, messagesBelow = 1 }: { firstMessageID: number, messagesBelow?: number }): void {
    let messageArr: number[] = [];

    for (let i = 1; i <= messagesBelow * 2; ++i) {
        messageArr.push(firstMessageID);
        --firstMessageID;
    }
    ctx.deleteMessages(messageArr)
}