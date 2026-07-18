# Аудит пользовательского текста FORMIKA

Источник истины — текущие исходники проекта. Номера строк примерные и могут сдвигаться после последующих правок. Динамические части записаны как `{{variable}}`.

| Ключ перевода | Русский текст | Файл | Строка | Контекст |
|---|---|---|---|---|
| `brand.logoAlt` | Formika logo | `src/components/BrandLogo.tsx` | 32 | alt изображения |
| `brand.name` | FORMIKA | `src/components/LegalPage.tsx` | 34 | надзаголовок юридических страниц |
| `builderProgress.currentPrice` | Текущая стоимость | `src/components/BuilderProgress.tsx` | 16–27 | прогресс и текущая стоимость конструктора |
| `builderProgress.stepOfTotal` | Шаг {{step}} из {{total}} | `src/components/BuilderProgress.tsx` | 16–27 | прогресс и текущая стоимость конструктора |
| `catalog.accessoryOption` | Acc {{number}} | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.blackBatman` | Чёрный Бэтмен | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.blueShark` | Синяя акула | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.bottomOption` | BOTTOM-{{number}} | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.catOption` | Cat {{number}} | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.defaultFace` | По умолчанию | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.dogOption` | Dog {{number}} | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.faceOption` | face{{number}} | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.hairOption` | Hair {{number}} | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.heartOption` | Heart {{number}} | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.pinkBatman` | Розовый Бэтмен | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.pinkShark` | Розовая акула | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `catalog.topOption` | TOP-{{number}} | `src/lib/types.ts; src/lib/pricing.ts` | 240–452; 38–41 | динамическое название варианта, товара или alt |
| `characterEditor.accessoriesCategory` | Аксессуары | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.addCharacter` | Добавить человечка | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.bottomCategory` | Низ одежды | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.characterNameLabel` | Имя человечка | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | заголовок или подпись |
| `characterEditor.characterNumber` | Человечек {{number}} | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.chooseFromList` | Выберите вариант из списка | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.closeSelectionAria` | Закрыть выбор | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | aria-label |
| `characterEditor.delete` | Удалить | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.done` | Готово | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.dragAccessoryHint` | Перетащите аксессуар, чтобы разместить его в руке | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | описание или поясняющий текст |
| `characterEditor.faceCategory` | Лицо | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.faceNotSelected` | Лицо не выбрано | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.hairCategory` | Волосы | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.nameCategory` | Имя | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.namePlaceholder` | Введите имя | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | placeholder поля |
| `characterEditor.noAccessory` | Без аксессуара | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.noHair` | Без волос | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.notSelected` | Не выбрано | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.notSpecified` | Не указано | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.selectedCount` | {{count}} выбрано | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.selectedValue` | Выбрано: {{item}} | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.topCategory` | Верх одежды | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | редактор персонажа, поле, модальное окно, подсказка или ошибка |
| `characterEditor.validationError` | Выберите лицо для каждого персонажа. Волосы можно не добавлять. | `src/components/CharacterEditor.tsx; src/components/CharacterOptionModal.tsx; src/components/CharacterBuilder.tsx; src/lib/characterValidation.ts` | 25–280; 126–150; 130–223; 4 | сообщение об ошибке или toast |
| `common.addedPrice` | +{{price}} € | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.addedPriceCompact` | +{{price}}€ | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.back` | Назад | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.chooseOption` | Выбрать вариант | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.close` | Закрыть | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.createGift` | Создать подарок | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.createYourGift` | Создать свой подарок | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.delivery` | Доставка | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.details` | Подробнее | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.freePrice` | 0 € | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.itemNumber` | {{number}} | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.next` | Далее | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.notSelected` | не выбран | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.notSelectedNeuter` | не выбрано | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.order` | Заказать | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.orderViaTelegram` | Заказ через Telegram | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.ourWorks` | Наши работы | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.pickup` | Самовывоз | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.priceEuro` | {{price}} € | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.priceEuroCompact` | {{price}}€ | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.priceEuroPrefix` | €{{price}} | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.product` | Товар | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.productionTime` | Изготовление 1–7 дней | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.quantityPieces` | {{count}} шт. | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.selected` | Выбрано | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.showAll` | Посмотреть всё | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.stepNumber` | Шаг {{number}} | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.total` | Итого | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `common.withoutRegistration` | Без регистрации | `src/components/**/*.tsx, src/lib/types.ts` | разные | общая кнопка, подпись, цена или динамический шаблон |
| `contacts.communityTelegramHandle` | @formika_studio | `src/lib/contacts.ts` | 3–20 | контакт, название сервиса или видимый адрес |
| `contacts.email` | Email | `src/lib/contacts.ts` | 3–20 | контакт, название сервиса или видимый адрес |
| `contacts.emailAddress` | hello@formika.lv | `src/lib/contacts.ts` | 3–20 | контакт, название сервиса или видимый адрес |
| `contacts.facebook` | Facebook | `src/lib/contacts.ts` | 3–20 | контакт, название сервиса или видимый адрес |
| `contacts.instagram` | Instagram | `src/lib/contacts.ts` | 3–20 | контакт, название сервиса или видимый адрес |
| `contacts.instagramHandle` | @f0rmika.studio | `src/lib/contacts.ts` | 3–20 | контакт, название сервиса или видимый адрес |
| `contacts.orderTelegramHandle` | @f0rmika | `src/lib/contacts.ts` | 3–20 | контакт, название сервиса или видимый адрес |
| `contacts.telegram` | Telegram | `src/lib/contacts.ts` | 3–20 | контакт, название сервиса или видимый адрес |
| `contacts.tiktok` | TikTok | `src/lib/contacts.ts` | 3–20 | контакт, название сервиса или видимый адрес |
| `deliverySelector.deliveryDescription` | Добавим стоимость доставки к итоговой сумме. | `src/components/DeliveryMethodSelector.tsx; src/lib/pricing.ts` | 10–71; 22–27 | описание или поясняющий текст |
| `deliverySelector.instruction` | Выберите вариант перед отправкой заказа. | `src/components/DeliveryMethodSelector.tsx; src/lib/pricing.ts` | 10–71; 22–27 | выбор доставки, цена или обязательная подсказка |
| `deliverySelector.pickupDescription` | Самовывоз возможен в центре Риги, более точный адрес уточняется в личных сообщениях. | `src/components/DeliveryMethodSelector.tsx; src/lib/pricing.ts` | 10–71; 22–27 | описание или поясняющий текст |
| `deliverySelector.pickupTitle` | Забрать на месте | `src/components/DeliveryMethodSelector.tsx; src/lib/pricing.ts` | 10–71; 22–27 | заголовок или подпись |
| `deliverySelector.price` | €{{price}} | `src/components/DeliveryMethodSelector.tsx; src/lib/pricing.ts` | 10–71; 22–27 | выбор доставки, цена или обязательная подсказка |
| `deliverySelector.requiredHint` | Выберите доставку или самовывоз, чтобы оформить заказ. | `src/components/DeliveryMethodSelector.tsx; src/lib/pricing.ts` | 10–71; 22–27 | описание или поясняющий текст |
| `deliverySelector.title` | Способ получения | `src/components/DeliveryMethodSelector.tsx; src/lib/pricing.ts` | 10–71; 22–27 | заголовок или подпись |
| `footer.advantages` | Преимущества | `src/components/Footer.tsx` | 11–50 | футер, ссылка, заголовок или копирайт |
| `footer.builder` | Конструктор | `src/components/Footer.tsx` | 11–50 | футер, ссылка, заголовок или копирайт |
| `footer.copyright` | © {{year}} FORMIKA. Сделано с любовью в Латвии. | `src/components/Footer.tsx` | 11–50 | футер, ссылка, заголовок или копирайт |
| `footer.deliveryAndPayment` | Доставка и оплата | `src/components/Footer.tsx` | 11–50 | футер, ссылка, заголовок или копирайт |
| `footer.description` | Персонализированные LEGO-композиции и подарки ручной работы по вашим фотографиям. | `src/components/Footer.tsx` | 11–50 | описание или поясняющий текст |
| `footer.homeAria` | FORMIKA — на главную | `src/components/Footer.tsx` | 11–50 | aria-label |
| `footer.informationHeading` | Информация | `src/components/Footer.tsx` | 11–50 | заголовок или подпись |
| `footer.navigationHeading` | Навигация | `src/components/Footer.tsx` | 11–50 | заголовок или подпись |
| `footer.privacy` | Политика конфиденциальности | `src/components/Footer.tsx` | 11–50 | футер, ссылка, заголовок или копирайт |
| `footer.reviews` | Отзывы | `src/components/Footer.tsx` | 11–50 | футер, ссылка, заголовок или копирайт |
| `footer.socialsHeading` | Соцсети | `src/components/Footer.tsx` | 11–50 | заголовок или подпись |
| `footer.terms` | Условия заказа | `src/components/Footer.tsx` | 11–50 | футер, ссылка, заголовок или копирайт |
| `footer.works` | Наши работы | `src/components/Footer.tsx` | 11–50 | футер, ссылка, заголовок или копирайт |
| `frameBuilder.accessories.itemDescription` | Дополнительная деталь фона | `src/components/FrameBuilder/steps/AccessoriesStep.tsx` | 119–298 | описание или поясняющий текст |
| `frameBuilder.accessories.none` | Без деталей | `src/components/FrameBuilder/steps/AccessoriesStep.tsx` | 119–298 | карточка детали фона или кнопка |
| `frameBuilder.accessories.noneDescription` | Чистый фон без дополнительных элементов | `src/components/FrameBuilder/steps/AccessoriesStep.tsx` | 119–298 | описание или поясняющий текст |
| `frameBuilder.accessories.showAll` | Показать все детали | `src/components/FrameBuilder/steps/AccessoriesStep.tsx` | 119–298 | карточка детали фона или кнопка |
| `frameBuilder.background.customDescription` | Ваш рисунок, фотография или персональное оформление. | `src/components/FrameBuilder/steps/BackgroundStep.tsx` | 24–208 | описание или поясняющий текст |
| `frameBuilder.background.customPrice` | От +{{price}} € | `src/components/FrameBuilder/steps/BackgroundStep.tsx` | 24–208 | вариант фона, цена или пояснение |
| `frameBuilder.background.customTitle` | Индивидуальный фон | `src/components/FrameBuilder/steps/BackgroundStep.tsx` | 24–208 | заголовок или подпись |
| `frameBuilder.background.priceDisclaimer` | Финальная цена зависит от сложности изображения и согласовывается перед изготовлением. | `src/components/FrameBuilder/steps/BackgroundStep.tsx` | 24–208 | описание или поясняющий текст |
| `frameBuilder.background.priceHeading` | Стоимость индивидуального фона | `src/components/FrameBuilder/steps/BackgroundStep.tsx` | 24–208 | заголовок или подпись |
| `frameBuilder.background.whiteDescription` | Чистый светлый фон для аккуратной классической композиции. | `src/components/FrameBuilder/steps/BackgroundStep.tsx` | 24–208 | описание или поясняющий текст |
| `frameBuilder.background.whiteTitle` | Белый фон | `src/components/FrameBuilder/steps/BackgroundStep.tsx` | 24–208 | заголовок или подпись |
| `frameBuilder.characters.pricingNote` | Первый человечек включён в стоимость · каждый дополнительный +{{price}} € | `src/components/FrameBuilder/steps/CharactersStep.tsx` | 27–28 | описание или поясняющий текст |
| `frameBuilder.color.black` | Чёрная | `src/components/FrameBuilder/steps/ColorStep.tsx` | 14–149 | вариант цвета или подпись цены |
| `frameBuilder.color.blackDescription` | Глубокий матовый профиль | `src/components/FrameBuilder/steps/ColorStep.tsx` | 14–149 | описание или поясняющий текст |
| `frameBuilder.color.included` | Входит в стоимость | `src/components/FrameBuilder/steps/ColorStep.tsx` | 14–149 | вариант цвета или подпись цены |
| `frameBuilder.color.white` | Белая | `src/components/FrameBuilder/steps/ColorStep.tsx` | 14–149 | вариант цвета или подпись цены |
| `frameBuilder.color.whiteDescription` | Чистый светлый профиль | `src/components/FrameBuilder/steps/ColorStep.tsx` | 14–149 | описание или поясняющий текст |
| `frameBuilder.eyebrow` | Конструктор рамки | `src/components/FrameBuilder/index.tsx` | 375–461 | конструктор рамки, навигация или aria-label |
| `frameBuilder.hearts.addAria` | Добавить {{heart}} | `src/components/FrameBuilder/steps/HeartsStep.tsx` | 69–289 | aria-label |
| `frameBuilder.hearts.backgroundLabel` | На задний фон | `src/components/FrameBuilder/steps/HeartsStep.tsx` | 69–289 | заголовок или подпись |
| `frameBuilder.hearts.clear` | Очистить | `src/components/FrameBuilder/steps/HeartsStep.tsx` | 69–289 | выбор сердечек, цена, счётчик или aria-label |
| `frameBuilder.hearts.instruction` | Добавьте сердечки на задний фон | `src/components/FrameBuilder/steps/HeartsStep.tsx` | 69–289 | выбор сердечек, цена, счётчик или aria-label |
| `frameBuilder.hearts.pricingDescription` | Стоимость одного сердечка — {{price}}. Можно выбрать несколько вариантов. | `src/components/FrameBuilder/steps/HeartsStep.tsx` | 69–289 | описание или поясняющий текст |
| `frameBuilder.hearts.removeAria` | Убрать {{heart}} | `src/components/FrameBuilder/steps/HeartsStep.tsx` | 69–289 | aria-label |
| `frameBuilder.hearts.selectionSummary` | {{count}} шт. · {{price}} | `src/components/FrameBuilder/steps/HeartsStep.tsx` | 69–289 | выбор сердечек, цена, счётчик или aria-label |
| `frameBuilder.hearts.showAll` | Показать все сердечки | `src/components/FrameBuilder/steps/HeartsStep.tsx` | 69–289 | выбор сердечек, цена, счётчик или aria-label |
| `frameBuilder.lighting.clouds` | LED с облаками | `src/components/FrameBuilder/steps/LightingStep.tsx` | 31–208 | вариант подсветки, описание, цена или состояние |
| `frameBuilder.lighting.cloudsDescription` | Объёмный эффект неба и мягкий цветной свет | `src/components/FrameBuilder/steps/LightingStep.tsx` | 31–208 | описание или поясняющий текст |
| `frameBuilder.lighting.garland` | LED-гирлянда | `src/components/FrameBuilder/steps/LightingStep.tsx` | 31–208 | вариант подсветки, описание, цена или состояние |
| `frameBuilder.lighting.garlandDescription` | Тёплый мягкий свет по периметру рамки | `src/components/FrameBuilder/steps/LightingStep.tsx` | 31–208 | описание или поясняющий текст |
| `frameBuilder.lighting.none` | Без подсветки | `src/components/FrameBuilder/steps/LightingStep.tsx` | 31–208 | вариант подсветки, описание, цена или состояние |
| `frameBuilder.lighting.noneDescription` | Классическая композиция без дополнительного света | `src/components/FrameBuilder/steps/LightingStep.tsx` | 31–208 | описание или поясняющий текст |
| `frameBuilder.lighting.rgb` | LED RGB | `src/components/FrameBuilder/steps/LightingStep.tsx` | 31–208 | вариант подсветки, описание, цена или состояние |
| `frameBuilder.lighting.rgbDescription` | Многоцветная подсветка с пультом и режимами | `src/components/FrameBuilder/steps/LightingStep.tsx` | 31–208 | описание или поясняющий текст |
| `frameBuilder.pets.nameLabel` | Имя питомца | `src/components/FrameBuilder/steps/PetsStep.tsx` | 85–144 | заголовок или подпись |
| `frameBuilder.pets.namePlaceholder` | Введите имя | `src/components/FrameBuilder/steps/PetsStep.tsx` | 85–144 | placeholder поля |
| `frameBuilder.pets.namesDescription` | Поле необязательное. Имя можно добавить для персонализации заказа. | `src/components/FrameBuilder/steps/PetsStep.tsx` | 85–144 | описание или поясняющий текст |
| `frameBuilder.pets.namesTitle` | Имена питомцев | `src/components/FrameBuilder/steps/PetsStep.tsx` | 85–144 | заголовок или подпись |
| `frameBuilder.preview.dragHint` | Перетащите элементы | `src/components/FrameBuilder/Preview.tsx; src/components/FrameBuilder/steps/PreviewStep.tsx` | 329–611; 24–59 | описание или поясняющий текст |
| `frameBuilder.preview.emptyHint` | Добавьте элементы | `src/components/FrameBuilder/Preview.tsx; src/components/FrameBuilder/steps/PreviewStep.tsx` | 329–611; 24–59 | описание или поясняющий текст |
| `frameBuilder.preview.label` | Превью | `src/components/FrameBuilder/Preview.tsx; src/components/FrameBuilder/steps/PreviewStep.tsx` | 329–611; 24–59 | заголовок или подпись |
| `frameBuilder.preview.movementTip` | Двигать можно каждого человечка отдельно, а также сердечки, питомцев и детали фона. | `src/components/FrameBuilder/Preview.tsx; src/components/FrameBuilder/steps/PreviewStep.tsx` | 329–611; 24–59 | предпросмотр, инструкция или навигация |
| `frameBuilder.preview.rotationTip` | Сердечки можно поворачивать маленьким маркером после выбора. | `src/components/FrameBuilder/Preview.tsx; src/components/FrameBuilder/steps/PreviewStep.tsx` | 329–611; 24–59 | предпросмотр, инструкция или навигация |
| `frameBuilder.preview.screenshotTip` | Сделайте скриншот готового макета и отправьте его в Telegram вместе с заказом — так мы поймём, как примерно собрать вашу рамочку. | `src/components/FrameBuilder/Preview.tsx; src/components/FrameBuilder/steps/PreviewStep.tsx` | 329–611; 24–59 | предпросмотр, инструкция или навигация |
| `frameBuilder.preview.subtitle` | Перетащите человечков, сердечки и детали фона внутри рамки. | `src/components/FrameBuilder/Preview.tsx; src/components/FrameBuilder/steps/PreviewStep.tsx` | 329–611; 24–59 | описание или поясняющий текст |
| `frameBuilder.preview.tipLabel` | Подсказка:  | `src/components/FrameBuilder/Preview.tsx; src/components/FrameBuilder/steps/PreviewStep.tsx` | 329–611; 24–59 | заголовок или подпись |
| `frameBuilder.preview.title` | Соберите примерный макет | `src/components/FrameBuilder/Preview.tsx; src/components/FrameBuilder/steps/PreviewStep.tsx` | 329–611; 24–59 | заголовок или подпись |
| `frameBuilder.previousStepAria` | Вернуться на предыдущий шаг конструктора рамки | `src/components/FrameBuilder/index.tsx` | 375–461 | aria-label |
| `frameBuilder.previousStepUnavailableAria` | Предыдущего шага нет | `src/components/FrameBuilder/index.tsx` | 375–461 | aria-label |
| `frameBuilder.review.afterCopyHint` | После копирования заказа откройте Telegram и отправьте заявку нам. | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | описание или поясняющий текст |
| `frameBuilder.review.backgroundAccessoriesSummary` | Детали фона: {{accessories}} | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.backgroundSummary` | Фон: {{background}} | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.characterSummary` | Человечек {{number}} | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.clothesSummary` | Верх: {{top}} · Низ: {{bottom}} | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.copyErrorDescription` | Скопируйте текст заказа вручную или напишите нам в Telegram. | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | сообщение об ошибке или toast |
| `frameBuilder.review.copyErrorTitle` | Не удалось скопировать | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | сообщение об ошибке или toast |
| `frameBuilder.review.copyOrder` | Скопировать заказ | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.copySuccessDescription` | Детали заказа скопированы в буфер обмена. | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | описание или поясняющий текст |
| `frameBuilder.review.copySuccessTitle` | Скопировано! | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | заголовок или подпись |
| `frameBuilder.review.customBackgroundPrice` | от +5 €, цена может меняться от сложности | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.deliveryRequiredDescription` | Перед отправкой заказа выберите доставку или самовывоз. | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | описание или поясняющий текст |
| `frameBuilder.review.deliveryRequiredTitle` | Выберите способ получения | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | заголовок или подпись |
| `frameBuilder.review.faceHairSummary` | Лицо: {{face}} · Волосы: {{hair}} | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.finalPriceNotice` | Финальная цена подтверждается после согласования деталей в Telegram. | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | описание или поясняющий текст |
| `frameBuilder.review.frameSummary` | Рамка {{size}} ({{color}}) | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.handAccessoriesSummary` | Аксессуары в руки: {{accessories}} | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.heartsHeading` | Сердечки на фон | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | заголовок или подпись |
| `frameBuilder.review.included` | включён | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.includedPrice` | входит в стоимость | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.includesCharacter` | включает 1 человечка | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.lightingSummary` | Подсветка: {{lighting}} | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.nameSummary` | Имя: {{name}} | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.petNameSummary` |  · Имя: {{name}} | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.petsHeading` | Питомцы | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | заголовок или подпись |
| `frameBuilder.review.productLabel` | Товар: | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | заголовок или подпись |
| `frameBuilder.review.submitTelegram` | Отправить заявку в Telegram | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | итог заказа, toast, цена, кнопка или динамическая строка |
| `frameBuilder.review.totalLabel` | Итого: | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 62–239 | заголовок или подпись |
| `frameBuilder.size.classicVertical` | Классический вертикальный формат | `src/components/FrameBuilder/steps/SizeStep.tsx` | 17–101 | вариант размера, бейдж или цена |
| `frameBuilder.size.compactVertical` | Компактная вертикальная рамка | `src/components/FrameBuilder/steps/SizeStep.tsx` | 17–101 | вариант размера, бейдж или цена |
| `frameBuilder.size.dimension` | {{width}} × {{height}} | `src/components/FrameBuilder/steps/SizeStep.tsx` | 17–101 | вариант размера, бейдж или цена |
| `frameBuilder.size.horizontal` | Горизонтальный формат | `src/components/FrameBuilder/steps/SizeStep.tsx` | 17–101 | вариант размера, бейдж или цена |
| `frameBuilder.size.popular` | Популярный | `src/components/FrameBuilder/steps/SizeStep.tsx` | 17–101 | вариант размера, бейдж или цена |
| `frameBuilder.size.price` | {{price}} € | `src/components/FrameBuilder/steps/SizeStep.tsx` | 17–101 | вариант размера, бейдж или цена |
| `frameBuilder.steps.accessoriesSubtitle` | Выберите дополнительные элементы | `src/components/FrameBuilder/index.tsx` | 42–89 | описание или поясняющий текст |
| `frameBuilder.steps.accessoriesTitle` | Детали фона | `src/components/FrameBuilder/index.tsx` | 42–89 | заголовок или подпись |
| `frameBuilder.steps.backgroundSubtitle` | Выберите белый или индивидуальный фон | `src/components/FrameBuilder/index.tsx` | 42–89 | описание или поясняющий текст |
| `frameBuilder.steps.backgroundTitle` | Фон | `src/components/FrameBuilder/index.tsx` | 42–89 | заголовок или подпись |
| `frameBuilder.steps.charactersSubtitle` | Соберите персональные фигурки | `src/components/FrameBuilder/index.tsx` | 42–89 | описание или поясняющий текст |
| `frameBuilder.steps.charactersTitle` | Человечки | `src/components/FrameBuilder/index.tsx` | 42–89 | заголовок или подпись |
| `frameBuilder.steps.colorSubtitle` | Выберите чёрную или белую рамку | `src/components/FrameBuilder/index.tsx` | 42–89 | описание или поясняющий текст |
| `frameBuilder.steps.colorTitle` | Цвет рамки | `src/components/FrameBuilder/index.tsx` | 42–89 | заголовок или подпись |
| `frameBuilder.steps.heartsSubtitle` | Дополните композицию сердечками | `src/components/FrameBuilder/index.tsx` | 42–89 | описание или поясняющий текст |
| `frameBuilder.steps.heartsTitle` | Сердечки на фон | `src/components/FrameBuilder/index.tsx` | 42–89 | заголовок или подпись |
| `frameBuilder.steps.lightingSubtitle` | Добавьте подсветку к вашей композиции | `src/components/FrameBuilder/index.tsx` | 42–89 | описание или поясняющий текст |
| `frameBuilder.steps.lightingTitle` | Подсветка | `src/components/FrameBuilder/index.tsx` | 42–89 | заголовок или подпись |
| `frameBuilder.steps.petsSubtitle` | Добавьте питомцев в композицию | `src/components/FrameBuilder/index.tsx` | 42–89 | описание или поясняющий текст |
| `frameBuilder.steps.petsTitle` | Питомцы | `src/components/FrameBuilder/index.tsx` | 42–89 | заголовок или подпись |
| `frameBuilder.steps.previewSubtitle` | Расположите фигурки и детали внутри рамки | `src/components/FrameBuilder/index.tsx` | 42–89 | описание или поясняющий текст |
| `frameBuilder.steps.previewTitle` | Соберите примерный макет | `src/components/FrameBuilder/index.tsx` | 42–89 | заголовок или подпись |
| `frameBuilder.steps.reviewSubtitle` | Проверьте состав перед оформлением | `src/components/FrameBuilder/index.tsx` | 42–89 | описание или поясняющий текст |
| `frameBuilder.steps.reviewTitle` | Ваш заказ | `src/components/FrameBuilder/index.tsx` | 42–89 | заголовок или подпись |
| `frameBuilder.steps.sizeSubtitle` | Выберите подходящий формат композиции | `src/components/FrameBuilder/index.tsx` | 42–89 | описание или поясняющий текст |
| `frameBuilder.steps.sizeTitle` | Размер рамки | `src/components/FrameBuilder/index.tsx` | 42–89 | заголовок или подпись |
| `galleryModal.closeGalleryAria` | Закрыть галерею | `src/components/GalleryModal.tsx` | 208–331 | aria-label |
| `galleryModal.counter` | {{current}} / {{total}} | `src/components/GalleryModal.tsx` | 208–331 | модальное окно галереи, alt, счётчик или aria-label |
| `galleryModal.imageAlt` | {{title}} {{number}} | `src/components/GalleryModal.tsx` | 208–331 | alt изображения |
| `galleryModal.nextPhotoAria` | Следующее фото | `src/components/GalleryModal.tsx` | 208–331 | aria-label |
| `galleryModal.openPhotoAria` | Открыть фото {{number}} | `src/components/GalleryModal.tsx` | 208–331 | aria-label |
| `galleryModal.photoSelectorAria` | Выбор фотографии | `src/components/GalleryModal.tsx` | 208–331 | aria-label |
| `galleryModal.previousPhotoAria` | Предыдущее фото | `src/components/GalleryModal.tsx` | 208–331 | aria-label |
| `header.advantages` | Преимущества | `src/components/Navbar.tsx` | 26–850 | шапка, меню, переключатель языка или aria-label |
| `header.closeMenuAria` | Закрыть меню | `src/components/Navbar.tsx` | 26–850 | aria-label |
| `header.closeMobileMenuAria` | Закрыть мобильное меню | `src/components/Navbar.tsx` | 26–850 | aria-label |
| `header.home` | Главная | `src/components/Navbar.tsx` | 26–850 | шапка, меню, переключатель языка или aria-label |
| `header.homeAria` | FORMIKA — на главную | `src/components/Navbar.tsx` | 26–850 | aria-label |
| `header.languageEn` | EN | `src/components/Navbar.tsx` | 26–850 | шапка, меню, переключатель языка или aria-label |
| `header.languageHeading` | Язык | `src/components/Navbar.tsx` | 26–850 | заголовок или подпись |
| `header.languageLv` | LV | `src/components/Navbar.tsx` | 26–850 | шапка, меню, переключатель языка или aria-label |
| `header.languageRu` | RU | `src/components/Navbar.tsx` | 26–850 | шапка, меню, переключатель языка или aria-label |
| `header.languageSelectorAria` | Выбор языка | `src/components/Navbar.tsx` | 26–850 | aria-label |
| `header.navigationHeading` | Навигация | `src/components/Navbar.tsx` | 26–850 | заголовок или подпись |
| `header.openMenuAria` | Открыть меню | `src/components/Navbar.tsx` | 26–850 | aria-label |
| `header.reviews` | Отзывы | `src/components/Navbar.tsx` | 26–850 | шапка, меню, переключатель языка или aria-label |
| `header.socials` | Соцсети | `src/components/Navbar.tsx` | 26–850 | шапка, меню, переключатель языка или aria-label |
| `header.works` | Наши работы | `src/components/Navbar.tsx` | 26–850 | шапка, меню, переключатель языка или aria-label |
| `home.advantages.approvalDescription` | Заранее уточняем пожелания, стоимость, сроки и все важные детали. | `src/components/home/Advantages.tsx` | 14–54 | описание или поясняющий текст |
| `home.advantages.approvalTitle` | Согласование до сборки | `src/components/home/Advantages.tsx` | 14–54 | заголовок или подпись |
| `home.advantages.deliveryDescription` | Доставляем по Латвии и отправляем заказы в другие страны Европы. | `src/components/home/Advantages.tsx` | 14–54 | описание или поясняющий текст |
| `home.advantages.deliveryTitle` | Доставка по Европе | `src/components/home/Advantages.tsx` | 14–54 | заголовок или подпись |
| `home.advantages.eyebrow` | Почему выбирают FORMIKA | `src/components/home/Advantages.tsx` | 14–54 | секция преимуществ или карточка |
| `home.advantages.photoDescription` | Подбираем внешность, одежду и детали персонажей под вашу историю. | `src/components/home/Advantages.tsx` | 14–54 | описание или поясняющий текст |
| `home.advantages.photoTitle` | По вашей фотографии | `src/components/home/Advantages.tsx` | 14–54 | заголовок или подпись |
| `home.advantages.productionDescription` | Срок зависит от сложности композиции и выбранного оформления. | `src/components/home/Advantages.tsx` | 14–54 | описание или поясняющий текст |
| `home.advantages.productionTitle` | Изготовление 1–7 дней | `src/components/home/Advantages.tsx` | 14–54 | заголовок или подпись |
| `home.advantages.subtitle` | Простой и понятный процесс — от вашей идеи до готового подарка. | `src/components/home/Advantages.tsx` | 14–54 | описание или поясняющий текст |
| `home.advantages.title` | Наши преимущества | `src/components/home/Advantages.tsx` | 14–54 | заголовок или подпись |
| `home.community.description` | Подписывайтесь, чтобы видеть новые композиции, детали процесса и свежие идеи для персональных подарков. | `src/components/home/CommunityCTA.tsx` | 8–124 | описание или поясняющий текст |
| `home.community.eyebrow` | FORMIKA в соцсетях | `src/components/home/CommunityCTA.tsx` | 8–124 | социальная секция, ссылка или aria-label |
| `home.community.openSocialAria` | Открыть {{social}} | `src/components/home/CommunityCTA.tsx` | 8–124 | aria-label |
| `home.community.subtitle` | Новые работы, идеи подарков и процесс создания — в наших социальных сетях. | `src/components/home/CommunityCTA.tsx` | 8–124 | описание или поясняющий текст |
| `home.community.title` | Присоединяйтесь к сообществу FORMIKA | `src/components/home/CommunityCTA.tsx` | 8–124 | заголовок или подпись |
| `home.finalCta.accent` | вашу историю | `src/components/home/FinalCTA.tsx` | 39–83 | финальный CTA-блок |
| `home.finalCta.eyebrow` | Ваша история — в деталях | `src/components/home/FinalCTA.tsx` | 39–83 | финальный CTA-блок |
| `home.finalCta.subtitle` | Выберите детали композиции, а мы аккуратно создадим ваш персональный подарок. | `src/components/home/FinalCTA.tsx` | 39–83 | описание или поясняющий текст |
| `home.finalCta.title` | Создайте подарок,<br>который расскажет | `src/components/home/FinalCTA.tsx` | 39–83 | заголовок или подпись |
| `home.hero.accent` | вашу историю | `src/components/home/Hero.tsx` | 43–217 | главный экран, CTA, бейдж или alt изображения |
| `home.hero.approvalBadge` | Согласование перед изготовлением | `src/components/home/Hero.tsx` | 43–217 | главный экран, CTA, бейдж или alt изображения |
| `home.hero.deliveryBadge` | Доставка по Латвии и Европе | `src/components/home/Hero.tsx` | 43–217 | главный экран, CTA, бейдж или alt изображения |
| `home.hero.exampleImageAlt` | Пример персональной работы FORMIKA | `src/components/home/Hero.tsx` | 43–217 | alt изображения |
| `home.hero.eyebrow` | Персонализированные LEGO-композиции | `src/components/home/Hero.tsx` | 43–217 | главный экран, CTA, бейдж или alt изображения |
| `home.hero.handmadeBadge` | Ручная сборка | `src/components/home/Hero.tsx` | 43–217 | главный экран, CTA, бейдж или alt изображения |
| `home.hero.lightingImageAlt` | FORMIKA LEGO-композиция с подсветкой | `src/components/home/Hero.tsx` | 43–217 | alt изображения |
| `home.hero.mobileImageAlt` | Персональная LEGO-композиция FORMIKA | `src/components/home/Hero.tsx` | 43–217 | alt изображения |
| `home.hero.photoPersonalizationBadge` | Персонализация по фото | `src/components/home/Hero.tsx` | 43–217 | главный экран, CTA, бейдж или alt изображения |
| `home.hero.subtitle` | Создаём персональные рамки и брелоки по вашим фотографиям — с фигурками, аксессуарами, надписями и подсветкой. | `src/components/home/Hero.tsx` | 43–217 | описание или поясняющий текст |
| `home.hero.title` | Подарок, который<br>рассказывает | `src/components/home/Hero.tsx` | 43–217 | заголовок или подпись |
| `home.lighting.cloudsDescription` | Объёмный эффект облаков и мягкое рассеянное свечение | `src/components/home/LightingOptions.tsx` | 38–139 | описание или поясняющий текст |
| `home.lighting.cloudsModalDescription` | Объёмный декоративный эффект с мягким рассеиванием света. Выглядит более необычно и ярко. | `src/components/home/LightingOptions.tsx` | 38–139 | описание или поясняющий текст |
| `home.lighting.cloudsTitle` | LED с облаками | `src/components/home/LightingOptions.tsx` | 38–139 | заголовок или подпись |
| `home.lighting.eyebrow` | Атмосфера в деталях | `src/components/home/LightingOptions.tsx` | 38–139 | карточка подсветки, модальное описание или aria-label |
| `home.lighting.garlandDescription` | Тёплый уютный свет от гирлянды | `src/components/home/LightingOptions.tsx` | 38–139 | описание или поясняющий текст |
| `home.lighting.garlandModalDescription` | Тёплый уютный свет с одним режимом свечения. Подходит для мягкой домашней атмосферы. | `src/components/home/LightingOptions.tsx` | 38–139 | описание или поясняющий текст |
| `home.lighting.garlandTitle` | LED-гирлянда | `src/components/home/LightingOptions.tsx` | 38–139 | заголовок или подпись |
| `home.lighting.openGalleryAria` | Открыть галерею {{title}} | `src/components/home/LightingOptions.tsx` | 38–139 | aria-label |
| `home.lighting.rgbDescription` | Подсветка с разными цветами и режимами | `src/components/home/LightingOptions.tsx` | 38–139 | описание или поясняющий текст |
| `home.lighting.rgbModalDescription` | Яркая цветная подсветка. Подходит, если хочется более заметный эффект и возможность разных оттенков. | `src/components/home/LightingOptions.tsx` | 38–139 | описание или поясняющий текст |
| `home.lighting.rgbTitle` | LED RGB | `src/components/home/LightingOptions.tsx` | 38–139 | заголовок или подпись |
| `home.lighting.subtitle` | Выберите атмосферу вашей композиции | `src/components/home/LightingOptions.tsx` | 38–139 | описание или поясняющий текст |
| `home.lighting.title` | Варианты подсветки | `src/components/home/LightingOptions.tsx` | 38–139 | заголовок или подпись |
| `home.orderProcess.approveDescription` | Уточняем пожелания, стоимость, сроки и способ получения заказа. | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | описание или поясняющий текст |
| `home.orderProcess.approveTitle` | Согласовываем детали | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | заголовок или подпись |
| `home.orderProcess.chooseDescription` | Подбираете композицию, персонажей и дополнительные детали. | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | описание или поясняющий текст |
| `home.orderProcess.chooseTitle` | Выбираете формат подарка | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | заголовок или подпись |
| `home.orderProcess.createDescription` | После согласования и предоплаты аккуратно собираем ваш подарок. | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | описание или поясняющий текст |
| `home.orderProcess.createTitle` | Создаём композицию | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | заголовок или подпись |
| `home.orderProcess.eyebrow` | Этапы создания | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | этап оформления заказа |
| `home.orderProcess.handoverDescription` | Самовывоз или доставка по Латвии и другим странам Европы. | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | описание или поясняющий текст |
| `home.orderProcess.handoverTitle` | Передаём готовый заказ | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | заголовок или подпись |
| `home.orderProcess.submitDescription` | Готовая заявка отправляется нам через Telegram. | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | описание или поясняющий текст |
| `home.orderProcess.submitTitle` | Отправляете заявку | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | заголовок или подпись |
| `home.orderProcess.subtitle` | От идеи до готовой композиции — просто и понятно. | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | описание или поясняющий текст |
| `home.orderProcess.title` | Как мы создаём ваш подарок | `src/components/home/OrderProcess.tsx` | 22–52, 103, 401–403 | заголовок или подпись |
| `home.otherProducts.customDescription` | Брелок с человечком, которого можно собрать под себя. | `src/components/home/OtherProducts.tsx` | 39–176 | описание или поясняющий текст |
| `home.otherProducts.customModalDescription` | Брелок с человечком, которого можно собрать под себя — лицо, причёска, одежда и аксессуары на ваш вкус. | `src/components/home/OtherProducts.tsx` | 39–176 | описание или поясняющий текст |
| `home.otherProducts.customTitle` | Кастомные брелочки | `src/components/home/OtherProducts.tsx` | 39–176 | заголовок или подпись |
| `home.otherProducts.eyebrow` | Больше идей для подарка | `src/components/home/OtherProducts.tsx` | 39–176 | карточка другого товара, модальное описание или aria-label |
| `home.otherProducts.openGalleryAria` | Открыть галерею {{title}} | `src/components/home/OtherProducts.tsx` | 39–176 | aria-label |
| `home.otherProducts.readyDescription` | Готовые модели, которые можно заказать сразу. | `src/components/home/OtherProducts.tsx` | 39–176 | описание или поясняющий текст |
| `home.otherProducts.readyModalDescription` | Готовые модели FORMIKA, которые можно заказать сразу. Отличный небольшой подарок или дополнение к рамке. | `src/components/home/OtherProducts.tsx` | 39–176 | описание или поясняющий текст |
| `home.otherProducts.readyTitle` | Готовые брелочки | `src/components/home/OtherProducts.tsx` | 39–176 | заголовок или подпись |
| `home.otherProducts.title` | Другие товары FORMIKA | `src/components/home/OtherProducts.tsx` | 39–176 | заголовок или подпись |
| `home.personalization.accent` | Персонализировать | `src/components/home/Personalization.tsx` | 24–60, 399–419 | секция персонализации или пункт списка |
| `home.personalization.accessoriesDescription` | Добавьте хобби, профессию и важные детали истории. | `src/components/home/Personalization.tsx` | 24–60, 399–419 | описание или поясняющий текст |
| `home.personalization.accessoriesTitle` | Аксессуары | `src/components/home/Personalization.tsx` | 24–60, 399–419 | заголовок или подпись |
| `home.personalization.backgroundDescription` | Подберите оформление под событие и настроение. | `src/components/home/Personalization.tsx` | 24–60, 399–419 | описание или поясняющий текст |
| `home.personalization.backgroundTitle` | Фон | `src/components/home/Personalization.tsx` | 24–60, 399–419 | заголовок или подпись |
| `home.personalization.charactersDescription` | Один человек, пара, семья или компания друзей. | `src/components/home/Personalization.tsx` | 24–60, 399–419 | описание или поясняющий текст |
| `home.personalization.charactersTitle` | Количество персонажей | `src/components/home/Personalization.tsx` | 24–60, 399–419 | заголовок или подпись |
| `home.personalization.clothesDescription` | Выберите стиль, цвета и образ каждого персонажа. | `src/components/home/Personalization.tsx` | 24–60, 399–419 | описание или поясняющий текст |
| `home.personalization.clothesTitle` | Одежда | `src/components/home/Personalization.tsx` | 24–60, 399–419 | заголовок или подпись |
| `home.personalization.eyebrow` | Кастомизация без границ | `src/components/home/Personalization.tsx` | 24–60, 399–419 | секция персонализации или пункт списка |
| `home.personalization.facesHairDescription` | Подберём внешность, подходящую под ваши фотографии. | `src/components/home/Personalization.tsx` | 24–60, 399–419 | описание или поясняющий текст |
| `home.personalization.facesHairTitle` | Лица и причёски | `src/components/home/Personalization.tsx` | 24–60, 399–419 | заголовок или подпись |
| `home.personalization.inscriptionDescription` | Добавьте имена, дату или личное пожелание. | `src/components/home/Personalization.tsx` | 24–60, 399–419 | описание или поясняющий текст |
| `home.personalization.inscriptionTitle` | Надпись | `src/components/home/Personalization.tsx` | 24–60, 399–419 | заголовок или подпись |
| `home.personalization.lightingDescription` | Выберите тёплый свет, RGB или эффект облаков. | `src/components/home/Personalization.tsx` | 24–60, 399–419 | описание или поясняющий текст |
| `home.personalization.lightingTitle` | Подсветка | `src/components/home/Personalization.tsx` | 24–60, 399–419 | заголовок или подпись |
| `home.personalization.petsDescription` | Разместите рядом любимого домашнего питомца. | `src/components/home/Personalization.tsx` | 24–60, 399–419 | описание или поясняющий текст |
| `home.personalization.petsTitle` | Питомцы | `src/components/home/Personalization.tsx` | 24–60, 399–419 | заголовок или подпись |
| `home.personalization.subtitle` | Каждую композицию можно настроить под вашу историю — от внешности персонажей до фона, надписи и подсветки. | `src/components/home/Personalization.tsx` | 24–60, 399–419 | описание или поясняющий текст |
| `home.personalization.title` | Что можно | `src/components/home/Personalization.tsx` | 24–60, 399–419 | заголовок или подпись |
| `home.reviews.anyaName` | Аня | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.anyaOrder` | Рамочка для пары | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.anyaText` | Заказывала подарок на годовщину. Получилось очень лично и красиво, все детали подобрали именно под нас. | `src/components/home/Reviews.tsx` | 14–187 | описание или поясняющий текст |
| `home.reviews.dianaName` | Диана | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.dianaOrder` | Рамочка с облаками | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.dianaText` | Эффект облаков и цветная подсветка выглядят очень атмосферно. Вживую ещё красивее. | `src/components/home/Reviews.tsx` | 14–187 | описание или поясняющий текст |
| `home.reviews.elenaName` | Елена | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.elenaOrder` | Персональная рамочка | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.elenaText` | Быстро обсудили детали и сделали композицию именно по нашей фотографии. | `src/components/home/Reviews.tsx` | 14–187 | описание или поясняющий текст |
| `home.reviews.eyebrow` | Истории наших клиентов | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.hide` | Скрыть | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.kristinaName` | Кристина | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.kristinaOrder` | Рамочка с LED RGB | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.kristinaText` | Подсветка имеет разные цвета и режимы. Подарок получился ярким и необычным. | `src/components/home/Reviews.tsx` | 14–187 | описание или поясняющий текст |
| `home.reviews.lizaName` | Лиза | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.lizaOrder` | Кастомный брелок | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.lizaText` | Брелочек получился очень милым и похожим на человека, для которого я его заказывала. | `src/components/home/Reviews.tsx` | 14–187 | описание или поясняющий текст |
| `home.reviews.mariaName` | Мария | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.mariaOrder` | Рамочка с LED-гирляндой | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.mariaText` | Очень аккуратная работа. Тёплая подсветка вечером выглядит невероятно уютно. | `src/components/home/Reviews.tsx` | 14–187 | описание или поясняющий текст |
| `home.reviews.olgaName` | Ольга | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.olgaOrder` | Подарочная рамочка | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.olgaText` | Заказ пришёл аккуратно упакованным. Всё выглядело красиво и было готово вовремя. | `src/components/home/Reviews.tsx` | 14–187 | описание или поясняющий текст |
| `home.reviews.ratingAria` | Оценка: пять из пяти | `src/components/home/Reviews.tsx` | 14–187 | aria-label |
| `home.reviews.ratingValue` | 5.0 | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.showMore` | Посмотреть ещё | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.sofiaName` | София | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.sofiaOrder` | Семейная рамочка | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.sofiaText` | Понравилось, что можно было добавить всех членов семьи, питомца и важную для нас дату. | `src/components/home/Reviews.tsx` | 14–187 | описание или поясняющий текст |
| `home.reviews.subtitle` | Тёплые слова о персональных подарках, созданных в FORMIKA. | `src/components/home/Reviews.tsx` | 14–187 | описание или поясняющий текст |
| `home.reviews.title` | Отзывы клиентов | `src/components/home/Reviews.tsx` | 14–187 | заголовок или подпись |
| `home.reviews.victoriaName` | Виктория | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.victoriaOrder` | Рамочка для пары | `src/components/home/Reviews.tsx` | 14–187 | отзыв, имя клиента, тип заказа, рейтинг или кнопка |
| `home.reviews.victoriaText` | Очень понравилась детализация фигурок и то, как внимательно отнеслись к нашим пожеланиям. | `src/components/home/Reviews.tsx` | 14–187 | описание или поясняющий текст |
| `home.works.coupleDescription` | Ваша общая история, воплощённая в маленьких деталях. | `src/components/home/WorksGallery.tsx` | 33–241 | описание или поясняющий текст |
| `home.works.coupleModalDescription` | Подарок для годовщины, свадьбы, предложения или важного момента вдвоём. Можно добавить имена, дату, питомца и детали вашей истории. | `src/components/home/WorksGallery.tsx` | 33–241 | описание или поясняющий текст |
| `home.works.coupleTitle` | Для пары | `src/components/home/WorksGallery.tsx` | 33–241 | заголовок или подпись |
| `home.works.eyebrow` | Примеры наших работ | `src/components/home/WorksGallery.tsx` | 33–241 | секция работ, карточка, модальное описание или CTA |
| `home.works.familyDescription` | Тёплый подарок для семьи, детей и самых близких. | `src/components/home/WorksGallery.tsx` | 33–241 | описание или поясняющий текст |
| `home.works.familyModalDescription` | Тёплая композиция для семьи, детей, родителей и домашних питомцев. Хорошо подходит для семейных праздников и памятных подарков. | `src/components/home/WorksGallery.tsx` | 33–241 | описание или поясняющий текст |
| `home.works.familyTitle` | Семейные | `src/components/home/WorksGallery.tsx` | 33–241 | заголовок или подпись |
| `home.works.instagramButton` | Смотреть Instagram | `src/components/home/WorksGallery.tsx` | 33–241 | секция работ, карточка, модальное описание или CTA |
| `home.works.instagramDescription` | Новые композиции, детали создания и идеи для подарков. | `src/components/home/WorksGallery.tsx` | 33–241 | описание или поясняющий текст |
| `home.works.instagramTitle` | Больше работ — в нашем Instagram | `src/components/home/WorksGallery.tsx` | 33–241 | заголовок или подпись |
| `home.works.personalDescription` | Уникальная композиция, созданная по вашей фотографии. | `src/components/home/WorksGallery.tsx` | 33–241 | описание или поясняющий текст |
| `home.works.personalModalDescription` | Композиции для одного человека, хобби, профессии или особенного образа. Можно добавить имя, дату, питомца, аксессуары и подсветку. | `src/components/home/WorksGallery.tsx` | 33–241 | описание или поясняющий текст |
| `home.works.personalTitle` | Персональные | `src/components/home/WorksGallery.tsx` | 33–241 | заголовок или подпись |
| `home.works.subtitle` | Персональные композиции, созданные по фотографиям и историям наших клиентов. | `src/components/home/WorksGallery.tsx` | 33–241 | описание или поясняющий текст |
| `home.works.title` | Наши работы | `src/components/home/WorksGallery.tsx` | 33–241 | заголовок или подпись |
| `home.works.weddingDescription` | Памятная рамочка с вашей парой, датой и именами. | `src/components/home/WorksGallery.tsx` | 33–241 | описание или поясняющий текст |
| `home.works.weddingModalDescription` | Создаём нежные рамочки со свадебными фигурками — с вашей парой, датой, именами и важными деталями истории. Если хотите именно свадебные фигурки, напишите нам в Telegram: мы подскажем, какие варианты есть в наличии. | `src/components/home/WorksGallery.tsx` | 33–241 | описание или поясняющий текст |
| `home.works.weddingTitle` | Свадебные композиции | `src/components/home/WorksGallery.tsx` | 33–241 | заголовок или подпись |
| `keychainBuilder.backToOptions` | Назад к вариантам | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.buildCharacterError` | Соберите хотя бы одного человечка. | `src/components/CustomProductBuilder.tsx` | 77–891 | сообщение об ошибке или toast |
| `keychainBuilder.charactersSummary` | Человечки | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.chooseReadyError` | Выберите хотя бы один брелок. | `src/components/CustomProductBuilder.tsx` | 77–891 | сообщение об ошибке или toast |
| `keychainBuilder.copyErrorDescription` | Попробуйте скопировать заказ ещё раз. | `src/components/CustomProductBuilder.tsx` | 77–891 | сообщение об ошибке или toast |
| `keychainBuilder.copyErrorTitle` | Не удалось скопировать | `src/components/CustomProductBuilder.tsx` | 77–891 | сообщение об ошибке или toast |
| `keychainBuilder.copyOrder` | Скопировать заказ | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.copySuccessDescription` | Заказ скопирован в буфер | `src/components/CustomProductBuilder.tsx` | 77–891 | описание или поясняющий текст |
| `keychainBuilder.copySuccessTitle` | Скопировано | `src/components/CustomProductBuilder.tsx` | 77–891 | заголовок или подпись |
| `keychainBuilder.customOrderName` | Кастомный брелок | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.customSubtitle` | Соберите человечка в общем редакторе | `src/components/CustomProductBuilder.tsx` | 77–891 | описание или поясняющий текст |
| `keychainBuilder.customTitle` | Создать свой брелок | `src/components/CustomProductBuilder.tsx` | 77–891 | заголовок или подпись |
| `keychainBuilder.decreaseQuantityAria` | Уменьшить количество {{item}} | `src/components/CustomProductBuilder.tsx` | 77–891 | aria-label |
| `keychainBuilder.deliveryMissingHint` | Выберите способ получения. | `src/components/CustomProductBuilder.tsx` | 77–891 | описание или поясняющий текст |
| `keychainBuilder.deliveryRequiredDescription` | Перед отправкой заказа выберите доставку или самовывоз. | `src/components/CustomProductBuilder.tsx` | 77–891 | описание или поясняющий текст |
| `keychainBuilder.deliveryRequiredTitle` | Выберите способ получения | `src/components/CustomProductBuilder.tsx` | 77–891 | заголовок или подпись |
| `keychainBuilder.editorPrice` | Общий редактор персонажа · {{price}} за человечка | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.emptyOrder` | Пока ничего не выбрано | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.eyebrow` | Конструктор брелока | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.increaseQuantityAria` | Увеличить количество {{item}} | `src/components/CustomProductBuilder.tsx` | 77–891 | aria-label |
| `keychainBuilder.openTelegram` | Открыть Telegram | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.orderDescription` | Проверьте выбранные товары перед отправкой. | `src/components/CustomProductBuilder.tsx` | 77–891 | описание или поясняющий текст |
| `keychainBuilder.orderHeading` | Ваш заказ | `src/components/CustomProductBuilder.tsx` | 77–891 | заголовок или подпись |
| `keychainBuilder.petsDescription` | Выберите питомца для общей композиции товара. | `src/components/CustomProductBuilder.tsx` | 77–891 | описание или поясняющий текст |
| `keychainBuilder.petsTitle` | Питомцы | `src/components/CustomProductBuilder.tsx` | 77–891 | заголовок или подпись |
| `keychainBuilder.productType` | Тип товара | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.readyInstruction` | Выберите модель и укажите количество. | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.readyOrderName` | Готовые брелки | `src/components/CustomProductBuilder.tsx` | 77–891 | конструктор брелока, карточка, итог, toast, ошибка или aria-label |
| `keychainBuilder.readySubtitle` | Выберите готовый брелок из каталога | `src/components/CustomProductBuilder.tsx` | 77–891 | описание или поясняющий текст |
| `keychainBuilder.readyTitle` | Готовые брелки | `src/components/CustomProductBuilder.tsx` | 77–891 | заголовок или подпись |
| `keychainBuilder.sharedEditorNote` | Один редактор персонажа используется для рамок и брелков. | `src/components/CustomProductBuilder.tsx` | 77–891 | описание или поясняющий текст |
| `keychainBuilder.subtitle` | Выберите готовые брелки или кастомную сборку. | `src/components/CustomProductBuilder.tsx` | 77–891 | описание или поясняющий текст |
| `keychainBuilder.title` | Брелки | `src/components/CustomProductBuilder.tsx` | 77–891 | заголовок или подпись |
| `legal.backHome` | Назад на главную | `src/components/LegalPage.tsx` | 29 | ссылка возврата |
| `legal.delivery.afterReadyText` | Оставшаяся часть оплачивается после завершения изготовления заказа. | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.afterReadyTitle` | После готовности | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.applicationText` | Вы собираете композицию на сайте и отправляете заказ. | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.applicationTitle` | Заявка | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.approvalText` | Мы уточняем детали, наличие элементов и финальную стоимость. | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.approvalTitle` | Согласование | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.beforeWorkText` | Первая часть оплаты вносится после подтверждения деталей и стоимости заказа. | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.beforeWorkTitle` | Перед началом работы | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.costLabel` | Стоимость | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.costValue` | 4,50 € | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.deliveryTitle` | Доставка | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.halfPayment` | 50% | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.intro` | Все детали заказа согласовываются лично в Telegram. Перед изготовлением мы подтверждаем комплектацию, стоимость и сроки. | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.latviaText` | Способ получения и данные доставки подтверждаются при согласовании заказа в Telegram. | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.latviaTitle` | Доставка по Латвии | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.orderButton` | Оформить заказ | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.paymentTitle` | Оплата | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.processTitle` | Как проходит оформление | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.productionText` | После подтверждения начинаем создавать ваш заказ. | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.productionTimeText` | Точный срок зависит от сложности композиции, количества фигурок и наличия выбранных деталей. | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.productionTimeTitle` | Срок изготовления | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.productionTimeValue` | Обычно от 1 до 7 дней | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.productionTitle` | Изготовление | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.delivery.title` | Доставка и оплата | `src/pages/delivery.tsx` | 16–202 | страница доставки и оплаты |
| `legal.privacy.changeDeleteText` | Вы можете запросить изменение или удаление своих данных. Напишите нам в Telegram или Instagram, и мы рассмотрим ваш запрос. | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.changeDeleteTitle` | Изменение или удаление данных | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.contactTitle` | Связаться с FORMIKA | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.dataText` | FORMIKA может получать ваше имя, имя пользователя в Telegram, номер телефона, адрес доставки и комментарии к заказу. | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.dataTitle` | Какие данные мы можем обрабатывать | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.finishedPhotosText` | Фотографии готовых изделий публикуются на сайте или в социальных сетях только с согласия клиента. Если вы не хотите публикацию, сообщите об этом при согласовании заказа. | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.finishedPhotosTitle` | Фото готовых работ | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.intro` | Мы бережно относимся к личной информации клиентов и используем её только для подготовки, изготовления и передачи заказа. | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.orderDataText` | Используются для связи, уточнения деталей, изготовления изделия и организации доставки. | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.orderDataTitle` | Данные заказа | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.photosText` | Используются только для создания персонализированного изделия по вашему заказу. | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.photosTitle` | Фотографии и материалы | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.sharingText` | FORMIKA не продаёт персональные данные и не передаёт их третьим лицам для рекламы. Информация может использоваться только для выполнения заказа, связи с клиентом и организации доставки. | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.sharingTitle` | Передача данных | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.privacy.title` | Политика конфиденциальности | `src/pages/privacy-policy.tsx` | 30–128 | страница политики конфиденциальности |
| `legal.terms.afterApprovalText` | Отправленная заявка ещё не является окончательно подтверждённым заказом. Сначала мы проверяем возможность изготовления, наличие выбранных деталей, сроки и итоговую стоимость. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.afterApprovalTitle` | После согласования всех деталей | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.afterConfirmationText` | Заказ передаётся в работу после согласования с клиентом. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.afterConfirmationTitle` | После подтверждения | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.applicationText` | Готовая заявка отправляется нам через Telegram. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.applicationTitle` | Заявка | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.approvalText` | Мы проверяем детали, наличие элементов, стоимость и сроки. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.approvalTitle` | Согласование | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.beforeConfirmationText` | Мы уточняем комплектацию, стоимость и срок изготовления. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.beforeConfirmationTitle` | До подтверждения | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.choiceText` | Вы выбираете формат, фигурки, детали и оформление композиции. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.choiceTitle` | Выбор | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.confirmationTitle` | Когда заказ считается подтверждённым | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.ctaSubtitle` | Все детали подтверждаются заранее | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.ctaText` | Перед началом работы мы согласуем состав композиции, возможные замены, стоимость и срок изготовления. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.ctaTitle` | Готовы оформить заказ? | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.customProductionTitle` | Индивидуальное изготовление | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.differencesText` | Цвета, фигурки, аксессуары и подсветка могут немного отличаться от примеров на сайте из-за наличия деталей. Возможные замены согласовываются с клиентом. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.differencesTitle` | Возможны небольшие отличия | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.intro` | FORMIKA создаёт персонализированные изделия по индивидуальному запросу. Оформление проходит без регистрации — все детали подтверждаются лично в Telegram. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.materialsTitle` | Материалы клиента и публикации | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.orderButton` | Оформить заказ | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.personalCompositionText` | Каждое изделие создаётся по выбранным вами параметрам: формату, количеству фигурок, надписям, деталям и оформлению. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.personalCompositionTitle` | Персональная композиция | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.personalMaterialsText` | Отправленные фотографии, имена и другие материалы используются только для подготовки персонализированного заказа. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.personalMaterialsTitle` | Фото и личные материалы | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.processTitle` | Как оформляется заказ | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.publicationText` | Фотографии готового изделия могут быть опубликованы на сайте или в социальных сетях только с согласия клиента. | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.publicationTitle` | Публикация готовой работы | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `legal.terms.title` | Условия заказа | `src/pages/terms.tsx` | 19–269 | страница условий заказа |
| `notFound.description` | Did you forget to add the page to the router? | `src/pages/not-found.tsx` | 11–15 | страница 404 |
| `notFound.title` | 404 Page Not Found | `src/pages/not-found.tsx` | 11–15 | страница 404 |
| `orderMessage.accessoriesLine` | Аксессуары: {{accessories}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.backgroundAccessoriesHeading` | Детали фона: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.backgroundHeading` | Фон: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.bottomLine` | Низ: {{bottom}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.characterHeading` | Человечек {{number}}: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.colorHeading` | Цвет: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.commentHeading` | Комментарий: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.customBackgroundDisclaimer` | Цена может меняться в зависимости от сложности. | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | описание или поясняющий текст |
| `orderMessage.customBackgroundLine` | Индивидуальный фон - от +{{price}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.deliveryMethodHeading` | Способ получения: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.deliveryPriceHeading` | Доставка: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.deliveryPriceLine` | {{method}}: {{price}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.faceLine` | Лицо: {{face}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.frameProduct` | Рамка | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.greeting` | Здравствуйте! Хочу заказать FORMIKA. | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.hairLine` | Волосы: {{hair}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.handAccessoriesLine` | Аксессуары в руки: {{accessories}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.heartQuantityLine` | {{heart}} x {{quantity}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.heartsHeading` | Сердечки на фон: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.heartsPriceHeading` | Стоимость сердечек: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.lightingHeading` | Подсветка: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.nameLine` | Имя: {{name}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.petsHeading` | Питомцы: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.pickupNote` | Самовывоз возможен в центре Риги, более точный адрес уточняется в личных сообщениях. | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | описание или поясняющий текст |
| `orderMessage.pickupPriceHeading` | Самовывоз: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.productPriceHeading` | Стоимость товара: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.productPriceLine` | Стоимость товара: {{price}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.productTypeHeading` | Тип товара: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.readyItemLine` | {{item}}: {{quantity}} шт x {{price}} = {{total}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.sizeHeading` | Размер: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.topLine` | Верх: {{top}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.totalHeading` | Итого: | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | заголовок или подпись |
| `orderMessage.totalLine` | Итого: {{price}} | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderMessage.whiteBackgroundLine` | Белый фон - входит в стоимость | `src/lib/frameOrder.ts; src/components/CustomProductBuilder.tsx` | 68–148; 251–368 | динамически сформированный текст заявки Telegram |
| `orderSelection.eyebrow` | Начните с формата | `src/pages/order.tsx; src/components/ProductTypeSelector.tsx; src/components/ReturnToProductSelectionButton.tsx` | 63–65; 22–121; 14–29 | экран выбора товара, карточка или кнопка возврата |
| `orderSelection.frameDescription` | Персональная композиция с фигурками, надписью, фоном и подсветкой. | `src/pages/order.tsx; src/components/ProductTypeSelector.tsx; src/components/ReturnToProductSelectionButton.tsx` | 63–65; 22–121; 14–29 | описание или поясняющий текст |
| `orderSelection.frameTitle` | Рамка | `src/pages/order.tsx; src/components/ProductTypeSelector.tsx; src/components/ReturnToProductSelectionButton.tsx` | 63–65; 22–121; 14–29 | заголовок или подпись |
| `orderSelection.keychainDescription` | Готовая модель или персональный персонаж, созданный специально для вас. | `src/pages/order.tsx; src/components/ProductTypeSelector.tsx; src/components/ReturnToProductSelectionButton.tsx` | 63–65; 22–121; 14–29 | описание или поясняющий текст |
| `orderSelection.keychainTitle` | Брелок | `src/pages/order.tsx; src/components/ProductTypeSelector.tsx; src/components/ReturnToProductSelectionButton.tsx` | 63–65; 22–121; 14–29 | заголовок или подпись |
| `orderSelection.returnButton` | К выбору товара | `src/pages/order.tsx; src/components/ProductTypeSelector.tsx; src/components/ReturnToProductSelectionButton.tsx` | 63–65; 22–121; 14–29 | экран выбора товара, карточка или кнопка возврата |
| `orderSelection.returnButtonAria` | Вернуться к выбору товара | `src/pages/order.tsx; src/components/ProductTypeSelector.tsx; src/components/ReturnToProductSelectionButton.tsx` | 63–65; 22–121; 14–29 | aria-label |
| `orderSelection.subtitle` | Выберите тип товара — дальше мы проведём вас по всем шагам сборки. | `src/pages/order.tsx; src/components/ProductTypeSelector.tsx; src/components/ReturnToProductSelectionButton.tsx` | 63–65; 22–121; 14–29 | описание или поясняющий текст |
| `orderSelection.title` | Создайте свою уникальную композицию | `src/pages/order.tsx; src/components/ProductTypeSelector.tsx; src/components/ReturnToProductSelectionButton.tsx` | 63–65; 22–121; 14–29 | заголовок или подпись |
| `petsSelector.noAnimalsDescription` | Композиция без животных | `src/components/PetSelectionGrid.tsx` | 19–223 | описание или поясняющий текст |
| `petsSelector.noPet` | Без питомца | `src/components/PetSelectionGrid.tsx` | 19–223 | карточка выбора питомца |
| `petsSelector.petDescription` | Питомец для композиции | `src/components/PetSelectionGrid.tsx` | 19–223 | описание или поясняющий текст |
| `seo.description` | FORMIKA - создайте свою уникальную композицию из LEGO | `index.html` | 9 | SEO meta description |
| `seo.title` | FORMIKA \| Custom LEGO Gifts | `index.html` | 6 | SEO title |
| `home.reviews.quote` | «{{text}}» | `src/components/home/Reviews.tsx` | 119 | динамическое оформление текста отзыва |
| `home.reviews.customerInitial` | {{initial}} | `src/components/home/Reviews.tsx` | 130–142 | динамическая инициала клиента |
| `characterEditor.namePreview` | Aa | `src/components/CharacterEditor.tsx` | 96 | декоративная видимая подпись категории имени |
| `characterEditor.emptyPreview` | — | `src/components/CharacterEditor.tsx` | 110, 127 | видимый маркер пустого выбора |
| `frameBuilder.review.emptyValue` | - | `src/components/FrameBuilder/steps/ReviewStep.tsx` | 123–125 | видимый маркер отсутствующего значения |
| `keychainBuilder.decreaseSymbol` | − | `src/components/CustomProductBuilder.tsx` | 673 | видимый символ кнопки уменьшения количества |
| `keychainBuilder.increaseSymbol` | + | `src/components/CustomProductBuilder.tsx` | 702 | видимый символ кнопки увеличения количества |
| `keychainBuilder.quantityPrice` | {{quantity}} × {{price}} | `src/components/CustomProductBuilder.tsx` | 750 | динамическая строка количества и цены |
