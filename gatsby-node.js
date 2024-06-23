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
    await followAlongA1.save()

    const followAlongA2 = followAlong.getCellByA1('A2');
    followAlongA2.formula = `=IMPORTRANGE("https://docs.google.com/spreadsheets/d/${process.env.DAILY_SHEET_ID}", "'Follow Along'!B:B")`
    await followAlongA2.save()


    const detailed = doc.sheetsByTitle["Detailed"]
    await detailed.loadCells("A1")
    const detailedA1 = detailed.getCellByA1('A1');
    detailedA1.formula = `=IMPORTRANGE("https://docs.google.com/spreadsheets/d/${process.env.DAILY_SHEET_ID}", "'Detailed Daily Guide'!A2:JE237")`
    await detailedA1.save()

    const sprites = doc.sheetsByTitle["Sprites"]
    await sprites.loadCells("A1:C2")

    const spritesA1 = sprites.getCellByA1('A1');
    spritesA1.value = "name"
    await spritesA1.save()

    const spritesB1 = sprites.getCellByA1('B1');
    spritesB1.value = "pokemon-id"
    await spritesB1.save()

    const spritesC1 = sprites.getCellByA1('C1');
    spritesC1.value = "sprite"
    await spritesC1.save()

    const spritesA2 = sprites.getCellByA1('A2');
    spritesA2.formula = `=IMPORTRANGE("https://docs.google.com/spreadsheets/d/${process.env.SPRITE_SHEET_ID}", "'Pokémon Data'!A1:C")`
    await spritesA2.save()

    reporter.info('Updated dev Google Sheet successfully');
  } catch (error) {
    reporter.error('Failed to update Google Sheet:', error);
  }
};