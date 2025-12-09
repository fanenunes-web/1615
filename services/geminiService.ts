import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real production build, ensure API_KEY is handled securely.
// For this demo, we assume the environment variable is injected.

let ai: GoogleGenAI | null = null;

try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.warn("Gemini API Key missing or invalid.");
}

export const generateVideoSummary = async (videoTitle: string, channelContext: string): Promise<string> => {
  if (!ai) return "Resumo indisponível (API Key não configurada).";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Gere um resumo curto, envolvente e atrativo (máximo de 3 linhas) para um novo vídeo do YouTube com o título "${videoTitle}" do canal "${channelContext}". O tom deve ser profissional e instigante.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Confira este novo episódio incrível!";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Confira este novo episódio incrível! (Erro ao gerar resumo IA)";
  }
};

export const generateNetworkAnalysis = async (podcastsData: string): Promise<string> => {
    if (!ai) return "Sistema Offline. Conecte a API Key para análise em tempo real.";

    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
            Atue como um Analista de Dados Sênior (Data Scientist) para a rede de podcasts '16.15 Studios'.
            Analise os seguintes dados brutos da rede:
            ${podcastsData}

            Forneça um relatório de inteligência de negócios "em tempo real" (curto, direto, estilo cyberpunk).
            O texto deve conter:
            1. Uma observação sobre o desempenho geral da rede.
            2. Uma tendência identificada baseada nas categorias.
            3. Uma recomendação estratégica curta.
            
            Use tom futurista, analítico e profissional. Máximo de 60 palavras. Não use formatação markdown, apenas texto corrido.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text || "Análise de rede indisponível no momento.";
    } catch (error) {
        console.error("Error generating analysis:", error);
        return "Erro na conexão neural. Impossível processar dados da rede.";
    }
}