import userResolver from "./user.resolver";
import chatResolver from "./chat.resolver";
import intentResolver from "./intent.resolver";

export const resolvers = [userResolver, chatResolver, intentResolver] as const;