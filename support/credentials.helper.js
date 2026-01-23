import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadCredentials() {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../fixtures/credentials.json'),
      'utf-8'
    )
  );
}