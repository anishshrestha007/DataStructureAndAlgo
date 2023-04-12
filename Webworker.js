document.addEventListener("DOMContentLoaded", init);
messageFromWorker = (ev) => {
  data = ev.data;
  console.log(data);
};

errorFromWorker = (ev) => {
  data = ev.data;
  console.log(data);
};
function init() {
  const workerButton = document.querySelector("#clickWorker");
  if (window.Worker) {
    let worker = new Worker("Worker.js");
    worker.addEventListener("message", messageFromWorker);
    worker.addEventListener("error", errorFromWorker);

    workerButton.addEventListener("click", () => {
      worker.postMessage({
        methodName: "sum",
        values: [1, 2, 3],
      });
    });
  }
}
