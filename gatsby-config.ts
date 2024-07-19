import type { GatsbyConfig } from "gatsby";
import "dotenv/config";

const config: GatsbyConfig = {
  pathPrefix: "/pokerogue-daily-runs",
  siteMetadata: {
    title: `PokeRogue Daily Runs`,
    siteUrl: `https://pokerogue-projects.github.io/pokerogue-daily-runs`,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-remove-serviceworker",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-transformer-json`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/drpd/`,
      },
    },
    {
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
      },
    },
  ],
};

export default config;
