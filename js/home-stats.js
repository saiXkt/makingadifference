import {
    createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://hbmquotgszzqpgaceveh.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibXF1b3Rnc3p6cXBnYWNldmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MzE1MDksImV4cCI6MjEwNDEwNzUwOX0.Oyz-awse1NwTOQWY8m7VCUdj2SpVEa3mrRUf2HobOKU";

const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);

async function loadHomeStats() {

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

    const seriousCount = data.filter(
        (response) =>
            response.deforestation === "Serious" ||
            response.deforestation === "Very serious"
    ).length;

    const awarenessCount = data.filter(
        (response) =>
            response.sdg_awareness === "Yes"
    ).length;

    const seriousPercentage =
        total === 0
            ? 0
            : Math.round((seriousCount / total) * 100);

    const awarenessPercentage =
        total === 0
            ? 0
            : Math.round((awarenessCount / total) * 100);

    document.getElementById(
        "homeTotalResponses"
    ).textContent = total;

    document.getElementById(
        "homeSeriousPercentage"
    ).textContent = seriousPercentage + "%";

    document.getElementById(
        "homeSdgPercentage"
    ).textContent = awarenessPercentage + "%";
}

loadHomeStats();
