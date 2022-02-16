const input = document.getElementById("input");
const urlsList = document.getElementById("urls-list")
const saveButton = document.getElementById("save-button");
const readButton = document.getElementById("read-button");
const deleteButton = document.getElementById("delete-button");

let urls = [];
let urlsInLS = JSON.parse(localStorage.getItem("urls"));

if (urlsInLS) {
    urls = urlsInLS;
    urlRenderer();
}

saveButton.addEventListener("click", function () {
    urls.push(input.value);
    input.value = "";

    toLocalStorage();
    urlRenderer();
});

readButton.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        urls.push(tabs[0].url);
        toLocalStorage();
        urlRenderer();   
    });
});

deleteButton.addEventListener("dblclick", function () {
    urls = [];
    localStorage.clear();
    urlRenderer();  
});

function toLocalStorage() {
    localStorage.setItem("urls", JSON.stringify(urls));
}

function urlRenderer() {
    listItem = "";
    for (index = 0; index < urls.length; index++) {
        listItem += `
            <li>
                <a href='${urls[index]}' target='_blank'>
                    ${urls[index]}
                </a>
            </li>
        `
    }
    urlsList.innerHTML = listItem;
}
