document.addEventListener("DOMContentLoaded", () => {
    const streakDisplay = document.getElementById("streak");
    const lastLfgDisplay = document.getElementById("last-lfg");
    const lfgButton = document.getElementById("lfg-button");
    const messageDisplay = document.getElementById("message");

    // Ambil data dari localStorage
    let streak = parseInt(localStorage.getItem("streak")) || 0;
    let lastLfg = localStorage.getItem("lastLfg") || null;

    // Fungsi untuk memeriksa apakah hari ini sudah LFG
    function canSendLFG() {
        const today = new Date().toDateString();
        return lastLfg !== today;
    }

    // Fungsi untuk memperbarui tampilan
    function updateDisplay() {
        streakDisplay.textContent = streak;
        lastLfgDisplay.textContent = lastLfg ? new Date(lastLfg).toLocaleDateString() : "-";
        lfgButton.disabled = !canSendLFG();
    }

    // Fungsi untuk memeriksa reset streak
    function checkStreakReset() {
        if (!lastLfg) return;
        const lastDate = new Date(lastLfg);
        const today = new Date();
        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) {
            streak = 0; // Reset streak jika melewatkan sehari
            localStorage.setItem("streak", streak);
        }
    }

    // Klik tombol LFG
    lfgButton.addEventListener("click", () => {
        if (canSendLFG()) {
            streak += 1;
            lastLfg = new Date().toDateString();
            localStorage.setItem("streak", streak);
            localStorage.setItem("lastLfg", lastLfg);
            messageDisplay.textContent = "LFG sent! Keep the streak going!";
        } else {
            messageDisplay.textContent = "You've already sent LFG today!";
        }
        updateDisplay();
    });

    // Inisialisasi
    checkStreakReset();
    updateDisplay();
});
