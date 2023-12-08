import { readFileSync, mkdirSync, writeFileSync, read } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import merge from 'deepmerge';
import loKebabCase from 'lodash/kebabCase';

import knapsackConfig from './knapsack.config';

// The "sets" within Tokens Studio we want to combine
const combos = [
  {
    name: 'arexvy-dark',
    merge: [
      'Design System/Global',
      'Design System/Arexvy/Default',
      'Design System/Arexvy/Dark',
    ],
  },
  {
    name: 'arexvy-light',
    merge: [
      'Design System/Global',
      'Design System/Arexvy/Default',
      'Design System/Arexvy/Light',
    ],
  },
  {
    name: 'nucala-dark',
    merge: [
      'Design System/Global',
      'Design System/Nucala/Default',
      'Design System/Nucala/Dark',
    ],
  },
  {
    name: 'nucala-light',
    merge: [
      'Design System/Global',
      'Design System/Nucala/Default',
      'Design System/Nucala/Light',
    ],
  },
];

// Where we're going to dump everything
const distFolder =
  knapsackConfig.designTokens?.distDir ||
  join(__dirname, '../core-tokens/dist');
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
      const mergeableObjects = combo.merge.map((key) => jsonData[key]);
      // Smash all together, deep
      const merged = merge.all(mergeableObjects);
      // Using the keys within the object, create a file name
      const tokenComboName = combo.name;
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
