# Roadmap

- [x] FIXED: the original test for `Update, Add and Remove in single statement` is wrong
  - Wrong: `"$remove" : {"posts.1" : true}`
  - Right: `"$remove" : {"posts.2" : true}`
- [x] CI: tests validation for new commits
- [ ] Refactor: subdocuments, make it generic, not use only `mentions` or `posts` nodes
- [ ] Refactor: sub properties (e.g. "mentions") detection
- [ ] Refactor: process for new posts
