import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'eeb0b66049720b2785878c36b93f22af4e43769b', queries,  });
export default client;
  