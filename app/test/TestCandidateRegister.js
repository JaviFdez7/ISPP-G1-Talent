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
var DefaultTimeout = 5000;
// Change to any User Agent you want to use.
// Leave as "default" or empty to use the Synthetics default.
var UserAgent = "default";

/** HELPER VARIABLES AND FUNCTIONS **/

import { WebDriver, Builder, By } from 'selenium-webdriver';

const driver = await new Builder().forBrowser('chrome').build();

/** BEGINNING OF SCRIPT **/

console.log('Starting synthetics script: {TestNG (WebDriver)}');
console.log('Default timeout is set to ' + (DefaultTimeout/1000) + ' seconds');

// Setting User Agent is not then-able, so we do this first (if defined and not default)
if (UserAgent && UserAgent.trim().length !== 0 && UserAgent !== 'default') {
    driver.executeScript(`window.navigator.userAgent = '${UserAgent}';`);
    console.log('Setting User-Agent to ' + UserAgent);
}

// Get browser capabilities and do nothing with it, so that we start with a then-able command


export async function testCandidateRegister() {
    try {
        console.log(1, "\n----------Test Candidate Register-------------\n");
        // Paso 1
        console.log(1, "http://localhost:7134/");
        await driver.get("http://localhost:7134/");

        // Paso 2
        console.log(2, "clickElement xpath=//div[@id='root']/div/div[2]/div/div/div/div/a/div/h4");
        let el = await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div/div/div/a/div/h4"));
        await el.click();

        // Paso 3
        console.log(3, "clickElement name=first_name");
        el = await driver.findElement(By.name("first_name"));
        await el.click();

        // Paso 4
        console.log(4, "type test_candidate");
        el = await driver.findElement(By.name("first_name"));
        await el.clear();
        await el.sendKeys('test_candidate');

        // Paso 5
        console.log(5, "clickElement name=surname");
        el = await driver.findElement(By.name("surname"));
        await el.click();

        // Paso 6
        console.log(6, "type test_surname");
        el = await driver.findElement(By.name("surname"));
        await el.clear();
        await el.sendKeys('test_surname');

        // Paso 7
        console.log(7, "clickElement name=username");
        el = await driver.findElement(By.name("username"));
        await el.click();

        // Paso 8
        console.log(8, "type test_candidate");
        el = await driver.findElement(By.name("username"));
        await el.clear();
        await el.sendKeys('test_candidate');

        // Paso 9
        console.log(9, "clickElement name=password");
        el = await driver.findElement(By.name("password"));
        await el.click();

        // Paso 10
        console.log(10, "type test12345");
        el = await driver.findElement(By.name("password"));
        await el.clear();
        await el.sendKeys('test12345');

        // Paso 11
        console.log(11, "clickElement name=password2");
        el = await driver.findElement(By.name("password2"));
        await el.click();

        // Paso 12
        console.log(12, "type test12345");
        el = await driver.findElement(By.name("password2"));
        await el.clear();
        await el.sendKeys('test12345');

        // Paso 13
        console.log(13, "clickElement name=email");
        el = await driver.findElement(By.name("email"));
        await el.click();

        // Paso 14
        console.log(14, "type test_candidate@gmail.com");
        el = await driver.findElement(By.name("email"));
        await el.clear();
        await el.sendKeys('test_candidate@gmail.com');

        // Paso 16
        console.log(15, "clickElement name=githubUsername");
        el = await driver.findElement(By.name("githubUsername"));
        await el.click();

        // Paso 17
        console.log(16, "type dangalmar");
        el = await driver.findElement(By.name("githubUsername"));
        await el.clear();
        await el.sendKeys('dangalmar');

        // Paso 18
        console.log(17, "clickElement xpath=//input[@type='checkbox']");
        el = await driver.findElement(By.xpath("//input[@type='checkbox']"));
        await el.click();

        // Paso 19
        console.log(18, "clickElement xpath=//div[@id='root']/div/div[2]/div/form/div[3]/div[2]/div/button/div/h4");
        el = await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/form/div[3]/div[2]/div/button/div/h4"));
        await el.click();

        const expectedUrl = "http://localhost:7134/candidate/detail";
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


