const passwordInput = document.querySelector("#search")
const eye = document.querySelector("#eye")

export default function setEye() {
    eye.addEventListener("click", function () {
        this.classList.toggle("fa-eye-slash")
        this.classList.toggle("fa-eye")
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
        passwordInput.setAttribute("type", type)
    })
}