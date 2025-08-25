import dotenv from "dotenv";
await dotenv.config();
import { google } from "googleapis";

export const client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
);


export function generateAuthUrl(userID: string): string {
    return client.generateAuthUrl({
        scope: [
            "https://www.googleapis.com/auth/spreadsheets",
        ],
        state: userID,
        prompt: "consent",
        access_type: "offline",

    });
}



