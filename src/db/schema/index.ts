import * as matchSchema from "./match";
import * as matchBanSchema from "./match-bans";
import * as playerSchema from "./player";
import * as playerMatchSchema from "./player-match";
import * as teamSchema from "./team";
import * as userSchema from "./user";

const index = {
    ...userSchema,
    ...matchSchema,
    ...playerSchema,
    ...playerMatchSchema,
    ...teamSchema,
    ...matchBanSchema,
};

export default index;
