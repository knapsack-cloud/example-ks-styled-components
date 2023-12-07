import { readFileSync, mkdirSync, writeFileSync, read } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import merge from 'deepmerge';

// The "sets" within Tokens Studio we want to combine
const combos = [
  ['GSK', 'Theme-dark'],
  ['GSK', 'Theme-light'],
  ['Nucala', 'Theme-dark'],
  ['Nucala', 'Theme-light'],
];

// Where we're going to dump everything
const distFolder = join(__dirname, '../core-tokens/dist');
// Make sure it exists first
mkdirSync(distFolder, { recursive: true });

// Function to read the JSON file and log its contents
function doTokensFiles(filePath: string) {
  // Read the file synchronously
  try {
    const jsonData = JSON.parse(readFileSync(filePath, 'utf8'));

    // For every set we need to combine
    combos.forEach((combo) => {
      // Make array of objects to merge
      const mergeableObjects = combo.map((key) => jsonData[key]);
      // Smash all together, deep
      const merged = merge.all(mergeableObjects);
      // Using the keys within the object, create a file name
      const tokenComboName = combo.map((key) => key).join('-');
      const srcTokenFilePath = join(distFolder, `${tokenComboName}.json`);
      // Write out Tokens Studio JSON
      writeFileSync(srcTokenFilePath, JSON.stringify(merged, null, 2));

      // Now generate the Knapsack assets
      const assetsFolder = join(distFolder, tokenComboName);
      execSync(
        `npx knapsack-build-tokens --src ${srcTokenFilePath} --dist ${assetsFolder} --src-format tokens-studio`,
        { stdio: 'inherit' }
      );
    });
  } catch (error) {
    console.error('Error reading the file:', error);
  }
}

// Replace 'path/to/your/jsonfile.json' with the actual file path
doTokensFiles(join(__dirname, '../core-tokens/src/tokens-studio.json'));
