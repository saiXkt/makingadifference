import {
    createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://hbmquotgszzqpgaceveh.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibXF1b3Rnc3p6cXBnYWNldmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MzE1MDksImV4cCI6MjEwNDEwNzUwOX0.Oyz-awse1NwTOQWY8m7VCUdj2SpVEa3mrRUf2HobOKU";

const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);

async function loadResults() {

    const {
        data,
        error
    } = await supabase
        .from("survey_responses")
        .select("*");

    if (error) {

        console.error(error);

        return;
    }

    const total = data.length;

    // Q1 (deforestation): now "Not aware / Somewhat aware / Aware / Very aware"
    const awareCount = data.filter(
        (response) =>
            response.deforestation === "Aware" ||
            response.deforestation === "Very aware"
    ).length;

    // Q3 (sdg_awareness): now "Not concerned / Somewhat concerned / Concerned / Very concerned"
    const concernedCount = data.filter(
        (response) =>
            response.sdg_awareness === "Concerned" ||
            response.sdg_awareness === "Very concerned"
    ).length;

    const awarePercentage =
        total === 0
            ? 0
            : Math.round((awareCount / total) * 100);

    const concernedPercentage =
        total === 0
            ? 0
            : Math.round((concernedCount / total) * 100);

    document.getElementById(
        "totalResponses"
    ).textContent = total;

    document.getElementById(
        "seriousPercentage"
    ).textContent = awarePercentage + "%";

    document.getElementById(
        "sdgPercentage"
    ).textContent = concernedPercentage + "%";

    showResults(
        data,
        "deforestation",
        "deforestationResults"
    );

    showResults(
        data,
        "sdg_awareness",
        "awarenessResults"
    );

    showResults(
        data,
        "main_issue",
        "issueResults"
    );

    showResults(
        data,
        "participation",
        "participationResults"
    );

    showResults(
        data,
        "preferred_action",
        "actionResults"
    );

}

function showResults(
    data,
    field,
    resultId
) {

    const container =
        document.getElementById(resultId);

    container.innerHTML = "";

    const counts = {};

    data.forEach((response) => {

        const value = response[field];

        if (counts[value]) {

            counts[value]++;

        } else {

            counts[value] = 1;

        }

    });

    const total = data.length;

    Object.entries(counts).forEach(
        ([label, count]) => {

            const percentage =
                total === 0
                    ? 0
                    : Math.round(
                        (count / total) * 100
                    );

            const row =
                document.createElement("div");

            row.className = "result-row";

            row.innerHTML = `
                <div class="result-header">

                    <span>${label}</span>
                    <span>${percentage}%</span>

                </div>

                <div class="result-bar">
                    <div
                        class="result-fill"
                        style="width: 0%"
                    ></div>
                </div>
            `;

            container.appendChild(row);

            const fill = row.querySelector(".result-fill");

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    fill.style.width = percentage + "%";
                });
            });
        }
    );

}

loadResults();