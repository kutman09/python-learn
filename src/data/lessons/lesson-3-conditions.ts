import { LessonContent } from '@/types/lesson';

export const lesson3: LessonContent = {
  id: 'lesson-3',
  slug: 'lesson-3-conditions',
  title: 'Занятие 3: Условия',
  description: 'Как научить программу принимать решения: if, elif, else и логические операторы.',
  summary: [
    'if позволяет выполнять код только в том случае, если условие истинно.',
    'В Python отступы (обычно 4 пробела) — это не просто красота, это часть синтаксиса, которая показывает, какой код относится к if.',
    'else выполняется, если все предыдущие условия оказались ложными.',
    'elif позволяет проверить дополнительные условия. Они проверяются строго сверху вниз.',
    'Условия можно вкладывать друг в друга (if внутри if) с помощью дополнительных отступов.',
    'Логические операторы (and, or, not) позволяют комбинировать несколько условий.',
    'Тернарный оператор помогает написать простой if/else в одну строку.'
  ],
  topics: [
    {
      id: 'if_statement',
      title: 'Условный оператор if',
      theory: {
        content: `
          <p>В программировании часто нужно выполнять какие-то действия не всегда, а только при определенных условиях. Для этого используется конструкция <code>if</code> (если).</p>
          <pre><code>age = 20
if age >= 18:
    print("Доступ разрешен")</code></pre>
          <p>Разберем синтаксис детально:</p>
          <ul>
            <li>Пишем слово <code>if</code>.</li>
            <li>Дальше идет <strong>условие</strong> (например, <code>age >= 18</code>). Результатом условия всегда должно быть <code>True</code> или <code>False</code>.</li>
            <li>Затем ставим двоеточие <code>:</code>.</li>
            <li>Со следующей строки начинается блок кода, который выполнится, только если условие истинно. <strong>Этот блок обязательно должен быть сдвинут вправо (отступ).</strong></li>
          </ul>
          <div class="warning">
            <strong>⚠️ Частая ошибка:</strong> Новички часто забывают двоеточие или делают неправильные отступы. В Python отступ — это закон. Обычно используют 4 пробела (или клавишу Tab).
          </div>
        `,
        analogy: {
          title: 'Фейсконтроль в клубе',
          content: 'if — это охранник на входе. У него есть правило (условие): "Возраст >= 18". Когда вы подходите, он проверяет условие. Если правда (True), он открывает дверь и пускает вас внутрь (выполняется код с отступом). Если ложь (False), он вас просто игнорирует и вы идете дальше по улице (код с отступом пропускается).'
        }
      },
      guidedPractice: [
        {
          id: 'gp-if-1',
          type: 'predict-output',
          question: 'Что выведет этот код?',
          code: 'x = 10\nif x > 5:\n    print("Больше")\nprint("Конец")',
          options: ['Только "Больше"', 'Только "Конец"', '"Больше" и затем "Конец"', 'Ошибка'],
          correctAnswer: '"Больше" и затем "Конец"',
          explanation: 'Так как 10 > 5 это True, выведется "Больше". А "Конец" выведется в любом случае, так как он без отступа и не зависит от условия if.'
        }
      ],
      freePractice: [
        {
          id: 'fp-if-1',
          type: 'code-run',
          question: 'Напиши код',
          prompt: 'Напишите условие if, которое проверит, что переменная balance больше 0. Если да, выведите с помощью print() фразу "Деньги есть".',
          starterCode: 'balance = 50\n# Ваш код ниже:\n',
          expectedStdout: 'Деньги есть',
          explanationOnFail: 'Проверьте, не забыли ли вы двоеточие и правильный ли у вас отступ (4 пробела) перед print.',
          explanationOnSuccess: 'Отлично! Условие выполнилось, так как 50 > 0.',
          explanation: ''
        }
      ]
    },
    {
      id: 'else_elif',
      title: 'else и elif (Иначе и Иначе если)',
      theory: {
        content: `
          <h3>else (Иначе)</h3>
          <p>Если условие в <code>if</code> ложно, программа просто идет дальше. Но что если мы хотим сделать что-то <strong>другое</strong> в этом случае? На помощь приходит <code>else</code>.</p>
          <pre><code>if age >= 18:
    print("Вход разрешен")
else:
    print("Вход запрещен")</code></pre>
          <p>Обратите внимание: после <code>else</code> не пишется условие, только двоеточие <code>:</code>. Это буквально означает "во всех остальных случаях".</p>
          
          <h3>elif (Иначе если)</h3>
          <p>Когда вариантов больше двух, используется <code>elif</code> (сокращение от else if).</p>
          <pre><code>if color == "красный":
    print("Стой")
elif color == "желтый":
    print("Приготовься")
else:
    print("Иди")</code></pre>
          <div class="warning">
            <strong>⚠️ Критически важно:</strong> Проверки идут строго сверху вниз. Как только Python найдет <strong>первое</strong> истинное условие, он выполнит его блок и <strong>пропустит все остальные</strong> elif и else.
          </div>
        `,
        analogy: {
          title: 'Выбор одежды по погоде',
          content: 'Вы смотрите в окно (if): "Идет дождь?". Если да — берете зонт. \nЕсли дождя нет, вы смотрите на термометр (elif): "Холоднее 10 градусов?". Если да — надеваете куртку. \nВо всех остальных случаях (else) — надеваете футболку.'
        }
      },
      guidedPractice: [
        {
          id: 'gp-elif-1',
          type: 'predict-output',
          question: 'Что выведет код?',
          code: 'score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 70:\n    print("C")\nelse:\n    print("D")',
          options: ['A', 'B', 'B и C', 'Ошибка'],
          correctAnswer: 'B',
          explanation: 'Первое условие (85 >= 90) ложно. Второе (85 >= 80) истинно. Выводится "B", и всё, что ниже, уже даже не проверяется.'
        }
      ],
      freePractice: [
        {
          id: 'fp-elif-1',
          type: 'fill-gap',
          question: 'Заполните пропуск так, чтобы при x=5 вывелось "Меньше 10".',
          codeTemplate: 'if x > 10:\n    print("Больше")\nelif x == 10:\n    print("Равно")\n___:\n    print("Меньше 10")',
          correctAnswer: 'else',
          explanation: 'Последняя ветка для всех остальных случаев — это else.'
        }
      ]
    },
    {
      id: 'nested_if',
      title: 'Вложенные условия',
      theory: {
        content: `
          <p>Иногда нужно проверить одно условие, и <strong>только если оно истинно</strong>, проверить другое. Это делается с помощью вложенных условий (if внутри if).</p>
          <pre><code>has_ticket = True
age = 15

if has_ticket:
    if age >= 18:
        print("Проходите")
    else:
        print("Вам нужен билет для детей")
else:
    print("Купите билет")</code></pre>
          <p>Секрет правильной работы здесь — <strong>отступы</strong>. Каждое вложение требует дополнительных 4 пробелов (или еще одного нажатия Tab). По отступам визуально очень легко понять, какой <code>else</code> к какому <code>if</code> относится.</p>
        `,
        analogy: {
          title: 'Коридор с дверьми',
          content: 'Вы подходите к зданию. Первая дверь (первый if) — это проверка билета. Если билета нет (else), вы остаетесь на улице. Если билет есть, вы входите в коридор. Там вторая дверь (вложенный if) — проверка возраста. Вторая дверь имеет смысл только для тех, кто уже прошел первую.'
        }
      },
      guidedPractice: [
        {
          id: 'gp-nested-1',
          type: 'predict-output',
          question: 'Что выведет этот код?',
          code: 'is_weekend = False\ntime = 10\n\nif is_weekend:\n    if time < 11:\n        print("Сплю")\n    else:\n        print("Гуляю")\nelse:\n    print("Иду на работу")',
          options: ['Сплю', 'Гуляю', 'Иду на работу', 'Ничего'],
          correctAnswer: 'Иду на работу',
          explanation: 'Так как is_weekend равно False, мы сразу переходим к самому внешнему else, игнорируя всё, что внутри if is_weekend.'
        }
      ],
      freePractice: [
        {
          id: 'fp-nested-1',
          type: 'code-run',
          question: 'Напиши код',
          prompt: 'Напишите программу, которая сначала проверяет `is_active` (внешний if). Если True, проверяет `role == "admin"` (вложенный if). Если роль совпадает, выведите "Доступ к панели". Все переменные уже заданы.',
          starterCode: 'is_active = True\nrole = "admin"\n# Ваш код:\n',
          expectedStdout: 'Доступ к панели',
          explanationOnFail: 'Убедитесь, что второй if находится внутри первого (имеет отступ).',
          explanationOnSuccess: 'Супер! Вложенные условия работают корректно.',
          explanation: ''
        }
      ]
    },
    {
      id: 'logical_ops',
      title: 'Логические операторы (and, or, not)',
      theory: {
        content: `
          <p>Чтобы не делать слишком много вложенных <code>if</code>, можно комбинировать условия прямо в одной строке.</p>
          <ul>
            <li><strong>and (И)</strong> — Результат будет True, <strong>только если оба условия True</strong>. Например: <code>if age >= 18 and has_ticket:</code></li>
            <li><strong>or (ИЛИ)</strong> — Результат будет True, <strong>если хотя бы одно из условий True</strong>. Например: <code>if is_weekend or is_holiday:</code></li>
            <li><strong>not (НЕ)</strong> — Инвертирует значение. True становится False, а False становится True. Например: <code>if not is_banned:</code> (если НЕ забанен).</li>
          </ul>
          <div class="warning">
            <strong>⚠️ Частая ошибка:</strong> Не пишите <code>if color == "red" or "blue":</code>. Для Python "blue" само по себе истинно. Правильно: <code>if color == "red" or color == "blue":</code>. Каждое условие до и после <code>or</code> должно быть полноценным.
          </div>
        `,
        analogy: {
          title: 'and vs or',
          content: 'Поход в кино (and): Чтобы войти, нужен билет И паспорт. Если чего-то одного нет — вас не пустят. \nОплата в магазине (or): Вы можете оплатить картой ИЛИ наличными. Любого одного способа достаточно.'
        }
      },
      guidedPractice: [
        {
          id: 'gp-log-1',
          type: 'predict-output',
          question: 'Что выведет этот код?',
          code: 'x = 5\nprint(x > 0 and x < 3)',
          options: ['True', 'False', 'Ошибка'],
          correctAnswer: 'False',
          explanation: 'x > 0 (True), но x < 3 (False). При использовании and, если хотя бы одно условие False, общий результат тоже False.'
        }
      ],
      freePractice: [
        {
          id: 'fp-log-1',
          type: 'code-run',
          question: 'Напиши код',
          prompt: 'Напишите условие if, которое проверяет, что `a` равно 10 ИЛИ `b` равно 10. Если да, выведите "Бинго".',
          starterCode: 'a = 4\nb = 10\n# Ваш код:\n',
          expectedStdout: 'Бинго',
          explanationOnFail: 'Используйте логический оператор or.',
          explanationOnSuccess: 'Отлично! or сработал, так как b == 10.',
          explanation: ''
        }
      ]
    },
    {
      id: 'ternary',
      title: 'Тернарный оператор',
      theory: {
        content: `
          <p>Иногда обычный <code>if/else</code> занимает слишком много строк для очень простой задачи. В Python можно написать это в одну строку.</p>
          <pre><code># Классический способ
if age >= 18:
    status = "взрослый"
else:
    status = "ребенок"

# Тернарный оператор (в одну строку)
status = "взрослый" if age >= 18 else "ребенок"</code></pre>
          <p>Синтаксис читается как на английском языке: Присвоить "взрослый" ЕСЛИ возраст >= 18 ИНАЧЕ "ребенок". Это удобно для простых присвоений, но не стоит пихать туда сложную логику — код станет нечитаемым.</p>
        `,
        analogy: {
          title: 'Короткий ответ',
          content: 'Вместо того чтобы долго рассуждать: "Если на улице идет дождь, я возьму зонт, а иначе я не буду брать зонт", вы говорите кратко: "Беру зонт, если дождь, иначе — ничего".'
        }
      },
      guidedPractice: [
        {
          id: 'gp-tern-1',
          type: 'predict-output',
          question: 'Какое значение будет у переменной result?',
          code: 'x = 10\nresult = "Четное" if x % 2 == 0 else "Нечетное"\nprint(result)',
          options: ['Четное', 'Нечетное', 'Ошибка'],
          correctAnswer: 'Четное',
          explanation: 'x % 2 == 0 дает True (остаток равен 0), поэтому выбирается значение слева от if, то есть "Четное".'
        }
      ],
      freePractice: [
        {
          id: 'fp-tern-1',
          type: 'code-run',
          question: 'Напиши код',
          prompt: 'Используйте тернарный оператор (в одну строку), чтобы присвоить переменной `msg` значение "Да", если `is_ready` True, и "Нет", если False. Затем выведите `msg`.',
          starterCode: 'is_ready = True\n# Ваш код:\n',
          checkScript: 'assert "msg" in globals(), "Переменная msg не найдена"\nassert msg == "Да", "Значение msg неверное"',
          explanationOnFail: 'Формат должен быть: msg = "Да" if is_ready else "Нет"',
          explanationOnSuccess: 'Идеально! Тернарный оператор делает код короче.',
          explanation: ''
        }
      ]
    }
  ],
  test: [
    {
      id: 'test-3-1',
      type: 'multiple-choice',
      question: 'Какой отступ является стандартом в Python для блоков кода внутри if?',
      options: ['2 пробела', '4 пробела', '8 пробелов', 'Отступы не обязательны'],
      correctAnswer: '4 пробела',
      explanation: 'Стандартом (PEP-8) считаются 4 пробела на каждый уровень вложенности.'
    },
    {
      id: 'test-3-2',
      type: 'predict-output',
      question: 'Что выведет этот код?',
      code: 'x = 0\nif x:\n    print("A")\nelse:\n    print("B")',
      options: ['A', 'B', 'Ошибка'],
      correctAnswer: 'B',
      explanation: 'В Python число 0 в логическом контексте считается False. Поэтому выполнится ветка else.'
    },
    {
      id: 'test-3-3',
      type: 'predict-output',
      question: 'Что выведет этот код?',
      code: 'x = 10\nif x > 5:\n    print("A")\nelif x > 8:\n    print("B")\nelse:\n    print("C")',
      options: ['A', 'B', 'C', 'A и B'],
      correctAnswer: 'A',
      explanation: 'x > 5 истинно. Выводится "A", и весь остальной блок elif/else немедленно пропускается, даже если x > 8 тоже истинно.'
    },
    {
      id: 'test-3-4',
      type: 'multiple-choice',
      question: 'Как правильно проверить, что a равно 5, а b равно 10?',
      options: ['if a == 5 and b == 10:', 'if a = 5 and b = 10:', 'if a == 5 or b == 10:', 'if a == 5 & b == 10:'],
      correctAnswer: 'if a == 5 and b == 10:',
      explanation: 'Нужно использовать логический оператор and, а для сравнения — двойное равно (==).'
    },
    {
      id: 'test-3-5',
      type: 'predict-output',
      question: 'Что выведет код?',
      code: 'is_rain = False\nprint("Зонт" if is_rain else "Кепка")',
      options: ['Зонт', 'Кепка', 'Ничего'],
      correctAnswer: 'Кепка',
      explanation: 'Условие is_rain ложно, поэтому выбирается значение после else ("Кепка").'
    }
  ]
};
