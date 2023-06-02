import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",

  documents: ["**/*.tsx"],

  generates: {
    "./types/__generated_graphql__/": {
      preset: "client",

      plugins: [],

      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },

  ignoreNoDocuments: true,
};

export default config;
