//************* création du formulaire de connexion **************//
document.querySelector('#form').addEventListener("submit", (event) => {
    event.preventDefault();

    let form = event.target;
    let errorMsg = document.querySelector('#errorMsg');

    if (form.email.value !== "" && form.password.value !== "") {
        errorMsg.textContent = "";

        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": form.email.value,
                "password": form.password.value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de connexion.");
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "user not found") {
                errorMsg.textContent = "Erreur : " + data.message;
            } else {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("userId", data.userId);
                window.location.href = "index.html";
            }
        })
        .catch(error => {
            console.log(error);
            errorMsg.textContent = "Erreur de connexion. Veuillez réessayer.";
        });
    } else {
        errorMsg.textContent = "Veuillez remplir tous les champs.";
    }
});