// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.

import allowApiKey from "./hooks/allow-api-key";

export default {
  before: {
    all: [allowApiKey()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
