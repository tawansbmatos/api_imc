module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido. Use POST.' });
  }

  const { peso, altura } = req.body;

  if (!peso || !altura) {
    return res.status(400).json({ erro: 'Informe peso e altura.' });
  }

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
};