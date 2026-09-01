

const containerProduto = document.getElementById("container")
const btnCarregarProdutos = document.getElementById("btnProdutos")
const btnCreate = document.getElementById("btnCreate")

btnCarregarProdutos.addEventListener("click", carregarProdutos)
btnCreate.addEventListener("click", carregarForms)

function criarCard(produto){
    const card = document.createElement("div")
    card.className = "container-produto"

    const divImg = document.createElement("div")
    divImg.className = "container-produto-img"

    const imgProduto = document.createElement("img")
    imgProduto.src = "./images/images.jfif"
    imgProduto.alt = "imagem placeholder"
    divImg.appendChild(imgProduto)

    const divInfo = document.createElement("div")
    divInfo.className = "container-produto-info"

    const pId = document.createElement("p")
    pId.textContent = `id: ${produto.id}`

    const pDesc = document.createElement("p")
    pDesc.textContent = `${produto.descricao}`

    const pPreco = document.createElement("p")
    pPreco.textContent = `R$${produto.preco}`

    const pCategoria = document.createElement("p")
    pCategoria.textContent = `Categoria: ${produto.categoria}`

    const pEstoque = document.createElement("p")
    pEstoque.textContent = `Estoque: ${produto.estoque}`

    divInfo.append(pId, pDesc, pPreco, pCategoria, pEstoque)

    const divAcoes = document.createElement("div")
    const btnEdit = document.createElement("button")
    btnEdit.type = "button"
    btnEdit.textContent = "Edit"
    btnEdit.addEventListener("click", () => editProduto(produto))
    const btnDelete = document.createElement("button")
    btnDelete.type = "button"
    btnDelete.textContent = "Delete"
    btnDelete.addEventListener("click", () => deleteProduto(produto.id))

    divAcoes.append(btnEdit, btnDelete)
    card.append(divImg, divInfo, divAcoes)
    return card
}

function carregarProdutos(){
    containerProduto.innerHTML = ""
    fetch("/produtos")
    .then(res => res.json())
    .then(produtos =>{
        produtos.forEach(produto =>{
            const card = criarCard(produto)
            containerProduto.append(card)
        })
    })
}

function carregarForms(){
    containerProduto.innerHTML = ""
    const formCadastro = document.createElement("form")
    formCadastro.id = "formCadastroProduto"

    const tituloFormCadastro = document.createElement("h2")
    tituloFormCadastro.textContent = "Cadastrar Novo Produto"

    const labelDesc = document.createElement("label")
    labelDesc.htmlFor = "descricao-input"
    labelDesc.textContent = "Descrição:"
    const inputDesc = document.createElement("input")
    inputDesc.type = "text"
    inputDesc.id = "descricao-input"
    inputDesc.name = "descricao"

    const labelPreco = document.createElement("label")
    labelPreco.htmlFor = "preco-input"
    labelPreco.textContent = "Preço:"
    const inputPreco = document.createElement("input")
    inputPreco.type = "number"
    inputPreco.id = "preco-input"
    inputPreco.name = "preco"

    const labelCategoria = document.createElement("label")
    labelCategoria.htmlFor = "categoria-input"
    labelCategoria.textContent = "Categoria:"
    const inputCategoria = document.createElement("input")
    inputCategoria.type = "text"
    inputCategoria.id = "categoria-input"
    inputCategoria.name = "categoria"

    const labelEstoque = document.createElement("label")
    labelEstoque.htmlFor = "estoque-input"
    labelEstoque.textContent = "Estoque:"
    const inputEstoque = document.createElement("input")
    inputEstoque.type = "number"
    inputEstoque.id = "estoque-input"
    inputEstoque.name = "estoque"

    const btnEnviar = document.createElement("button")
    btnEnviar.type = "submit"
    btnEnviar.textContent = "Cadastrar Produto"

    formCadastro.append(tituloFormCadastro, labelDesc, inputDesc, labelPreco, inputPreco, labelCategoria, inputCategoria, labelEstoque, inputEstoque, btnEnviar)
    
    containerProduto.append(formCadastro)
    
    formCadastro.addEventListener("submit", (event) => {
        event.preventDefault()

        const novoProduto ={
            descricao: inputDesc.value,
            preco: parseFloat(inputPreco.value),
            categoria: inputCategoria.value,
            estoque: parseInt(inputEstoque.value)
        }

        fetch("/produtos", {
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(novoProduto)
        })
        .then(res => res.json())
        .then(produtoCriado => {
            console.log(produtoCriado)
            formCadastro.reset()
        })
    })

}

function editProduto(produto){
    containerProduto.innerHTML = ""
    const formCadastro = document.createElement("form")
    formCadastro.id = "formCadastroProduto"

    const tituloFormCadastro = document.createElement("h2")
    tituloFormCadastro.textContent = "Cadastrar Novo Produto"

    const labelDesc = document.createElement("label")
    labelDesc.htmlFor = "descricao-input"
    labelDesc.textContent = "Descrição:"
    const inputDesc = document.createElement("input")
    inputDesc.type = "text"
    inputDesc.id = "descricao-input"
    inputDesc.name = "descricao"

    const labelPreco = document.createElement("label")
    labelPreco.htmlFor = "preco-input"
    labelPreco.textContent = "Preço:"
    const inputPreco = document.createElement("input")
    inputPreco.type = "number"
    inputPreco.id = "preco-input"
    inputPreco.name = "preco"

    const labelCategoria = document.createElement("label")
    labelCategoria.htmlFor = "categoria-input"
    labelCategoria.textContent = "Categoria:"
    const inputCategoria = document.createElement("input")
    inputCategoria.type = "text"
    inputCategoria.id = "categoria-input"
    inputCategoria.name = "categoria"

    const labelEstoque = document.createElement("label")
    labelEstoque.htmlFor = "estoque-input"
    labelEstoque.textContent = "Estoque:"
    const inputEstoque = document.createElement("input")
    inputEstoque.type = "number"
    inputEstoque.id = "estoque-input"
    inputEstoque.name = "estoque"

    const btnEnviar = document.createElement("button")
    btnEnviar.type = "submit"
    btnEnviar.textContent = "Cadastrar Produto"

    formCadastro.append(tituloFormCadastro, labelDesc, inputDesc, labelPreco, inputPreco, labelCategoria, inputCategoria, labelEstoque, inputEstoque, btnEnviar)
    
    containerProduto.append(formCadastro)
    
    formCadastro.addEventListener("submit", (event) => {
        event.preventDefault()

        const novoProduto ={
            descricao: inputDesc.value,
            preco: parseFloat(inputPreco.value),
            categoria: inputCategoria.value,
            estoque: parseInt(inputEstoque.value)
        }

        fetch(`/produtos/${produto.id}`, {
            method:"PUT",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(novoProduto)
        })
        .then(res => res.json())
        .then(produtoModificado => {
            console.log(produtoModificado)
            formCadastro.reset()
            carregarForms()
        })
    })

}

function deleteProduto(id){
    fetch(`/produtos/${id}`,{
        method: "DELETE"
    })
    .then(res => res.json())
    .then(produtoDeletado => {
        console.log(produtoDeletado)
        carregarProdutos()
    })
}