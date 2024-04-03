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

// Get browser capabilities and do nothing with it, so that we start with a then-able command
import { WebDriver, Builder, By } from 'selenium-webdriver';

(async function () {
    try {
        // Paso 1
        console.log(1, "http://localhost:7134/");
        await driver.get("http://localhost:7134/");

        // Paso 2
        console.log(2, "clickElement id=arrow-img");
        let el = await driver.findElement(By.id("arrow-img"));
        await el.click();

        // Paso 3
        console.log(3, "clickElement xpath=//div[@id='sidenav']/div/a[2]/span[2]");
        el = await driver.findElement(By.xpath("//div[@id='sidenav']/div/a[2]/span[2]"));
        await el.click();

        // Paso 4
        console.log(4, "clickElement id=arrow-img");
        el = await driver.findElement(By.id("arrow-img"));
        await el.click();

        // Paso 5
        console.log(5, "clickElement id=input-Github User");
        el = await driver.findElement(By.id("input-Github User"));
        await el.click();

        // Paso 6
        console.log(6, "type carlos-bermejo");
        el = await driver.findElement(By.id("input-Github User"));
        await el.clear();
        await el.sendKeys('carlos-bermejo');

        // Paso 7
        console.log(7, "clickElement xpath=//div[@id='root']/div/div[2]/div/div/form/div[3]/div/button/div");
        el = await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div/form/div[3]/div/button/div"));
        await el.click();

        const currentUrl = await driver.getCurrentUrl();
        const expected_url = "http://localhost:7134/analysis/carlos-bermejo"
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



