/* =====================================================
   FORMULÁRIO DE CONTACTOS
   O site não tem servidor, por isso o formulário
   prepara um email com os dados preenchidos e abre
   o programa de email do visitante.
===================================================== */

document.querySelectorAll(".contact-form").forEach(function (form) {

    const status = form.querySelector(".form-status");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        /* Mostra os avisos do browser se faltar algum campo */
        if (!form.reportValidity()) {
            status.textContent = "Preencha todos os campos antes de enviar.";
            status.className = "form-status is-error";
            return;
        }

        const dados = new FormData(form);

        const assunto = dados.get("assunto") + " — " + dados.get("nome");

        let corpo =
            "Nome: " + dados.get("nome") + "\n" +
            "Email: " + dados.get("email") + "\n";

        if (dados.get("perfil")) {
            corpo += "Perfil: " + dados.get("perfil") + "\n";
        }

        corpo += "\n" + dados.get("mensagem");

        window.location.href =
            "mailto:" + form.dataset.email +
            "?subject=" + encodeURIComponent(assunto) +
            "&body=" + encodeURIComponent(corpo);

        status.textContent = "A abrir o seu programa de email… Obrigado pelo contacto!";
        status.className = "form-status is-success";
    });

    /* Limpa a mensagem de erro quando o utilizador volta a escrever */
    form.addEventListener("input", function () {
        if (status.classList.contains("is-error")) {
            status.textContent = "";
            status.className = "form-status";
        }
    });
});


/* Botões dos planos escolhem logo o assunto certo */

document.querySelectorAll("[data-assunto]").forEach(function (botao) {

    botao.addEventListener("click", function () {

        const select = document.querySelector('.contact-form select[name="assunto"]');

        if (select) {
            select.value = botao.dataset.assunto;
        }
    });
});
