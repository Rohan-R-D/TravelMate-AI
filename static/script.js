let currentThreadId = localStorage.getItem("travel_thread_id") || null;
let latestAnswerMarkdown = "";

/* ============================================================
   QUICK PROMPT
   ============================================================ */

function setPrompt(text) {
    const input = document.getElementById("userInput");

    input.value = text;

    // Small visual feedback
    input.classList.remove("input-pulse");

    // Force browser to restart animation
    void input.offsetWidth;

    input.classList.add("input-pulse");

    input.focus();
}


/* ============================================================
   LOADING STATE
   ============================================================ */

function setLoading(isLoading) {
    const sendBtn = document.getElementById("sendBtn");
    const btnText = document.getElementById("btnText");
    const btnLoader = document.getElementById("btnLoader");

    sendBtn.disabled = isLoading;

    if (isLoading) {
        btnText.classList.add("hidden");
        btnLoader.classList.remove("hidden");

        // Animation state
        sendBtn.classList.add("is-loading");

    } else {
        btnText.classList.remove("hidden");
        btnLoader.classList.add("hidden");

        sendBtn.classList.remove("is-loading");
    }
}


/* ============================================================
   ERROR HANDLING
   ============================================================ */

function showError(message) {
    const errorBox = document.getElementById("errorBox");

    errorBox.textContent = message;

    errorBox.classList.remove("hidden");

    // Restart animation every time an error appears
    errorBox.classList.remove("error-visible");

    void errorBox.offsetWidth;

    errorBox.classList.add("error-visible");

    // Smoothly bring error into view
    errorBox.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


function hideError() {
    const errorBox = document.getElementById("errorBox");

    errorBox.classList.add("hidden");
    errorBox.textContent = "";

    errorBox.classList.remove("error-visible");
}


/* ============================================================
   SHOW RESULT
   ============================================================ */

function showResult(answer, threadId) {
    latestAnswerMarkdown = answer;

    const resultSection = document.getElementById("resultSection");
    const resultBox = document.getElementById("resultBox");
    const threadInfo = document.getElementById("threadInfo");

    if (typeof marked !== "undefined") {
        resultBox.innerHTML = marked.parse(answer);
    } else {
        resultBox.innerText = answer;
    }

    threadInfo.textContent = `Thread ID: ${threadId}`;

    resultSection.classList.remove("hidden");

    // Restart result animation
    resultSection.classList.remove("result-visible");

    void resultSection.offsetWidth;

    resultSection.classList.add("result-visible");

    // Animate the generated content
    resultBox.classList.remove("content-visible");

    void resultBox.offsetWidth;

    resultBox.classList.add("content-visible");

    // Smooth scrolling
    setTimeout(() => {
        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 100);
}


/* ============================================================
   SEND MESSAGE
   ============================================================ */

async function sendMessage() {
    hideError();

    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (!message) {
        showError("Please enter your travel request first.");

        // Animate empty input
        input.classList.remove("input-error");

        void input.offsetWidth;

        input.classList.add("input-error");

        return;
    }

    setLoading(true);

    // Visual feedback
    input.classList.remove("input-sending");

    void input.offsetWidth;

    input.classList.add("input-sending");

    try {
        const response = await fetch("/api/travel", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message,
                thread_id: currentThreadId
            })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.error || "Something went wrong.");
        }

        currentThreadId = data.thread_id;

        localStorage.setItem(
            "travel_thread_id",
            currentThreadId
        );

        showResult(
            data.answer,
            data.thread_id
        );

    } catch (error) {

        showError(error.message);

    } finally {

        setLoading(false);

        input.classList.remove("input-sending");
    }
}


/* ============================================================
   COPY RESULT
   ============================================================ */

function copyResult() {
    const resultBox = document.getElementById("resultBox");

    const text = resultBox.innerText;

    if (!text) {
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {

            const copyBtn =
                document.querySelector(".copy-btn");

            const oldText =
                copyBtn.textContent;

            copyBtn.textContent = "Copied!";

            // Success animation
            copyBtn.classList.remove("copy-success");

            void copyBtn.offsetWidth;

            copyBtn.classList.add("copy-success");

            setTimeout(() => {

                copyBtn.textContent = oldText;

                copyBtn.classList.remove(
                    "copy-success"
                );

            }, 1400);
        })

        .catch(() => {

            showError(
                "Could not copy result."
            );

        });
}


/* ============================================================
   DOWNLOAD PDF
   ============================================================ */

function downloadPDF() {

    const pdfContent =
        document.getElementById("pdfContent");

    if (!latestAnswerMarkdown || !pdfContent) {

        showError(
            "No travel plan available to download."
        );

        return;
    }

    const downloadBtn =
        document.querySelector(".download-btn");

    const oldText =
        downloadBtn.textContent;

    downloadBtn.textContent =
        "Preparing PDF...";

    downloadBtn.disabled = true;

    // Loading animation
    downloadBtn.classList.add(
        "download-loading"
    );

    const options = {

        margin: 0.5,

        filename:
            "ai-travel-plan.pdf",

        image: {

            type: "jpeg",

            quality: 0.98

        },

        html2canvas: {

            scale: 2,

            useCORS: true,

            backgroundColor: "#ffffff"

        },

        jsPDF: {

            unit: "in",

            format: "a4",

            orientation: "portrait"

        },

        pagebreak: {

            mode: [
                "avoid-all",
                "css",
                "legacy"
            ]

        }

    };

    html2pdf()
        .set(options)
        .from(pdfContent)
        .save()

        .then(() => {

            downloadBtn.textContent =
                oldText;

            downloadBtn.disabled =
                false;

            downloadBtn.classList.remove(
                "download-loading"
            );

            // Success animation
            downloadBtn.classList.add(
                "download-success"
            );

            setTimeout(() => {

                downloadBtn.classList.remove(
                    "download-success"
                );

            }, 1000);

        })

        .catch(() => {

            downloadBtn.textContent =
                oldText;

            downloadBtn.disabled =
                false;

            downloadBtn.classList.remove(
                "download-loading"
            );

            showError(
                "Could not download PDF."
            );

        });
}


/* ============================================================
   KEYBOARD SHORTCUT
   ============================================================ */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            sendMessage();

        }

    }
);


/* ============================================================
   EXTRA UI INTERACTION
   ============================================================ */

/*
 * Add a subtle typing animation when the user starts typing.
 */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const input =
            document.getElementById(
                "userInput"
            );

        if (!input) {
            return;
        }

        input.addEventListener(
            "input",
            function() {

                input.classList.remove(
                    "input-active"
                );

                void input.offsetWidth;

                input.classList.add(
                    "input-active"
                );

            }
        );

    }
);