const getCSRFToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === 'csrftoken') return value;
    }
    return null;
};

const logVisit = async (url) => {
    const csrfToken = getCSRFToken();
    try {
        await fetch("https://local-bites-sepia.vercel.app/api/traffic-analysis/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken, // Token CSRF
            },
            body: JSON.stringify({
                url: url || window.location.href,
                user_agent: navigator.userAgent,
            }),
        });
    } catch (error) {
        console.error("Error al registrar la visita:", error);
    }
};


export default logVisit;
