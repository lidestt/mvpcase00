import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackQueryHandler, ContextTypes
from telegram.constants import ParseMode
import asyncio

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Токен вашего бота (замените на ваш)
TOKEN = "7923287286:AAEBSTz-dO4ns-tPxHXr-eA88hUPxk3N0UA"

# HTML-контент вашего приложения
def get_app_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Заменяем пути к CSS и JS на правильные
    html_content = html_content.replace(
        '<link rel="stylesheet" href="styles.css">',
        f'<style>\n{open("styles.css", "r", encoding="utf-8").read()}\n</style>'
    )
    
    html_content = html_content.replace(
        '<script src="app.js"></script>',
        f'<script>\n{open("app.js", "r", encoding="utf-8").read()}\n</script>'
    )
    
    return html_content

# Обработчик команды /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    
    keyboard = [
        [InlineKeyboardButton("🚀 Запустить StarsCase", callback_data="launch_app")],
        [InlineKeyboardButton("ℹ️ Помощь", callback_data="help"),
         InlineKeyboardButton("💎 Баланс", callback_data="balance")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = f"""
👋 Привет, {user.first_name}!

🎮 *StarsCase* - демо-приложение для открытия кейсов, игр и колеса удачи!

✨ *Возможности:*
• 🎁 Открытие разных типов кейсов
• 🎰 Колесо удачи со случайными призами
• 🎮 Мини-игры (Орёл/Решка и другие)
• ⬆️ Улучшения для персонализации
• 🎒 Инвентарь с коллекцией предметов

Нажми *"Запустить StarsCase"* чтобы начать!
"""
    
    await update.message.reply_text(
        welcome_text,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

# Обработчик callback-запросов
async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    
    if query.data == "launch_app":
        # Отправляем приложение как HTML-сообщение
        html_content = get_app_html()
        
        # Обрезаем сообщение если слишком длинное
        if len(html_content) > 4096:
            html_content = html_content[:4090] + "..."
        
        await query.message.reply_html(
            html_content,
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("🔄 Обновить", callback_data="launch_app"),
                 InlineKeyboardButton("🏠 На главную", callback_data="main_menu")]
            ])
        )
    
    elif query.data == "help":
        help_text = """
🤖 *Помощь по StarsCase*

🎮 *Как пользоваться:*
1. Нажми "Запустить StarsCase"
2. Откроется интерфейс приложения
3. Используй навигацию внизу для перехода между разделами

✨ *Особенности демо-режима:*
• 📱 Приложение работает в браузере
• 💰 Стартовый баланс: 100.4 ⭐
• 🎁 Доступны все кейсы в демо-режиме
• 🔄 Можно сбросить прогресс через консоль

🛠 *Команды в консоли (F12):*
• `addStars(amount)` - добавить звезды
• `resetDemo()` - сбросить демо-данные

📱 *Для работы в Telegram WebApp:*
Приложение автоматически определяет, запущено ли в Telegram
"""
        await query.message.reply_text(
            help_text,
            parse_mode=ParseMode.MARKDOWN,
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("🚀 Запустить приложение", callback_data="launch_app")]
            ])
        )
    
    elif query.data == "balance":
        # Здесь можно добавить реальный баланс из базы данных
        await query.message.reply_text(
            "💰 *Ваш текущий баланс:*\n"
            "Демо-режим: 100.4 ⭐\n\n"
            "Запустите приложение, чтобы увидеть актуальный баланс и начать играть!",
            parse_mode=ParseMode.MARKDOWN,
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("🎮 Запустить", callback_data="launch_app")]
            ])
        )
    
    elif query.data == "main_menu":
        await start(update, context)

# Обработчик текстовых сообщений
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text.lower()
    
    if text in ["привет", "hello", "start", "начать"]:
        await start(update, context)
    else:
        await update.message.reply_text(
            "Я не понимаю текстовые команды 😊\n"
            "Используйте кнопки меню или команду /start",
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("🚀 Запустить StarsCase", callback_data="launch_app")]
            ])
        )

# Обработчик ошибок
async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    logger.error(f"Ошибка: {context.error}")

# Основная функция
def main():
    # Создаем приложение
    application = Application.builder().token(TOKEN).build()
    
    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CallbackQueryHandler(button_handler))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    # Обработчик ошибок
    application.add_error_handler(error_handler)
    
    # Запускаем бота
    print("Бот запущен! Нажмите Ctrl+C для остановки.")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()