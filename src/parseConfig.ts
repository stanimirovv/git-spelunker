import { Config } from "./types/config.type";

export default function parseConfig(): Config {
  const command = getCommand();
  const repo = process.env.REPO || "./";
  const maxCommitsStr = process.env.MAX_COMMITS || "200000";
  const maxCommits = parseInt(maxCommitsStr);

  const acceptableAggregationTypes = ["day", "month", "year"];
  const aggregation: any = process.env.AGG || "month";
  if (!acceptableAggregationTypes.includes(aggregation)) {
    console.error(`Invalid aggregation type: ${aggregation}`);
    process.exit(1);
  }

  if (!command) {
    console.error("No command provided");
    process.exit(1);
  }

  const config: Config = {
    repo,
    command,
    maxCommits,
    aggregation,
  };
  return config;
}

function getCommand() {
  if (process.argv.length == 3) {
    return process.argv[2];
  } else if (process.argv.length > 3) {
    return process.argv.slice(2).join(" ");
  } else {
    return "";
  }
}
