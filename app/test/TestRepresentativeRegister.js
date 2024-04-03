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
var DefaultTimeout = 30000;
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

(async function () {
    try {

        // Paso 1
        console.log(1, "http://localhost:7134/");
        await driver.get("http://localhost:7134/");

        // Paso 2
        console.log(2, "clickElement xpath=//div[@id=\'root\']/div/div[2]/div/div/div/div/a/div");
        let el = await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div/div/div/a/div"));
        await el.click();

        // Paso 3
        console.log(3, "clickElement xpath=//div[@id=\'root\']/div/div[2]/div/div/a/h2");
        el = await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div/a/h2"));
        await el.click();

        // Paso 4
        console.log(4, "clickElement name=username");
        el = await driver.findElement(By.name("username"));
        await el.click();

        // Paso 5
        console.log(5, "type test_representative");
        el = await driver.findElement(By.name("username"));
        await el.clear();
        await el.sendKeys('test_representative');

        // Paso 6
        console.log(6, "clickElement name=corporative_email");
        el = await driver.findElement(By.name("corporative_email"));
        await el.click();

        // Paso 7
        console.log(7, "type test_representative@gmail.com");
        el = await driver.findElement(By.name("corporative_email"));
        await el.clear();
        await el.sendKeys('test_representative@gmail.com');

        // Paso 8
        console.log(8, "clickElement name=company_name");
        el = await driver.findElement(By.name("company_name"));
        await el.click();

        // Paso 9
        console.log(9, "type test_enterprise");
        el = await driver.findElement(By.name("company_name"));
        await el.clear();
        await el.sendKeys('test_enterprise');

        // Paso 10
        console.log(10, "clickElement name=password");
        el = await driver.findElement(By.name("password"));
        await el.click();

        // Paso 11
        console.log(11, "type test12345");
        el = await driver.findElement(By.name("password"));
        await el.clear();
        await el.sendKeys('test12345');

        // Paso 12
        console.log(12, "clickElement name=password2");
        el = await driver.findElement(By.name("password2"));
        await el.click();

        // Paso 13
        console.log(13, "type test12345");
        el = await driver.findElement(By.name("password2"));
        await el.clear();
        await el.sendKeys('test12345');

        // Paso 14
        console.log(14, "clickElement xpath=//input[@type=\'checkbox\']");
        el = await driver.findElement(By.xpath("//input[@type='checkbox']"));
        await el.click();

        // Paso 15
        console.log(15, "clickElement xpath=//div[@id=\'root\']/div/div[2]/div/form/div[3]/div[2]/div/button/div/h4");
        el = await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/form/div[3]/div[2]/div/button/div/h4"));
        await el.click();

        const currentUrl = await driver.getCurrentUrl();
        const expected_url = "http://localhost:7134/representative/detail"
        if (!currentUrl.includes(expected_url)) {
            throw new Error(`La URL actual (${currentUrl}) no coincide con la esperada. Se esperaba (${expected_url}).`);
        }

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
})();


