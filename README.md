# Relative Paths to Remote Modules
This repository is an example of how relative paths can be used to import remote modules with [module federation](https://module-federation.io/).

Consider the following diagram that shows how two routes `/app` and `/modules` get routed to different vpns based on the base url specifying `dev.example.com` or `prod.example.com`.

![Relative remote diagram](relative-remote-diagram.png)

In this example, both the remote modules, and the host application are served from the same domain, however that domain is not static.  Additionally both the host application and the remote modules can graduate to various environments, such as `dev`, `stage`, `prod`, `gov`, etc.  They graduate to these environments independent from eachother, so a remote that is in active development will need to be tested against the application across all environments and vice-versa.

This repository is configured to demonstrate a host application and a static asset server that can host any number of federated modules.  The host application is spoofed with a proxy to redirect `/module` requests to the static asset server.  In a real world scenario this would be done through route configuration on a load balancer or reverse proxy such as nginx.

# Using Relative Paths
Module Fedaration can be configured to refer to remotes using a relative path.  This allows the host application to be agnostic to the environment that the remote modules are in.  The host application can request the remote modules using a relative path, such as `/modules/buttons`.  The module server will then serve the remote modules from the correct location based on the base url.

# The Typscript Gap
Module federation has a really amazing feature that can resolve remote module Typescript types at build time.  The main issue is that when using a relative path to specifiy the location of the remote module `manifest.json` file, the DTS plugin does not know the correct base url to use.  This is because the base url is not known at build time.  I've [filed a feature request to resolve this](https://github.com/module-federation/core/issues/2963), and [implemented a potential solution](https://github.com/module-federation/core/pull/3042) that was recently closed as "won't do." Hopefully this repository is a good enough reproduction to warrant the feature request.

# Directoryy Structure
There are 3 apps in this repository under the `/packages` folder.

- *host*: A module federation consumer application
- *module-server*: A simple express application that serves the remote modules
- *modules/buttons*: A module federation provider that exposes a `ConfettiButton` component.

# Install and running the example

1. Clone the repository
```bash
git clone https://github.com/sbvice/relative-path-example.git
cd relative-path-example
```

2. Install the dependencies
```bash
nvm use
npm install
```

3. Build the federated modules
```bash
npm run build -w packages/modules
```

4. Start the module server
```bash
npm run start -w packages/module-server
```

5. Start the host application
```bash
npm run start -w packages/host
```

6. Open [http://localhost:3000](http://localhost:3000) to view the demo application in the browser.


# Reproducing the bug
While the application loads and runs fine, there is a typescript warning when trying to compile the host application.

To reproduce this run:
```bash
npm run typecheck -w packages/host
```

The warning is:
```
error TS2307: Cannot find module 'buttons/ConfettiButton' or its corresponding type declarations.

2 import ConfettiButton from 'buttons/ConfettiButton';

Found 1 error in src/App.tsx:2
```
