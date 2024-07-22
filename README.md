## Daily Runs Site

In PokeRogue, performing the same action in the same order will result in the same outcome. By sharing the routes our pathers took to complete the daily run, we can help others complete the run with ease. Previously, this has been done through Google Sheets. However, due to the increasing volume of traffic to the sheet and the intensity of work required daily to input the data, we are building a website to automate this workflow. The pathers use our [path recording tool](https://github.com/PokeRogue-Projects/Pathing-Tool) to record their steps and output them in json format, following the guidelines outlined [here](https://github.com/PokeRogue-Projects/DRPD-Specs/blob/main/DRPDS.md). This site generates a guide from the json provided.

## Contributing

See the [contributing guide](CONTRIBUTING.md) if you're interested in making changes.

## Development

Install yarn

`npm install yarn -g`

Install dependencies

`yarn`

Run project

`yarn start`