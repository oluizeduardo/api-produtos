const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server running at ${port}`);
});

app.use(express.json());

const dataSource = {
    products: [
        { id: 1, description: "Arroz parboilizado 5Kg", value: 25.00, brand: "Tio João"  },
        { id: 2, description: "Maionese 250gr", value: 7.20, brand: "Helmans"  },
        { id: 3, description: "Iogurte Natural 200ml", value: 2.50, brand: "Itambis"  },
        { id: 4, description: "Batata Maior Palha 300gr", value: 15.20, brand: "Chipps"  },
        { id: 5, description: "Nescau 400gr", value: 8.00, brand: "Nestlis"  }
    ]
}


// Request log.
app.get('*', function(req, res, next){
    console.log(new Date().toLocaleString(), req.method, req.path );
    next();
})


// Post a new product.
app.post('/products', function (req, res) {    

    if(validateBodyFields(req, res)){
        dataSource.products.push(req.body);

        res.status(200)
            .json({
                message: "New product added!",
                product: req.body
            });
    }
})


// Get all products.
app.get('/products', function (req, res) {
    res.json(dataSource);
})


// Get a product based on its id.
app.get('/products/:id', function (req, res) {
    let id = convertTextToInt(req.params.id);
    let idx = getArrayIdByProductId(id);

    if(idx > -1){
        res.json(getProductFromList(idx));
    }else{
        treatResponse(res, 404, `Product with id ${id} was not found!`);
    }
})


// Update a product based on its id.
app.put('/products/:id', function (req, res) {
    let id = convertTextToInt(req.params.id);
    let idx = getArrayIdByProductId(id);

    if(validateBodyFields(req, res)){
        let product = getProductFromList(idx);        

        product.id = id;
        product.description = req.body.description;
        product.value = req.body.value;
        product.brand = req.body.brand;

        res.status(200)
            .json({
                message: `The product ${id} has been updated.`,
                product: product
            });
    }
})


// Delete a product based on its id.
app.delete('/products/:id', function (req, res) {
    let id = convertTextToInt(req.params.id);
    let idx = getArrayIdByProductId(id);

    if(idx > -1){

        const deletedProduct = removeProductFromList(idx);

        res.json({message : `The product ${id} has been deleted.`,
                  produto : deletedProduct});
    }else{
        treatResponse(res, 404, `Product with id ${id} was not found!`);
    }
})


function validateBodyFields(req, res){
    if(!req.body.id){
        treatResponse(res, 400, "Bad request! Field 'id' is required.");
        return false;
    }else{
        if(!req.body.description){
            treatResponse(res, 400, "Bad request! Field 'description' is required.");
            return false;
        }else{
            if(!req.body.value){
                treatResponse(res, 400, "Bad request! Field 'value' is required.");
                return false;
            }else{
                if(!req.body.brand){
                    treatResponse(res, 400, "Bad request! Field 'brand' is required.");
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
    return dataSource.products.findIndex(element => element.id == id);
}

function getProductFromList(index){
    return dataSource.products[index];
}

function removeProductFromList(index){
    return dataSource.products.splice(index, 1);
}

function treatResponse(res, returnCode, message){
    res.status(returnCode).json({message: message});
}