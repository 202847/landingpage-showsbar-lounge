const urlBase = "https://showbar-27130-default-rtdb.firebaseio.com//perfil";

function adicionar() {
    const nome = $("#nome").val();
    const mensagem = $("#mensagem").val();

    if (!nome || !mensagem) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const dados = JSON.stringify({ nome, mensagem });

    $.post(`${urlBase}.json`, dados, () => {
        alert("Depoimento adicionado com sucesso!");
        $("#nome").val("");
        $("#mensagem").val("");
        listar();
    });
}

function listar() {
    $.get(`${urlBase}.json`, data => {
        $("#lista").html("");
        if (data) {
            for (const id in data) {
                const depoimento = data[id];
                $("#lista").append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${depoimento.nome}</strong>
                            <p>${depoimento.mensagem}</p>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-warning me-2" onclick="editar('${id}', '${depoimento.nome}', '${depoimento.mensagem}')">
                                Editar
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="excluir('${id}')">
                                Excluir
                            </button>
                        </div>
                    </li>
                `);
            }
        }
    });
}

function editar(id, nome, mensagem) {
    const novoNome = prompt("Novo nome:", nome);
    const novaMensagem = prompt("Nova mensagem:", mensagem);

    if (novoNome && novaMensagem) {
        const dados = JSON.stringify({ nome: novoNome, mensagem: novaMensagem });
        $.ajax({
            url: `${urlBase}/${id}.json`,
            method: "PUT",
            data: dados,
            success: listar
        });
    }
}

function excluir(id) {
    if (confirm("Deseja realmente excluir este depoimento?")) {
        $.ajax({
            url: `${urlBase}/${id}.json`,
            method: "DELETE",
            success: listar
        });
    }
}

$(document).ready(() => {
    if (window.location.pathname.includes("depoimentos.html")) {
        listar();
    }
});