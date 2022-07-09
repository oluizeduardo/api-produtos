const express = require('express');
const app = express();

app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000');
})

app.use(express.json());

const dataSource = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  }
    ]
}

// Post a new product.
app.post('/produtos', function (req, res) {    

    if(validateBodyFields(req, res)){
        dataSource.produtos.push(req.body);

        res.status(200)
            .json({
                message: "Novo produto adicionado!",
                produto: req.body
            });
    }
})


// Get all products.
app.get('/produtos', function (req, res) {
    res.json(dataSource);
})


// Get a product based on its id.
app.get('/produtos/:id', function (req, res) {
    let id = convertTextToInt(req.params.id);
    let idx = getArrayIdByProductId(id);

    if(idx > -1){
        res.json(getProductFromList(idx));
    }else{
        treatResponse(res, 404, "Produto não encontrado!");
    }
})


// Update a product based on its id.
app.put('/produtos/:id', function (req, res) {
    let id = convertTextToInt(req.params.id);
    let idx = getArrayIdByProductId(id);

    if(validateBodyFields(req, res)){
        let product = getProductFromList(idx);        

        product.id = id;
        product.descricao = req.body.descricao;
        product.valor = req.body.valor;
        product.marca = req.body.marca;

        res.status(200)
            .json({
                message: "Produto atualizado com sucesso",
                produto: product
            });
    }
})


// Delete a product based on its id.
app.delete('/produtos/:id', function (req, res) {
    let id = convertTextToInt(req.params.id);
    let idx = getArrayIdByProductId(id);

    if(idx > -1){

        const deletedProduct = removeProductFromList(idx);

        res.json({message : "Produto removido.",
                  produto : deletedProduct});
    }else{
        treatResponse(res, 404, "Produto não encontrado!");
    }
})


function validateBodyFields(req, res){
    if(!req.body.id){
        treatResponse(res, 400, "Bad request! Campo 'id' é obrigatório.");
        return false;
    }else{
        if(!req.body.descricao){
            treatResponse(res, 400, "Bad request! Campo 'descricao' é obrigatório.");
            return false;
        }else{
            if(!req.body.valor){
                treatResponse(res, 400, "Bad request! Campo 'valor' é obrigatório.");
                return false;
            }else{
                if(!req.body.marca){
                    treatResponse(res, 400, "Bad request! Campo 'marca' é obrigatório.");
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
}

function convertTextToInt(text){
    return Number.parseInt(text);
}

function getArrayIdByProductId(id){
    return dataSource.produtos.findIndex(element => element.id == id);
}

function getProductFromList(index){
    return dataSource.produtos[index];
}

function removeProductFromList(index){
    return dataSource.produtos.splice(index, 1);
}

function treatResponse(res, returnCode, message){
    res.status(returnCode).json({message: message});
}