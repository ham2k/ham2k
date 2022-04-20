# From NX install

> NX Nx CLI is not installed globally.

This means that you might have to use "yarn nx" or "npx nx" to execute commands in the workspace.
Run "yarn global add nx" or "npm install -g nx" to be able to execute command directly.

> NX First time using Nx? Check out this interactive Nx tutorial.

https://nx.dev/react-tutorial/01-create-application

Prefer watching videos? Check out this free Nx course on Egghead.io.
https://egghead.io/playlists/scale-react-development-with-nx-4038

> NX Nx Cloud has been enabled

Your workspace is currently public. Anybody with code access can view the workspace on nx.app.
You can connect the workspace to your Nx Cloud account at https://nx.app/orgs/workspace-setup?accessToken=YjQ3NjYwZDgtYmU2ZS00NjlkLTk4YjQtMjEyMmI3MzBkZGY2fHJlYWQtd3JpdGU=. (You can do this later.)

---

# TODO

---

# Snippets

`lines.map(line => { qso = {band: line[0].toLowerCase(), mode: "SSB", their: {call: line[1]}, our: {call:"KI2D"}}; contest.prepareOneQSO(qso); return [line[1], Number.parseInt(line[3]), contest.scoringInfoForQSO(qso), qso] }).filter(line => line[1] != line[2].score.points)`
