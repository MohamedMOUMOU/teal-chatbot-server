import userResolver from "./user.resolver";
import chatResolver from "./chat.resolver";
import intentResolver from "./intent.resolver";
import fullfillmentResolver from "./fullfillment.resolver";

export const resolvers = [userResolver, chatResolver, intentResolver, fullfillmentResolver] as const;