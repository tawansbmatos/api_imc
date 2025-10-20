module.exports = async (req, res) => {
  // 1. Sempre defina os cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite qualquer domínio
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  // É crucial incluir o Content-Type aqui para o preflight request funcionar
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. Resposta para o preflight (OPTIONS request)
  if (req.method === 'OPTIONS') {
    // Apenas envia o status 200 e os cabeçalhos definidos acima
    return res.status(200).end();
  }

  // 3. Verifica se o método é POST (requisição real)
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido. Use POST.' });
  }

  // 4. Lógica principal
  try {
    const { peso, altura } = req.body;

    if (!peso || !altura) {
      return res.status(400).json({ erro: 'Informe peso e altura.' });
    }

    // Cálculo do IMC
    const imc = peso / (altura * altura);
    let classificacao = '';

    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 24.9) classificacao = 'Peso normal';
    else if (imc < 29.9) classificacao = 'Sobrepeso';
    else classificacao = 'Obesidade';

    return res.status(200).json({
      imc: imc.toFixed(2),
      classificacao
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
};
