import { deleteFilesByPattern } from "../src";
import path from 'path';

deleteFilesByPattern({
  targetDir: path.resolve(process.cwd(), 'tests/fixtures'),
  pattern: '**.ts',
  recursive: true
})
