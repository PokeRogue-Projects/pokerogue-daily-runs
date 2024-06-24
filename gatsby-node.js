require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

exports.onPreBootstrap = async ({ reporter }) => {
  try {
    const serviceAccountAuth = new JWT({
        // must be invited to sheet even if it is public
        email: process.env.CLIENT_EMAIL,
        key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    // We need to copy data to a new sheet as daily sheet causes issues as it is
    const doc = new GoogleSpreadsheet(process.env.DEV_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const followAlong = doc.sheetsByTitle["Follow Along"]
    await followAlong.loadCells("A1:A2")

    // need to set A1 to Wave as this is being assumed as the column name
    const followAlongA1 = followAlong.getCellByA1('A1');
    followAlongA1.value = "Wave"

    const followAlongA2 = followAlong.getCellByA1('A2');
    followAlongA2.formula = `=IMPORTRANGE("https://docs.google.com/spreadsheets/d/${process.env.DAILY_SHEET_ID}", "'Follow Along'!B:B")`

    await followAlong.saveUpdatedCells();

    const detailed = doc.sheetsByTitle["Detailed"]
    await detailed.loadCells("A1")
    const detailedA1 = detailed.getCellByA1('A1');
    detailedA1.formula = `=IMPORTRANGE("https://docs.google.com/spreadsheets/d/${process.env.DAILY_SHEET_ID}", "'Detailed Daily Guide'!A2:JE237")`

    await detailed.saveUpdatedCells();

    const trainers = doc.sheetsByTitle["Trainers"]
    await trainers.loadCells("A1:O9")

    const trainersA1 = trainers.getCellByA1('A1');
    trainersA1.value = "Stage"

    const trainersF1 = trainers.getCellByA1('F1');
    trainersF1.value = "Steps"

    const trainersI1 = trainers.getCellByA1('I1');
    trainersI1.value = "trainer-id"

    const trainersO1 = trainers.getCellByA1('O1');
    trainersO1.value = "trainer-type"

    const rowDetails = [
      { cell: 'A2', range: 'A23:JE23' },
      { cell: 'A3', range: 'A71:JE71' },
      { cell: 'A4', range: 'A94:JE94' },
      { cell: 'A5', range: 'A117:JE117' },
      { cell: 'A6', range: 'A140:JE140' },
      { cell: 'A7', range: 'A163:JE163' },
      { cell: 'A8', range: 'A186:JE186' },
      { cell: 'A9', range: 'A209:JE209' },
    ];

    for (const { cell, range } of rowDetails) {
      const trainerCell = trainers.getCellByA1(cell);
      trainerCell.formula = `=IMPORTRANGE("https://docs.google.com/spreadsheets/d/${process.env.DAILY_SHEET_ID}", "'Detailed Daily Guide'!${range}")`;
    }

    await trainers.saveUpdatedCells();

    const sprites = doc.sheetsByTitle["Sprites"]
    await sprites.loadCells("A1:C2")

    const spritesA1 = sprites.getCellByA1('A1');
    spritesA1.value = "name"

    const spritesB1 = sprites.getCellByA1('B1');
    spritesB1.value = "pokemon-id"

    const spritesC1 = sprites.getCellByA1('C1');
    spritesC1.value = "sprite"

    const spritesA2 = sprites.getCellByA1('A2');
    spritesA2.formula = `=IMPORTRANGE("https://docs.google.com/spreadsheets/d/${process.env.SPRITE_SHEET_ID}", "'Pokémon Data'!A1:C")`

    await sprites.saveUpdatedCells();

    reporter.info('Updated dev Google Sheet successfully');
  } catch (error) {
    reporter.error('Failed to update Google Sheet:', error);
  }
};