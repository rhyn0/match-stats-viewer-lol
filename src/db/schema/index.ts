import * as championSchema from "./champion";
import * as matchSchema from "./match";
import * as playerSchema from "./player";
import * as playerMatchSchema from "./player-match";
import * as teamSchema from "./team";
import * as userSchema from "./user";

const index = {
    ...championSchema,
    ...userSchema,
    ...matchSchema,
    ...playerSchema,
    ...playerMatchSchema,
    ...teamSchema,
};

export default index;
