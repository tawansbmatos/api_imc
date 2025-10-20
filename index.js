module.exports = async (req, res) => {
  // 1. Sempre defina os cabeçalhos CORS antes de qualquer retorno
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite qualquer domínio
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json'); // Garante que a resposta seja JSON

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
    // req.body é automaticamente preenchido pela Vercel/Node em requisições JSON POST
    const { peso, altura } = req.body;

    // Converte para float (embora o JS já faça isso automaticamente com as tags <input type="number">)
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (isNaN(p) || isNaN(a) || p <= 0 || a <= 0) {
      return res.status(400).json({ erro: 'Peso e altura devem ser números válidos e positivos.' });
    }

    // Cálculo do IMC
    const imc = p / (a * a);
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
    // Loga o erro interno para o console da Vercel (se necessário)
    console.error("Erro no processamento do IMC:", erro); 
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }