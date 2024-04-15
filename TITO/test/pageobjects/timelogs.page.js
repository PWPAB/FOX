const { $ } = require('@wdio/globals')
const Page = require('./page');

class TimeLogsPage extends Page {

    get #btnSave(){
        return $('#editTimeSheetSave');
    }

//Methods Starting Here....

    async clickMonthLink(monthName) {
       const dynamicSelector = `//a[@href="#" and text()="${monthName}"]`;
       const monthLink = await $(dynamicSelector);
       const arrow = await $('.jqTransformSelectOpen');
       await arrow.click()
       return await monthLink.click();
    }

    async verifyBreadcrumbs(month){
        const dynamicSelector = `//div[@class="breadcrumbs" and contains(text(), "${month}")]`;
        const breadcrumbs = await $(dynamicSelector);
        expect(breadcrumbs).toBeDisplayed();
    }

    async clickDateLink(date){
        const dynamicSelector = `//a[@class="editLink" and @href="#" and text()="${date}"]`;
        const dateLink = await $(dynamicSelector);
        return await dateLink.click();
    } 

    async clickManualIn(date){
        const dynamicSelector = `//tr[td[@class="centermiddlealign"]/input[@type="hidden" and @value="${date}"]]/td[@class="middlealign"]/div[@class="inCheckBox manualCheckIn"]/input[@type="checkbox"]`;
        const chkbox = await $(dynamicSelector);
        return await chkbox.click();
    }

    async clickManualOut(date){
        const dynamicSelector = `//tr[td[@class="centermiddlealign"]/input[@type="hidden" and @value="${date}"]]/td[@class="middlealign"]/div[@class="outCheckBox manualCheckOut"]/input[@type="checkbox"]`;
        const chkbox = await $(dynamicSelector);
        return await chkbox.click();
    }

    async addInHour(date, inHour){
        const dynamicSelector = `//tr[td[@class="centermiddlealign"]/input[@value="${date}"]]/td[@class="middlealign"]//input[@name="manualHourIn"]`;
        const field = await $(dynamicSelector);
        await field.clearValue();
        await field.click();
        await field.addValue(inHour);
        console.log(`Hour set successfully for ${date}`);
             
    }

    async addOutHour(date, outHour){
        const dynamicSelector = `//tr[td[@class="centermiddlealign"]/input[@value="${date}"]]/td[@class="middlealign"]//input[@name="manualHourOut"]`;
        const field = await $(dynamicSelector);
        await field.clearValue();
        await field.click();
        await field.addValue(outHour);
        console.log(`Hour set successfully for ${date}`);
             
    }

    async addInMinute(date, inMinute){
        //Temporary clicking the AM/PM dropdown and Location dropdown for preparing later for other steps
        const dynamicSelectorTemp = `//tr[td[@class="centermiddlealign" and contains(text(), "${date}")]]//select[@class="timeLocation manualFieldInDayPart"]`;
        const drpTime = await $(dynamicSelectorTemp);
        await drpTime.waitForExist({ timeout: 60000 });
        await drpTime.click();
        
        const dynamicSelectorTemp1 = `//tr[td[@class="centermiddlealign" and contains(text(), "${date}")]]//select[@class="timeLocation manualFieldInLocation"]`;
        const drpLoc = await $(dynamicSelectorTemp1);
        await drpLoc.waitForExist({ timeout: 60000 });
        await drpLoc.click();
        
        const dynamicSelector = `//tr[td[@class="centermiddlealign"]/input[@value="${date}"]]/td[@class="middlealign"]//input[@name="manualMinIn"]`;
        const field = await $(dynamicSelector);
        await field.clearValue();
        await field.click();
        await field.addValue(inMinute);
        console.log(`Minute set successfully for ${date}`);
        
    }

    async addOutMinute(date, outMinute){
        //Temporary clicking the AM/PM dropdown and Location dropdown for preparing later for other steps
        const dynamicSelectorTemp = `//tr[td[@class="centermiddlealign" and contains(text(), "${date}")]]//select[@class="timeLocation manualFieldOutDayPart"]`;
        const drpTime = await $(dynamicSelectorTemp);
        await drpTime.waitForExist({ timeout: 60000 });
        await drpTime.click();
        
        const dynamicSelectorTemp1 = `//tr[td[@class="centermiddlealign" and contains(text(), "${date}")]]//select[@class="timeLocation manualFieldOutLocation"]`;
        const drpLoc = await $(dynamicSelectorTemp1);
        await drpLoc.waitForExist({ timeout: 60000 });
        await drpLoc.click();
        
        const dynamicSelector = `//tr[td[@class="centermiddlealign"]/input[@value="${date}"]]/td[@class="middlealign"]//input[@name="manualMinOut"]`;
        const field = await $(dynamicSelector);
        await field.clearValue();
        await field.click();
        await field.addValue(outMinute);
        console.log(`Minute set successfully for ${date}`);
        
    }

    async addInTime(date, inTime){
        const dynamicSelectorValid = `//tr[td[@class="centermiddlealign" and contains(text(), "${date}")]]//select[@class="timeLocation manualFieldInDayPart valid"]`;
        const drpTimeValid = await $(dynamicSelectorValid);
        await drpTimeValid.selectByVisibleText(inTime);
        console.log(`Time set successfully for ${date}`);
    }

    async addInLoc(date, inLocation){
        const dynamicSelectorValid = `//tr[td[@class="centermiddlealign" and contains(text(), "${date}")]]//select[@class="timeLocation manualFieldInLocation valid"]`;
        const drpTimeValid = await $(dynamicSelectorValid);
        await drpTimeValid.selectByVisibleText(inLocation);
        console.log(`Location set successfully for ${date}`);
    }

    async addOutTime(date, outTime){
        const dynamicSelectorValid = `//tr[td[@class="centermiddlealign" and contains(text(), "${date}")]]//select[@class="timeLocation manualFieldOutDayPart valid"]`;
        const drpTimeValid = await $(dynamicSelectorValid);
        await drpTimeValid.selectByVisibleText(outTime);
        console.log(`Time set successfully for ${date}`);
    }

    async addOutLoc(date, outLocation){
        const dynamicSelectorValid = `//tr[td[@class="centermiddlealign" and contains(text(), "${date}")]]//select[@class="timeLocation manualFieldOutLocation valid"]`;
        const drpTimeValid = await $(dynamicSelectorValid);
        await drpTimeValid.selectByVisibleText(outLocation);
        console.log(`Location set successfully for ${date}`);
    }

    async clickSaveButton(value) {
        const button = await this.#btnSave;
        return await button.click();
    }

}

module.exports = new TimeLogsPage();