import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 900, height: 800 } })
const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push(String(err)))

await page.goto('http://localhost:5183/', { waitUntil: 'networkidle' })
await page.waitForSelector('text=Angela Campbell', { timeout: 10000 })
await page.screenshot({ path: '__dashboard.png' })

console.log('CONSOLE_ERRORS:', JSON.stringify(errors))
await browser.close()
