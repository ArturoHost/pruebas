if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/{pruebas}/sw.js", {
    scope: "/{pruebas}/",
  });
}
