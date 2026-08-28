import { spawn } from 'child_process';
import http from 'http';

function checkViteReady() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5173', (res) => {
      resolve(true);
    });
    req.on('error', () => {
      resolve(false);
    });
    req.end();
  });
}

async function start() {
  console.log('Waiting for Vite dev server on http://localhost:5173...');
  let ready = false;
  let attempts = 0;
  while (!ready && attempts < 30) {
    ready = await checkViteReady();
    if (!ready) {
      await new Promise((r) => setTimeout(r, 600));
      attempts++;
    }
  }

  console.log('Vite server detected! Starting Electron...');
  const electronProcess = spawn('npx', ['electron', 'electron/main.mjs'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NODE_ENV: 'development', WAIT_ON_DEV: 'true' },
  });

  electronProcess.on('close', (code) => {
    process.exit(code || 0);
  });
}

start();
