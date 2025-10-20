export default async function handler(req, res) {
    // Configurações de CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }


    // Só aceita POST
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido. Use POST.' });
    }

    // 🔧 Tratamento do body (Vercel não faz parsing automático em alguns casos)
    let body = {};
    try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (e) {
        return res.status(400).json({ erro: 'JSON inválido.' });
    }

    const { peso, altura } = body;

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

    // Retorna o resultado
    return res.status(200).json({
        imc: imc.toFixed(2),
        classificacao
    });
}
