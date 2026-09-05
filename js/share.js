const shareText =
    "Check out this survey on SDG 15: Life on Land 🌳 — " +
    "see what people think about protecting forests and wildlife!";

const shareButton = document.getElementById("shareButton");
const shareMessage = document.getElementById("shareMessage");

if (shareButton) {

    shareButton.addEventListener("click", async () => {

        const shareData = {
            title: "SDG 15: Life on Land",
            text: shareText,
            url: window.location.origin
        };

        if (navigator.share) {

            try {
                await navigator.share(shareData);
            } catch (error) {
                
            }

        } else {

            try {
                await navigator.clipboard.writeText(
                    shareText + " " + shareData.url
                );

                shareMessage.textContent =
                    "Link copied to clipboard!";

                setTimeout(() => {
                    shareMessage.textContent = "";
                }, 3000);

            } catch (error) {
                shareMessage.textContent =
                    "Couldn't copy the link — please copy it manually.";
            }

        }

    });

}
