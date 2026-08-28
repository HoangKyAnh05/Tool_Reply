import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

try {
  console.log('1. Building production web bundle...');
  execSync('npm run build', { cwd: __dirname, stdio: 'inherit' });

  console.log('2. Adding .nojekyll to dist...');
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

  console.log('3. Initializing temporary git in dist...');
  if (fs.existsSync(path.join(distDir, '.git'))) {
    fs.rmSync(path.join(distDir, '.git'), { recursive: true, force: true });
  }

  execSync('git init', { cwd: distDir, stdio: 'inherit' });
  execSync('git add -A', { cwd: distDir, stdio: 'inherit' });
  execSync('git commit -m "deploy: update GitHub Pages for Tool Imagine"', { cwd: distDir, stdio: 'inherit' });
  execSync('git branch -M gh-pages', { cwd: distDir, stdio: 'inherit' });
  execSync('git remote add origin https://github.com/HoangKyAnh05/Tool_Reply.git', { cwd: distDir, stdio: 'inherit' });

  console.log('4. Pushing to origin gh-pages...');
  execSync('git push -f origin gh-pages', { cwd: distDir, stdio: 'inherit' });
  console.log('✓ Successfully deployed to gh-pages branch on GitHub!');
} catch (err) {
  console.error('Deployment error:', err.message);
}
