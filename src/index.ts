import { execute } from "./program";
import yargs = require("yargs/yargs");
import { DEFAULT_MARGIN, DEFAULT_PATH_TO_COVERAGE_SUMMARY } from "./constants";
const argv = yargs(process.argv.slice(2))
    .usage("Usage: jest-coverage-thresholds-bumper <command> [options]")
    .option("coverage-summary-path", {
        describe: "Path to Jest coverage results",
        defaultDescription: DEFAULT_PATH_TO_COVERAGE_SUMMARY,
        type: "string",
    })
    .option("margin", {
        describe: "Minimal threshold increase in percent",
        default: DEFAULT_MARGIN,
        type: "number",
    })
    .option("dry-run", {
        describe: "Do analysis, but don't change any thresholds",
        type: "boolean",
    })
    .option("silent", {
        describe: "No console output unless something goes wrong",
        type: "boolean",
    })
    .help("help")
    .version("version")
    .wrap(120)
    .parse();

try {
    execute(argv);
} catch (err) {
    console.error(`Something went wrong when bumping code coverage thresholds:
==========================================================
${err}`);
    throw err;
}
