# Repository Working Agreements

These rules apply to all future Codex tasks in this repository.

## Scope and change discipline
- Prefer small, focused changes that solve one task.
- Use one branch per task.
- Avoid unrelated refactors or formatting-only churn.
- Modify only the files needed for the requested outcome.

## English-only technical artifacts
- Write all new code, comments, identifiers, filenames, branch names, commit messages, PR titles, and technical documentation in English.
- Keep end-user and reviewer explanations in simple English.

## Web-first stability requirements
- Keep the current web version working for all supported locales under `src/` (`en`, `ko`, `zh`, and shared resources).
- For changes that affect runtime behavior, assets, or build configuration, run `npm run build` before finishing.
- If a change cannot be validated locally, state that clearly in the PR notes with the reason.

## Web and desktop boundary
- This repository is currently a web project (Webpack + static assets); keep web implementation and build flow intact.
- Place web game code and assets under the existing web paths (`src/`, `webpack.*.js`) and do not introduce desktop-specific runtime coupling into them.
- If desktop packaging/support is added later, keep it separated from web code in its own top-level area and leave web entry points unchanged unless the task explicitly requires it.

## Linux packaging policy
- Linux packaging target is AppImage only.
- Do not add or document Snap, Flatpak, `.deb`, or other Linux package targets unless requirements are explicitly changed.

## Review expectations
- In PR descriptions, include: what changed, why it changed, and how it was validated.
- Keep validation steps reproducible with repository-supported commands.
