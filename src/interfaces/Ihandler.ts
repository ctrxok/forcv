import { Context } from "telegraf";

export type THandlerType = "command" | "callback" | "text" | undefined;


export interface IBaseHandler {
    type: THandlerType;
    name: string;
    execute(ctx: Context): void;
}