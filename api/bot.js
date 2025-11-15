// api/bot.js
// Серверная функция для Vercel.
// Telegram будет слать сюда обновления (webhook).

module.exports = async (req, res) => {
  // 1. Обрабатываем только POST-запросы от Telegram
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
    // ничего интересного, просто отвечаем OK
    return res.status(200).json({ ok: true });
  }

  const chatId = message.chat.id;
  const text = message.text || "";

  // URL мини-аппа — можно задать через переменную окружения,
  // иначе берём домен текущего проекта Vercel.
  const webAppUrl =
    process.env.WEBAPP_URL || `https://${req.headers.host}/`;

  // Обработка команды /start
  if (text.startsWith("/start")) {
    const replyText = "Жми кнопку, чтобы открыть каталог кальянных 👇";

    const payload = {
      chat_id: chatId,
      text: replyText,
      reply_markup: {
        keyboard: [
          [
            {
              text: "Открыть каталог кальянных",
              web_app: { url: webAppUrl }
            }
          ]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    };

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return res.status(200).json({ ok: true });
  }

  // На остальные сообщения можно пока не отвечать
  return res.status(200).json({ ok: true });
};
