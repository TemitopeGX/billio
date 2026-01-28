const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')

// Config
const port = process.env.PORT || 3000
const hostname = process.env.HOSTNAME || 'localhost'
const dir = path.join(__dirname)

// Copy of the standalone server logic, adapted for cPanel
// On cPanel, we usually run the standalone server directly, but we need an entry point.
// When "output: standalone" is used, the build creates a .next/standalone folder.
// We should require the server from there.

// HOWEVER, the standard way to deploy "standalone" is to copy the static files/public
// to the standalone directory and run `node .next/standalone/server.js`.

// But for cPanel "Setup Node.js App", it wants an entry file in the root.
// So we will require the standalone server logic.

// Point to the built standalone server
// Note: You must run 'npm run build' which creates .next/standalone
try {
    // We need to set the working directory to the standalone folder logic if we were running it directly
    // But here we are just requiring it. Next.js standalone server is self-contained.

    // Actually, a simpler approach for cPanel with 'standalone' is usually:
    // 1. Build locally.
    // 2. Upload the contents of `.next/standalone` to the server root.
    // 3. Upload `.next/static` to `.next/static` inside that root.
    // 4. Upload `public` to `public`.
    // 5. Use `server.js` from the standalone folder as the entry point.

    // BUT, to keep the repo structure clean and deploying from this repo root:

    const serverPath = path.join(__dirname, '.next', 'standalone', 'server.js');

    // If the standalone server exists (i.e. after build), require it.
    if (require('fs').existsSync(serverPath)) {
        require(serverPath);
    } else {
        console.log('Standalone server not found. Running custom dev/start server...');

        // Fallback for dev or non-standalone envs
        const dev = process.env.NODE_ENV !== 'production'
        const app = next({ dev, dir, hostname, port })
        const handle = app.getRequestHandler()

        app.prepare().then(() => {
            createServer(async (req, res) => {
                try {
                    const parsedUrl = parse(req.url, true)
                    await handle(req, res, parsedUrl)
                } catch (err) {
                    console.error('Error occurred handling', req.url, err)
                    res.statusCode = 500
                    res.end('internal server error')
                }
            }).listen(port, async () => {
                console.log(`> Ready on http://${hostname}:${port}`)
            })
        })
    }

} catch (e) {
    console.error(e);
}
