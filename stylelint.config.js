module.exports = {
  // Кастомный синтаксис для поддержки SCSC (вложенность, переменные, миксины)
  // postcss-scss позволяет Stylelint понимать SCSS синтаксис
  customSyntax: 'postcss-scss',
  extends: [
    // Базовые правила для SCSS (вложенность, переменные, миксины)
    'stylelint-config-standard-scss',
    // Отключает правила конфликтующие с Prettier
    // Должен быть последним, чтобы отключить все конфликтующие правила форматирования
    'stylelint-config-prettier-scss',
    // Сортировка свойств в соответствии с Recess
    'stylelint-config-recess-order',
  ],
  // плагин для сортировки свойств
  plugins: ['stylelint-order'],

  rules: {
    // === ОТКЛЮЧЕННЫЕ ПРАВИЛА ===

    // Разрешаем пустые файлы (полезно для будущих стилей или .scss файлов без кода)
    'no-empty-source': null,

    // === БАЗОВЫЕ ПРОВЕРКИ ===

    // Запрещаем пустые CSS блоки: .class { }
    'block-no-empty': true,

    // Проверяем валидность HEX цветов (#гг123 - ошибка, #ff0000 - ок)
    'color-no-invalid-hex': true,

    // Запрещаем дублирование селекторов в пределах одного файла
    // Пример ошибки: .btn { } .btn { }
    'no-duplicate-selectors': true,

    // Запрещаем дублирование CSS-переменных внутри одного блока
    // Ошибка: :root { --color: red; --color: blue; }
    'declaration-block-no-duplicate-custom-properties': true,

    // Запрещаем дублирование обычных свойств
    // Ошибка: .class { color: red; color: blue; }
    'declaration-block-no-duplicate-properties': true,

    // Запрещаем сокращенные свойства, которые переопределяются полными
    // Ошибка: .class { margin: 10px; margin-top: 5px; }
    'declaration-block-no-shorthand-property-overrides': true,

    // Запрещаем избыточную вложенность внутри правила
    // Ошибка: .a { .b { & { ... } } }
    'block-no-redundant-nested-style-rules': true,

    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep'],
      },
    ],
    // === ПРАВИЛА ДЛЯ ЗНАЧЕНИЙ ===

    // Ключевые слова свойств только в нижнем регистре
    // Правильно: display: block; Неправильно: display: Block;
    'value-keyword-case': 'lower',

    // Формат прозрачности: всегда использовать числа (0.5 вместо 50%)
    // Правильно: opacity: 0.5; Неправильно: opacity: 50%;
    'alpha-value-notation': 'number',

    // === ПРАВИЛА ДЛЯ ОБЪЯВЛЕНИЙ ===

    // Запрещаем длинную запись там, где есть сокращенная
    // Ошибка: margin-top: 10px; margin-bottom: 10px;
    // Правильно: margin-block: 10px;
    'declaration-block-no-redundant-longhand-properties': true,

    // Запрещаем избыточные значения в сокращенных свойствах
    // Ошибка: margin: 10px 10px 10px 10px;
    // Правильно: margin: 10px;
    'shorthand-property-no-redundant-values': true,

    // === ПРАВИЛА ДЛЯ ЦВЕТОВ ===

    // Используем длинную запись HEX цветов (#ffffff вместо #fff)
    // Обеспечивает единообразие и упрощает поиск/замену
    'color-hex-length': 'long',

    // Запрещаем HEX с альфа-каналом (#ff0000ff)
    // Используйте отдельно цвет + opacity или rgba()
    'color-hex-alpha': 'never',

    // === ПУСТЫЕ СТРОКИ МЕЖДУ БЛОКАМИ ===

    // Правила для пустых строк перед at-правилами (@mixin, @function, @media и т.д.)
    'at-rule-empty-line-before': [
      'always', // Всегда требуем пустую строку перед at-правилом
      {
        except: [
          'first-nested', // Не требуется для первого вложенного правила
          'blockless-after-same-name-blockless', // Не требуется между блочными at-правилами с одинаковым именем
        ],
      },
    ],
  },
};
