const input = document.getElementById("input");
const urlsList = document.getElementById("urls-list")
const saveButton = document.getElementById("save-button");

var urls = [];
let urlsInLS = JSON.parse(localStorage.getItem("urls"));

console.log(urlsInLS)

if (urlsInLS) {
    urls = urlsInLS;
    urlRenderer();
}

saveButton.addEventListener("click", function () {
    urls.push(input.value);
    input.value = "";

    localStorage.setItem("urls", JSON.stringify(urls));
    urlRenderer();
});

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
