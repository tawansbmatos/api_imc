const express = require('express'); //importando o express.
const app = express(); //atribuind o nome app para usar no lugar do express.
const port = 3000; // definindo a porta onde irá rodar a api.

app.use(express.json());

app.post('/calculadora-imc' , (req, res) => {
 const {peso, altura} = req.body;

//condição de validação
if(!peso || !altura){
    return res.status(400).json({ erro: 'Informe peso e altura.'});
}

const imc = peso / (altura * altura); //cálculo imc
let classification = ''; //onde será exibido a descrição de acordo com o peso.

if (imc < 18.5){ // condições 
    classification = 'Abaixo do peso';
}else if (imc < 24.9) {
    classification = 'Peso normal';
}else if (imc < 29.5){
    classification = 'Sobrepeso';
}else{
    classification = 'Obesidade';
}

res.json({imc: imc.toFixed(2), classification});

app.listen(port, () =>{
 console.log(`API rodando em http://localhost:${port}`);
});

});