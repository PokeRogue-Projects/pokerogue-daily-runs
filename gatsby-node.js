require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

function copyCellValue(sourceSheet, targetSheet, sourceAddress, targetAddress) {
    const sourceCell = sourceSheet.getCellByA1(sourceAddress);
    const targetCell = targetSheet.getCellByA1(targetAddress);
    targetCell.value = sourceCell.value;
}

function copyStageValues(sourceSheet, targetSheet, sourceRow, targetRow) {
    const columns = ['A', 'F', 'I', 'O'];
    columns.forEach(column => {
        copyCellValue(sourceSheet, targetSheet, `${column}${sourceRow}`, `${column}${targetRow}`);
    });
}

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
    trainersI1.value = "trainerId"

    const trainersO1 = trainers.getCellByA1('O1');
    trainersO1.value = "trainerType"

    await detailed.loadCells("A22:208")

    // Copy values from detailed for each trainer stage
    copyStageValues(detailed, trainers, 22, 2);  // Stage 5
    copyStageValues(detailed, trainers, 70, 3);  // Stage 15
    copyStageValues(detailed, trainers, 93, 4);  // Stage 20
    copyStageValues(detailed, trainers, 116, 5);  // Stage 25
    copyStageValues(detailed, trainers, 139, 6);  // Stage 30
    copyStageValues(detailed, trainers, 162, 7);  // Stage 35
    copyStageValues(detailed, trainers, 185, 8);  // Stage 40
    copyStageValues(detailed, trainers, 208, 9);  // Stage 45

    await trainers.saveUpdatedCells();

    const sprites = doc.sheetsByTitle["Sprites"]
    await sprites.loadCells("A1:B2")

    const spritesA1 = sprites.getCellByA1('A1');
    spritesA1.value = "name"

    const spritesB1 = sprites.getCellByA1('B1');
    spritesB1.value = "pokemonId"

    const spritesA2 = sprites.getCellByA1('A2');
    spritesA2.formula = `=IMPORTRANGE("https://docs.google.com/spreadsheets/d/${process.env.SPRITE_SHEET_ID}", "'Pokémon Data'!A1:B")`

    await sprites.saveUpdatedCells();

    reporter.info('Updated dev Google Sheet successfully');
  } catch (error) {
    reporter.error('Failed to update Google Sheet:', error);
  }
};