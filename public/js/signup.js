const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userObj = {
        email: document.querySelector("#email-signup").value,
        name: document.querySelector("#name-signup").value,
        password: document.querySelector("#password-signup").value,
    };
    try {
        const res = await fetch("/api/users/", {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            location.href = "/";
        } else {
            alert("password needs to be longer than 6 characters");
        }
    } catch (error) {
        console.error(error);
    }
});