const { expect } = require('@wdio/globals')
const fs = require('fs');
const csv = require('csv-parser');
const LoginPage = require('../pageobjects/login.page');
const TimeLogs = require('../pageobjects/timelogs.page');

describe('My Login application', () => {
    let testData = [];
    const month = "February 2024";

    before(async () => {
        // Read data from the CSV file
        const csvData = [];
        fs.createReadStream('testdata.csv')
            .pipe(csv())
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', () => {
                // Store CSV data in testData array
                testData = csvData;
            });
    });

    it('Should login with valid credentials', async () => {
        //Open the browser with the specific URL
        await browser.url('https://timetracker21.srv.pointwest.com.ph/')

        //Initialize variables
        const username = "paul.bautista";
        const password = "$$unnyd4Y12345";

        //Call the method from LoginPage
        await LoginPage.login(username, password);  
    });

    it('Should click the selected month of the timesheet', async () => {
        //Assertion to wait for the logout button after logging in from the previous test case
        const element = await $('#logout');
        await element.waitForExist({ timeout: 60000 });
       
        //Call the method from Timelogs
        await TimeLogs.clickMonthLink(month);
        await browser.pause(3000);

    });

    it('Should select different dates and enter time in and time out details', async () => {
        // Iterate over each row of test data
        for (const data of testData) {
            const date = data.date;
            const inHour = parseInt(data.inHour);
            const inMinute = parseInt(data.inMinute);
            const inTime = data.inTime;
            const inLocation = data.inLocation;
            const outHour = parseInt(data.outHour);
            const outMinute = parseInt(data.outMinute);
            const outTime = data.outTime;
            const outLocation = data.outLocation;

            //Assertion to wait for the breadcrubs to update to the current month before selecting the date
            const element1 = await $(`//div[@class="breadcrumbs" and contains(text(), "${month}")]`);
            await element1.waitForExist({ timeout: 15000 });


            //Call the method from Timelogs
            await TimeLogs.clickDateLink(date);
            await browser.pause(3000);

            //Assertion to wait for the edit modal
            const element = await $('div[aria-labelledby="ui-dialog-title-popupEditTimeLogs"]');
            await element.waitForExist({ timeout: 15000 });


            //Time in details
            await TimeLogs.clickManualIn(date);
            await TimeLogs.addInHour(date, inHour);
            await TimeLogs.addInMinute(date, inMinute);
            await TimeLogs.addInTime(date, inTime);
            await TimeLogs.addInLoc(date, inLocation);
            await browser.pause(3000);


            //Time out details
            await TimeLogs.clickManualOut(date);
            await TimeLogs.addOutHour(date, outHour);
            await TimeLogs.addOutMinute(date, outMinute);
            await TimeLogs.addOutTime(date, outTime);
            await TimeLogs.addOutLoc(date, outLocation);
            await browser.pause(3000);
        
            await TimeLogs.clickSaveButton();


            const savingProgressIcon = await $('#dialog-modal');
            await savingProgressIcon.waitForExist(15000);
            browser.waitUntil(
                () => !browser.isExisting(savingProgressIcon), // Condition to wait until the element disappears
                {
                    timeout: 10000, // Maximum time to wait in milliseconds
                    timeoutMsg: 'Element still exists after 5 seconds' // Error message if timeout is reached
                }
            );

        }
    });
});