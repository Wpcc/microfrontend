import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "my-dir",
  app: () => System.import("my-dir"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});
