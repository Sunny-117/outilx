import { deleteEmptyDirs } from "../src";
import path from 'path'

deleteEmptyDirs(path.resolve(process.cwd(), 'tests/fixtures'), true)
