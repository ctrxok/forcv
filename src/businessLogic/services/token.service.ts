import { client } from "#services/auth.service.js";
import User from "#model";
import { cache } from "#cache";


export async function attachTokens(userID: number, code: string): Promise<boolean> {
    let tokens = await client.getToken(code);

    await User.findOneAndUpdate({ userID: userID }, {
        $set: {
            tokens: {
                refresh_token: tokens.tokens.refresh_token,
            }
        }
    });

    let expired_in = Date.now() + (tokens.tokens?.expiry_date ?? 3600) * 1000;

    cache.set(userID, { access_token: tokens.tokens.access_token as string, expired_in: expired_in });

    //todo check if operation success
    return true;
};

export async function checkOrUpdateAccessToken(userID: number, refresh_token: string): Promise<{ access_token: string }> {
    return new Promise((resolve, reject) => {
        let user = cache.get(userID);

    })
}
