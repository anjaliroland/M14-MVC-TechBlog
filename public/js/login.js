const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userObj = {
        email: document.querySelector("#email-login").value,
        password: document.querySelector("#password-login").value,
    };
    try {
        const res = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            document.location.replace('/');
        } else {
            alert("404 error. try again");
        }
    } catch (error) {
        console.error(error);
    }
});