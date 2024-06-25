import type { GatsbyConfig } from "gatsby";
import 'dotenv/config'

let wave = 0

const config: GatsbyConfig = {
  pathPrefix: "pokerogue-daily-runs",
  siteMetadata: {
    title: `PokeRogue Daily Runs`,
    siteUrl: `https://pokerogue-projects.github.io/pokerogue-daily-runs`
  },
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-remove-serviceworker", 
  "gatsby-plugin-postcss", {
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
      spreadsheetId: process.env.DEV_SHEET_ID,
      typePrefix: "GoogleSpreadsheet",
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: (process.env.PRIVATE_KEY || "").replace(/(\\r)|(\\n)/g, '\n')
      },
      // If column names change this needs to be changed
      filterNode: (node: any) => {
        return node.wave || node.name || node.trainerId;
      },
      mapNode: (node: any) => {
        if(node.hide) {
          node.caught = node.hide.toLowerCase() === "true";
        }
        if(node.wave) {
          if(node.wave.startsWith("Wave")) {
            wave++;
          }
          node.waveNumber = wave;
        }
        return node;
      }
    }
  }, {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: "PokeRogue Daily Runs",
      short_name: "PokeRogue Daily Runs",
      start_url: "/",
      background_color: "#6b37bf",
      theme_color: "#6b37bf",
      display: "standalone",
      icon: "src/images/icon.png",
      crossOrigin: `use-credentials`,
    }
  }]
};

export default config;
