import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {
  constructor() {}

  onStar(payload: GitHubStarPayload): string {
    let message: string = "";

    const { starred_at, sender, action, repository } = payload;

    return `User ${sender.login} ${action} star on ${repository.full_name}`;
  }

  onIssues(payload: GitHubIssuePayload) {
    let message: string;
    const { action, issue } = payload;

    if (action === "opened") {
      return `An issue was opened with this title ${
        issue.title
      } - Issue description: ${issue.body || "not description"}`;
    }

    if (action === "closed") {
      return `An issue was closed with this title ${issue.user.login}`;
    }

    if (action === "reopened") {
      return `An issue was reopened with this title ${issue.user.login}`;
    }

    return `Unhandled action fot the issue event ${issue.user.login}`;
  }
}
