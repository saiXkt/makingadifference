import {
    createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://hbmquotgszzqpgaceveh.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibXF1b3Rnc3p6cXBnYWNldmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MzE1MDksImV4cCI6MjEwNDEwNzUwOX0.Oyz-awse1NwTOQWY8m7VCUdj2SpVEa3mrRUf2HobOKU";

const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);

const surveyForm = document.getElementById("surveyForm");

const surveyMessage =
    document.getElementById("surveyMessage");

surveyForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const deforestation =
        document.querySelector(
            'input[name="deforestation"]:checked'
        ).value;

    const sdgAwareness =
        document.querySelector(
            'input[name="sdg_awareness"]:checked'
        ).value;

    const mainIssue =
        document.querySelector(
            'input[name="main_issue"]:checked'
        ).value;

    const participation =
        document.querySelector(
            'input[name="participation"]:checked'
        ).value;

    const preferredAction =
        document.querySelector(
            'input[name="preferred_action"]:checked'
        ).value;

    const { error } = await supabase
        .from("survey_responses")
        .insert([
            {
                deforestation: deforestation,
                sdg_awareness: sdgAwareness,
                main_issue: mainIssue,
                participation: participation,
                preferred_action: preferredAction
            }
        ]);

    if (error) {

        console.error(error);

        surveyMessage.textContent =
            "Something went wrong. Please try again.";

        return;
    }

    surveyMessage.textContent =
        "Thank you! Your response has been recorded.";

    surveyForm.reset();

});
