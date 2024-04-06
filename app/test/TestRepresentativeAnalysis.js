/**
 * Script Name: {TestNG (WebDriver)}
 * 
 * Generated using  New Relic Synthetics Formatter for Katalon
 *
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 */

/** CONFIGURATIONS **/

// Theshold for duration of entire script - fails test if script lasts longer than X (in ms)
var ScriptTimeout = 180000;
// Script-wide timeout for all wait and waitAndFind functions (in ms)
var DefaultTimeout = 10000;
// Change to any User Agent you want to use.
// Leave as "default" or empty to use the Synthetics default.
var UserAgent = "default";

/** HELPER VARIABLES AND FUNCTIONS **/

import { WebDriver, Builder, By, until } from 'selenium-webdriver';

const driver = await new Builder().forBrowser('chrome').build();

/** BEGINNING OF SCRIPT **/

console.log('Starting synthetics script: {TestNG (WebDriver)}');
console.log('Default timeout is set to ' + (DefaultTimeout / 1000) + ' seconds');

// Setting User Agent is not then-able, so we do this first (if defined and not default)
if (UserAgent && UserAgent.trim().length !== 0 && UserAgent !== 'default') {
    driver.executeScript(`window.navigator.userAgent = '${UserAgent}';`);
    console.log('Setting User-Agent to ' + UserAgent);
}

export async function testRepresentativeAnalysis() {
    try {
        console.log(1, "\n----------Test Representantive Analysis-------------\n");
        // Step 1
        console.log(1, "http://localhost:7134/");
        await driver.get("http://localhost:7134/");

        // Step 2
        console.log(2, "clickElement xpath=//div[@id='root']/div/div[2]/div/div/div/div[2]/a/div/h4");
        let el = await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div/div/div[2]/a/div/h4"), DefaultTimeout);
        await el.click();

        // Step 3
        console.log(3, "clickElement name=username");
        el = await driver.findElement(By.name("username"), DefaultTimeout);
        await el.click();

        // Step 4
        console.log(4, "type test_representative");
        el = await driver.findElement(By.name("username"), DefaultTimeout);
        await el.clear();
        await el.sendKeys('test_representative');

        // Step 5
        console.log(5, "clickElement name=password");
        el = await driver.findElement(By.name("password"), DefaultTimeout);
        await el.click();

        // Step 6
        console.log(6, "type test12345");
        el = await driver.findElement(By.name("password"), DefaultTimeout);
        await el.clear();
        await el.sendKeys('test12345');

        // Step 7
        console.log(7, "clickElement xpath=//div[@id='root']/div/div[2]/div/div[3]/div/button/div/h4");
        el = await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[3]/div/button/div/h4"), DefaultTimeout);
        await el.click();

        let expectedUrl = "http://localhost:7134/representative/detail";
        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl.includes(expectedUrl);
        }, DefaultTimeout, `La URL actual no coincide con la esperada. Se esperaba ${expectedUrl}`);

        // Step 8
        console.log(8, "clickElement id=arrow-img");
        el = await driver.findElement(By.id("arrow-img"), DefaultTimeout);
        await el.click();

        // Step 9
        console.log(9, "Going to My Analysis...");
        await driver.get("http://localhost:7134/analysis/analyze");

        // Step 10
        console.log(10, "clickElement id=input-Github User");
        el = await driver.findElement(By.id("input-Github User"), DefaultTimeout);
        await el.click();

        // Step 11
        console.log(11, "type carlos-bermejo");
        await el.clear();
        await el.sendKeys('carlos-bermejo');

        // Step 12
        console.log(12, "clickElement xpath=//div[@id='root']/div/div[2]/div/div/form/div[3]/div/button/div/h4");
        el = await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div/form/div[3]/div/button/div/h4"), DefaultTimeout);
        await el.click();

        expectedUrl = "http://localhost:7134/analysis/carlos-bermejo";
        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl.includes(expectedUrl);
        }, DefaultTimeout, `La URL actual no coincide con la esperada. Se esperaba ${expectedUrl}`);

        // Éxito
        console.log('Browser script execution SUCCEEDED.');
    } catch (error) {
        // Error
        console.log('Browser script execution FAILED.');
        console.error(error);
    } finally {
        // Finalización de la prueba
        await driver.quit();
    }
};



