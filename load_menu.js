
    function includeHTML() {
        const elements = document.querySelectorAll('[data-include]');
        elements.forEach(async (el) => {
            const file = el.getAttribute('data-include');
            if (file) {
                try {
                    const response = await fetch(file);
                    if (!response.ok) throw new Error('Network response was not ok.');
                    el.innerHTML = await response.text();
                } catch (error) {
                    el.innerHTML = "Menu could not be loaded.";
                    console.error("Failed to load file:", error);
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', includeHTML);