const SHEETDB_URL = "https://sheetdb.io/api/v1/i37b55e3ows6k";

const pages = document.querySelectorAll(".page");
const progressBar = document.getElementById("progressBar");

let formData = {
    know: "",
    about: "",
    final: ""
};

function showPage(id) {
    pages.forEach(page => page.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function setProgress(value) {
    progressBar.style.width = value + "%";
}

function startForm() {
    showPage("q1");
    setProgress(25);
}

function nextQuestion1() {

    const selected = document.querySelector('input[name="know"]:checked');

    if (!selected) {
        alert("Please select an option.");
        return;
    }

    formData.know = selected.value;

    if (selected.value === "Yes") {
        showPage("yesPath");
        setProgress(50);
    } else {
        showPage("noPath");
        setProgress(75);
    }
}

function goToFinalYes() {

    const txt = document.getElementById("aboutMe").value.trim();

    if (txt === "") {
        alert("Please tell me something.");
        return;
    }

    formData.about = txt;

    showPage("finalYes");
    setProgress(75);
}

async function submitForm(path) {

    let option;

    if (path === "yes") {
        option = document.querySelector('input[name="finalYes"]:checked');
    } else {
        option = document.querySelector('input[name="finalNo"]:checked');
    }

    if (!option) {
        alert("Please choose one option.");
        return;
    }

    formData.final = option.value;

    const body = {
        data: {
            Timestamp: new Date().toLocaleString(),
            "Do you know me?": formData.know,
            "What do you know about me?": formData.about,
            "Final Response": formData.final
        }
    };

    try {

        const response = await fetch(SHEETDB_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const result = await response.json();

        if (result.created === 1) {

            setProgress(100);

            showPage("thankyou");

        } else {

            alert("Submission failed.");

        }

    } catch (err) {

        console.log(err);

        alert("Unable to submit. Please try again.");

    }

}