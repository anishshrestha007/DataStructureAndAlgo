const files = [
  {
    name: "src",
    items: [
      {
        name: "common",
        items: [
          {
            name: "CustomImage.js",
          },
          {
            name: "CustomImage.css",
          },
        ],
      },
      {
        name: "styles",
        items: [
          {
            name: "customstyles.js",
          },
          {
            name: "customstyles.css",
          },
        ],
      },
      {
        name: "App.css",
      },
      {
        name: "App.js",
      },
    ],
  },
];

function RenderFiles(files, currName) {
  if (typeof files === "object") {
    let cName = currName ?? "";

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      document.getElementById(
        "folder" + cName
      ).innerHTML += `<div id='folder${element.name}' class='folder${element.name}'><p  onclick = "showHideChild(event)">${element.name}</p></div>`;
      if (element.items) {
        RenderFiles(element.items, element.name);
      }
    }
  }
}

function showHideChild(e) {
  e.preventDefault();
  e.stopPropagation();
  const currentElement = e.target.parentElement;
  Array.from(currentElement.getElementsByTagName("div")).forEach((element) => {
    element.style.display = element.style.display == "none" ? "" : "none";
  });
}

RenderFiles(files);
