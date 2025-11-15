// api/bot.js
// Webhook для Telegram на Vercel

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("Нет TELEGRAM_BOT_TOKEN в переменных окружения");
    return res.status(500).json({ ok: false, error: "No bot token" });
  }

  const body = req.body;
  const message = body.message || body.edited_message;

  if (!message || !message.chat || !message.chat.id) {
    return res.status(200).json({ ok: true });
  }

  const chatId = message.chat.id;
  const text = message.text || "";

  const webAppUrl =
    process.env.WEBAPP_URL || `https://${req.headers.host}/`;

  if (text.startsWith("/start")) {
    const replyText = "Жми кнопку, чтобы открыть каталог кальянных 👇";

    const payload = {
      chat_id: chatId,
      text: replyText,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Открыть каталог кальянных",
              web_app: { url: webAppUrl }
            }
          ]
        ]
      }
    };

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return res.status(200).json({ ok: true });
  }

  return res.status(200).json({ ok: true });
};
