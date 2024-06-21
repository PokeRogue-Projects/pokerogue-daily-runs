import type { GatsbyConfig } from "gatsby";
import 'dotenv/config'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `PokeRogue Daily Runs`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-transformer-remark", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }, {
    resolve: "gatsby-source-google-spreadsheet",
    options: {
      spreadsheetId: "1xd5T6KoyQJ5wWUx0--7xAo3lv6KaR1Gx-yW4SOEJzrE",
      typePrefix: "GoogleSpreadsheet",
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: (process.env.PRIVATE_KEY || "").replace(/(\\r)|(\\n)/g, '\n')
      }
    }
  }]
};

export default config;
