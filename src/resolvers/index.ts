import userResolver from "./user.resolver";
import chatResolver from "./chat.resolver";

export const resolvers = [userResolver, chatResolver] as const;