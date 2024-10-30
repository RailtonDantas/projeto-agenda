const settings = document.querySelector("#settings");
const containerLink = document.querySelector("#addLink");

settings.addEventListener('click', () => {
    const btnOfDeleteAccount = document.createElement('button');
    btnOfDeleteAccount.classList.add("bg-red-700",'font-bold','leading-8','text-black','border','border-black','px-2','p-py','rounded')
    // linkOfDeleteAccount.classList.add("font-bold")
    // linkOfDeleteAccount.classList.add("leading-8")
    // linkOfDeleteAccount.classList.add("text-black")


    btnOfDeleteAccount.textContent = 'Apagar sua conta'

    const allLinks = containerLink.querySelectorAll("button");
    if(allLinks.length >= 1){
        containerLink.removeChild(containerLink.lastElementChild)
        return
    }
    containerLink.appendChild(btnOfDeleteAccount)
    
    btnOfDeleteAccount.addEventListener("click", () => {
        const header = document.querySelector("header");
        const main = document.querySelector("main");
        const h1 = document.querySelector("h1");
        const h2 = document.querySelector("h2");

        const dialog = document.querySelector("dialog");
        dialog.classList.replace('hidden','flex')
        containerLink.removeChild(containerLink.lastElementChild)
        header.classList.add('blur-lg')
        main.classList.add('blur-lg')
        h1.classList.add('blur-lg')
        h2.classList.add('blur-lg')  
    })
})