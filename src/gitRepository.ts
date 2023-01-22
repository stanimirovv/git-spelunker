// Checksout a commit and executes a command
import { execSync } from "child_process";

export class GitRepository {
  private initialCommitHash = "";

  public checkoutAndExec(commitHash: string, command: string) {
    try {
      // Check out the specific commit
      execSync(`git checkout ${commitHash}`);

      // Run a command and capture the output
      const output = execSync(command).toString();

      console.log(output); // TODO handle this output somehow
    } catch (err: any) {
      console.error(err.stderr.toString());
    }
  }

  public getInitialCommitHash() {
    try {
      if (this.initialCommitHash === "") {
        this.initialCommitHash = execSync("git rev-list --max-parents=0 HEAD")
          .toString()
          .trim();
      }
      return this.initialCommitHash;
    } catch (err: any) {
      console.error(err.stderr.toString());
    }
  }

  public restoreInitialCommit() {
    try {
      execSync(`git checkout ${this.initialCommitHash}`);
    } catch (err: any) {
      console.error(err.stderr.toString());
    }
  }
}