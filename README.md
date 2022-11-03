This repository was created with the [Buildkite-Github Adoption App: Repo Initializer ](https://code.hq.twilio.com/productivity-eng/github-app-buildkite-adoption.git) to generate the following Buildkite defaults:

1. README.md - provides instructions and links for getting started with Buildkite.
2. Pipeline.yaml - a file to be used with a Buildkite pipeline; contains suggested steps for a docker build and publish but can be customized. 

## Building a Project on Buildkite
Please check out the [Buildkite User Guide](https://wiki.hq.twilio.com/pages/viewpage.action?spaceKey=PLAT&title=Buildkite+User+Guide) for more complete information and instructions on using Buildkite. 

## How to get started with owl buildkite pellet

Here are the steps to use our [Owl Buildkite](https://wiki.hq.twilio.com/pages/viewpage.action?spaceKey=PLAT&title=Buildkite+User+Guide#BuildkiteUserGuide-Usetheowlbuildkitepellet) command line tool to create your first Buildkite Pipeline. 

If this is your first time using the owl buildkite tool: 
1. Install the owl buildkite tool: `owl pellet install buildkite git@code.hq.twilio.com:twilio/owl-buildkite.git`
2. Create a buildkite token and save it in the tool with `owl buildkite login` 
3. Execute `owl buildkite create ORG/REPO --team <your-team>`

## Opting out of Buildkite

If you want to opt out of Buildkite, you can remove the file `.buildkite/pipeline.yaml` from the default branch.  

## Questions/Comments ?

We hope this template has been useful to you and can get you started with Buildkite. If you have questions/feedback on this app, please reach out to us on [#help-buildkite](https://twilio.slack.com/archives/C01KVQZFS2D)
