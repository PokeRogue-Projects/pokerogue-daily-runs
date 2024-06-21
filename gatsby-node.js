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
    
    const doc = new GoogleSpreadsheet('1xd5T6KoyQJ5wWUx0--7xAo3lv6KaR1Gx-yW4SOEJzrE', serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["Follow Along"]
    await sheet.loadCells("A1")

    const a1 = sheet.getCellByA1('A1');
    a1.formula = `=IMPORTRANGE("https://docs.google.com/spreadsheets/d/${process.env.SHEET_ID}/edit?gid=1335878243#gid=1335878243", "'Follow Along'!B:B")`
    await a1.save()

    reporter.info('Updated dev Google Sheet successfully');
  } catch (error) {
    reporter.error('Failed to update Google Sheet:', error);
  }
};