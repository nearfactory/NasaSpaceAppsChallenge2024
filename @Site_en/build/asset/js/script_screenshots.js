let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
main();
//Chrome用のWebDriverを構築します
async function buildChromeDriver(version)
{
    let options = new chrome.Options();
    options.addArguments("--headless");//ヘッドレスモードに指定
    options.setBrowserVersion(version);
    return await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
}
//スクリーンショットを撮影して、ファイルに保存します。
async function saveScreenShotTo(driver, screen_width, save_file_path)
{
    await driver.manage().window().setRect({ width: screen_width, height: 1024 });
    const page_width = await driver.executeScript("return document.body.scrollWidth;");
    const page_height = await driver.executeScript("return document.body.scrollHeight;");
    await driver.manage().window().setRect({ width: page_width, height: page_height });
    //スクリーンショットを取得
    let ss = await driver.takeScreenshot();
    //一旦ファイルに書き出す。
    fs.writeFileSync(save_file_path, ss, 'base64');
}
//指定のURLに遷移します。
async function navigateToURL(driver, url, wait = undefined)
{
    await driver.get(url);
    if(wait)
    {
        await driver.wait(wait);//条件に合わせて待機する
    }
}
//指定されたURLのスクリーンショットを撮影する。
async function takeScreenShot(driver, url, screen_width, wait = undefined, save_file_path = "./screen_shot.png")
{
    await navigateToURL(driver, url, wait);
    await saveScreenShotTo(driver, screen_width, save_file_path);
}
//メイン関数
async function main()
{
    //WebDriverを作る
    let driver = await buildChromeDriver("stable");
    //スクリーンショットを撮影
    await takeScreenShot(driver, "https://spekiyoblog.com/", 1280, webdriver.until.elementLocated(webdriver.By.className('footer')), "./spekiyo.png");
    //ドライバーを閉じる
    await driver.quit();
}