const express = require ('express')
const app = express ()
app.use(express.json())

const produtos = [
  {
    "id": 1,
    "descricao": "Notebook Dell Inspiron 15",
    "categoria": "Informática",
    "preco": 3499.90,
    "estoque": 12
  },
  {
    "id": 2,
    "descricao": "Mouse Logitech MX Master",
    "categoria": "Periféricos",
    "preco": 549.90,
    "estoque": 25
  },
  {
    "id": 3,
    "descricao": "Teclado Mecânico Keychron K2",
    "categoria": "Periféricos",
    "preco": 629.90,
    "estoque": 18
  },
  {
    "id": 4,
    "descricao": "Monitor LG UltraWide 29",
    "categoria": "Monitores",
    "preco": 1499.90,
    "estoque": 8
  },
  {
    "id": 5,
    "descricao": "Webcam Logitech C920",
    "categoria": "Periféricos",
    "preco": 429.90,
    "estoque": 15
  },
  {
    "id": 6,
    "descricao": "SSD Kingston 1TB",
    "categoria": "Armazenamento",
    "preco": 459.90,
    "estoque": 30
  },
  {
    "id": 7,
    "descricao": "Headset HyperX Cloud II",
    "categoria": "Áudio",
    "preco": 599.90,
    "estoque": 14
  },
  {
    "id": 8,
    "descricao": "Hub USB-C 7 em 1",
    "categoria": "Acessórios",
    "preco": 289.90,
    "estoque": 40
  },
  {
    "id": 9,
    "descricao": "Roteador TP-Link Archer AX23",
    "categoria": "Redes",
    "preco": 399.90,
    "estoque": 20
  },
  {
    "id": 10,
    "descricao": "Caixa de Som JBL Flip 6",
    "categoria": "Áudio",
    "preco": 699.90,
    "estoque": 11
  },
  {
    "id": 11,
    "descricao": "Carregador USB-C 65W",
    "categoria": "Acessórios",
    "preco": 199.90,
    "estoque": 35
  },
  {
    "id": 12,
    "descricao": "HD Externo Seagate 2TB",
    "categoria": "Armazenamento",
    "preco": 529.90,
    "estoque": 17
  }
]

app.get("/", (req, res) =>{
  res.send("lala")
})

app.get("/produtos", (req, res) =>{
  res.json(produtos)
})

app.get("/produtos/:id", (req, res) =>{
  const id = parseInt(req.params.id)
  const index = produtos.findIndex(prod => prod.id === id)
  if(index >= 0){
    res.json(produtos[index])
  }else{
    res.status(404).send("404 Not Found")
  }
})

app.post("/produtos", (req, res) =>{
  const novoProduto = {
    id: produtos.length + 1,
    descricao: req.body.descricao,
    preco: req.body.preco,
    categoria: req.body.categoria,
    estoque: req.body.estoque
  }
  produtos.push(novoProduto)
  res.status(201).json("Deu certo :)")
})

app.put("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const index = produtos.findIndex(p => p.id === id)
  const {descricao, preco, categoria, estoque} = req.body
  if(index === -1){
    res.status(404).json("404 Not Found")
  }

  if(descricao !== undefined){
    produtos[index].descricao = descricao
  }
  if(preco !== undefined){
    produtos[index].preco = preco
  }
  if(categoria !== undefined){
    produtos[index].categoria = categoria
  }
  if(estoque !== undefined){
    produtos[index].estoque = estoque
  }
  
  res.status(201).json("Deu certo :)")
})

app.delete("/produtos/:id", (req, res) =>{
  const id = parseInt(req.params.id)
  const produto = produtos.findIndex(p => p.id === id)
  if(produto === -1){
    return res.status(404).json("Error!")
  }
  
  const produtoDeletado = produtos.splice(produto, 1)
  res.status(200).json("Deletado :)")
})
const port = 80
app.listen(port, ()=> {
  console.log(`Server rodando no http://localhost:${port}`)
})