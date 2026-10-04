import os

content = """import { LessonContent } from '@/types/lesson';

export const lesson5: LessonContent = {
  id: 'lesson-5',
  slug: 'lesson-5-loops',
  title: {
    ru: 'Занятие 5: Циклы',
    ky: '5-сабак: Циклдер'
  },
  description: {
    ru: 'Как научить программу повторять действия многократно: циклы for и while.',
    ky: 'Программаны кантип аракеттерди көп жолу кайталоого үйрөтүү керек: for жана while циклдери.'
  },
  summary: [
    {
      ru: 'Циклы нужны, чтобы не писать один и тот же код много раз.',
      ky: 'Циклдер бир эле кодду көп жолу жазбоо үчүн керек.'
    },
    {
      ru: 'for используется, когда заранее известно количество повторений или есть готовая коллекция (строка, список) для перебора.',
      ky: 'for алдын ала кайталоолордун саны белгилүү болгондо же карап чыгуу үчүн даяр коллекция (сап, тизме) болгондо колдонулат.'
    },
    {
      ru: 'range() генерирует числа. Важно: параметр stop не включается в результат.',
      ky: 'range() сандарды түзөт. Маанилүү: stop параметри натыйжага кошулбайт.'
    },
    {
      ru: 'while работает, пока его условие истинно. Если условие не менять, цикл станет бесконечным.',
      ky: 'while анын шарты чын болуп турганда иштейт. Эгерде шартты өзгөртпөсө, цикл чексиз болуп калат.'
    },
    {
      ru: 'break немедленно прекращает выполнение всего цикла.',
      ky: 'break дароо бүт циклдин аткарылышын токтотот.'
    },
    {
      ru: 'continue пропускает текущий шаг и переходит к следующему.',
      ky: 'continue учурдагы кадамды өткөрүп жиберип, кийинкисине өтөт.'
    },
    {
      ru: 'Циклы можно вкладывать друг в друга: тогда внутренний цикл полностью отрабатывает на каждом шаге внешнего.',
      ky: 'Циклдерди бири-биринин ичине киргизүүгө болот: анда ички цикл тышкы циклдин ар бир кадамында толук аткарылат.'
    }
  ],
  topics: [
    {
      id: 'loops_intro',
      title: {
        ru: 'Зачем нужны циклы?',
        ky: 'Циклдер эмне үчүн керек?'
      },
      theory: {
        content: {
          ru: `
          <p>Представьте, что вам нужно вывести на экран числа от 1 до 10. Без циклов это выглядело бы так:</p>
          <pre><code>print(1)
print(2)
print(3)
# ... и так 10 раз</code></pre>
          <p>А если нужно 1000 раз? Или миллион? Писать это вручную — плохая идея. Программирование создано для того, чтобы рутинную работу делал компьютер. Для этого придумали <strong>циклы</strong>.</p>
          <p>Цикл позволяет сказать компьютеру: <em>"Вот блок кода. Повтори его столько-то раз (или пока не выполнится условие)"</em>.</p>
          <pre><code>for i in range(1, 11):
    print(i)</code></pre>
          <p>Эти две строки заменяют десять строк кода из первого примера!</p>
          <p>В Python есть два вида циклов:</p>
          <ul>
            <li><code>for</code> — цикл по <strong>известному количеству</strong> или известному набору элементов ("повтори 10 раз" или "сделай это для каждого студента в списке").</li>
            <li><code>while</code> — цикл <strong>с условием</strong> ("повторяй, пока пользователь не введет правильный пароль").</li>
          </ul>
          `,
          ky: `
          <p>Экранга 1ден 10го чейинки сандарды чыгаруу керек деп элестетиңиз. Циклсиз бул мындай көрүнмөк:</p>
          <pre><code>print(1)
print(2)
print(3)
# ... жана ушундай 10 жолу</code></pre>
          <p>Ал эми 1000 жолу керек болсочу? Же миллион жолубу? Буну кол менен жазуу — жаман идея. Программалоо күнүмдүк жумушту компьютер жасашы үчүн ойлоп табылган. Бул үчүн <strong>циклдер</strong> ойлоп табылган.</p>
          <p>Цикл компьютерге мындай деп айтууга мүмкүндүк берет: <em>"Мына код блогу. Муну мынча жолу кайтала (же шарт аткарылмайынча)"</em>.</p>
          <pre><code>for i in range(1, 11):
    print(i)</code></pre>
          <p>Бул эки сап биринчи мисалдагы он сап кодду алмаштырат!</p>
          <p>Python'до циклдердин эки түрү бар:</p>
          <ul>
            <li><code>for</code> — <strong>белгилүү санга</strong> же белгилүү элементтердин топтомуна негизделген цикл ("10 жолу кайтала" же "муну тизмедеги ар бир студент үчүн жаса").</li>
            <li><code>while</code> — <strong>шарттуу</strong> цикл ("колдонуучу туура паролду киргизип бүтмөйүнчө кайталай бер").</li>
          </ul>
          `
        },
        analogy: {
          title: {
            ru: 'Наёмный работник',
            ky: 'Жалданма кызматкер'
          },
          content: {
            ru: 'for — это как приказ рабочему: "Выкопай ровно 5 ям". Он заранее знает объем работы. while — это приказ: "Копай, пока не найдешь воду". Он не знает, сколько раз копнет, но проверяет условие каждый раз.',
            ky: 'for — бул жумушчуга буйрук сыяктуу: "Так 5 чуңкур каз". Ал алдын ала жумуштун көлөмүн билет. while — бул буйрук: "Суу тапмайынча каза бер". Ал канча жолу казарын билбейт, бирок ар дайым шартты текшерип турат.'
          }
        }
      },
      guidedPractice: [
        {
          id: 'gp-intro-1',
          type: 'multiple-choice',
          question: {
            ru: 'Какой цикл лучше выбрать для задачи: "Разослать письмо 100 клиентам из списка"?',
            ky: 'Бул маселе үчүн кайсы циклди тандоо жакшыраак: "Тизмедеги 100 кардарга кат жөнөтүү"?'
          },
          options: [
            { ru: 'for', ky: 'for' },
            { ru: 'while', ky: 'while' }
          ],
          correctAnswer: 'for',
          explanation: {
            ru: 'Количество клиентов известно (есть конкретный список), поэтому идеально подходит цикл for.',
            ky: 'Кардарлардын саны белгилүү (так тизме бар), ошондуктан for цикли идеалдуу туура келет.'
          }
        },
        {
          id: 'gp-intro-2',
          type: 'multiple-choice',
          question: {
            ru: 'Какой цикл лучше выбрать для задачи: "Ждать, пока температура двигателя не опустится ниже 90 градусов"?',
            ky: 'Бул маселе үчүн кайсы циклди тандоо жакшыраак: "Мотордун температурасы 90 градустан төмөн түшкүчө күтүү"?'
          },
          options: [
            { ru: 'for', ky: 'for' },
            { ru: 'while', ky: 'while' }
          ],
          correctAnswer: 'while',
          explanation: {
            ru: 'Мы не знаем заранее, сколько минут или проверок это займет. У нас есть только условие "пока температура >= 90", поэтому нужен while.',
            ky: 'Буга канча мүнөт же текшерүү кетерин алдын ала билбейбиз. Билгенибиз "температура >= 90 болуп турганда" деген гана шарт бар, ошондуктан while керек.'
          }
        }
      ],
      freePractice: []
    },
    {
      id: 'for_range',
      title: {
        ru: 'Цикл for и функция range()',
        ky: 'for цикли жана range() функциясы'
      },
      theory: {
        content: {
          ru: `
          <p>В Python цикл <code>for</code> почти всегда работает с коллекциями (наборами данных). Если нам нужно просто повторить действие N раз, мы используем встроенную функцию <code>range()</code> (диапазон).</p>
          <pre><code>for i in range(3):
    print("Привет", i)</code></pre>
          <p>Обратите внимание на <strong>двоеточие</strong> в конце строки и <strong>отступ (4 пробела)</strong> на следующей строке! Это синтаксис Python, который вы уже видели в условиях <code>if</code>. Отступ показывает, что функция <code>print</code> находится <em>внутри</em> тела цикла.</p>
          
          <div class="trace">
            <div class="trace-title">Как это выполняется по шагам:</div>
            <div class="trace-step"><span class="step-num">Шаг 1:</span> <span class="step-action">range сгенерировал 0. i = 0 → выполняется тело цикла</span> <span class="step-result">→ выводится "Привет 0"</span></div>
            <div class="trace-step"><span class="step-num">Шаг 2:</span> <span class="step-action">range сгенерировал 1. i = 1 → выполняется тело цикла</span> <span class="step-result">→ выводится "Привет 1"</span></div>
            <div class="trace-step"><span class="step-num">Шаг 3:</span> <span class="step-action">range сгенерировал 2. i = 2 → выполняется тело цикла</span> <span class="step-result">→ выводится "Привет 2"</span></div>
            <div class="trace-step"><span class="step-num">Конец:</span> <span class="step-action">числа в range закончились</span> <span class="step-result">→ цикл завершён, программа идет дальше</span></div>
          </div>
          
          <p>Переменная <code>i</code> (можно назвать ее как угодно, например <code>step</code> или <code>number</code>) автоматически меняет свое значение на каждом шаге. После завершения цикла она сохраняет свое последнее значение!</p>

          <h3>Три формы range()</h3>
          <p>Функция <code>range</code> очень гибкая и может принимать от 1 до 3 параметров:</p>
          <ul>
            <li><code>range(stop)</code> — генерирует числа от 0 до <code>stop-1</code>. <em>Например, range(3) → 0, 1, 2.</em></li>
            <li><code>range(start, stop)</code> — генерирует от <code>start</code> до <code>stop-1</code>. <em>Например, range(5, 8) → 5, 6, 7.</em></li>
            <li><code>range(start, stop, step)</code> — с шагом <code>step</code>. <em>Например, range(1, 10, 2) → 1, 3, 5, 7, 9.</em></li>
          </ul>

          <div class="warning">
            <strong>⚠️ Частая ошибка:</strong> Новички думают, что <code>range(5)</code> выдаст числа от 1 до 5. На самом деле программисты считают с нуля! Последовательность начинается с 0, и самое главное — <strong>правая граница (stop) НИКОГДА не включается</strong>. Если нужны числа от 1 до 5, пишите <code>range(1, 6)</code>.
          </div>

          <p>А как считать в обратном порядке? Легко, используем отрицательный шаг!</p>
          <pre><code>for i in range(10, 0, -1):
    print(i) # Выведет 10, 9, 8, ... 1</code></pre>
          `,
          ky: `
          <p>Python'до <code>for</code> цикли дээрлик ар дайым коллекциялар (маалымат топтомдору) менен иштейт. Эгерде бизге аракетти жөн гана N жолу кайталоо керек болсо, биз камтылган <code>range()</code> (диапазон) функциясын колдонобуз.</p>
          <pre><code>for i in range(3):
    print("Салам", i)</code></pre>
          <p>Саптын аягындагы <strong>кош чекитке</strong> жана кийинки саптагы <strong>чегинүүгө (4 боштук)</strong> көңүл буруңуз! Бул Python'дун синтаксиси, муну сиз <code>if</code> шарттарында көргөнсүз. Чегинүү <code>print</code> функциясы циклдин <em>ичинде</em> экенин көрсөтөт.</p>
          
          <div class="trace">
            <div class="trace-title">Бул кадам-кадам менен кантип аткарылат:</div>
            <div class="trace-step"><span class="step-num">Кадам 1:</span> <span class="step-action">range 0дү түздү. i = 0 → циклдин денеси аткарылат</span> <span class="step-result">→ "Салам 0" чыгарылат</span></div>
            <div class="trace-step"><span class="step-num">Кадам 2:</span> <span class="step-action">range 1ди түздү. i = 1 → циклдин денеси аткарылат</span> <span class="step-result">→ "Салам 1" чыгарылат</span></div>
            <div class="trace-step"><span class="step-num">Кадам 3:</span> <span class="step-action">range 2ни түздү. i = 2 → циклдин денеси аткарылат</span> <span class="step-result">→ "Салам 2" чыгарылат</span></div>
            <div class="trace-step"><span class="step-num">Аягы:</span> <span class="step-action">range ичиндеги сандар бүттү</span> <span class="step-result">→ цикл аяктады, программа андан ары уланат</span></div>
          </div>
          
          <p><code>i</code> өзгөрмөсү (аны каалагандай атоого болот, мисалы <code>step</code> же <code>number</code>) ар бир кадамда өз маанисин автоматтык түрдө өзгөртөт. Цикл аяктагандан кийин ал акыркы маанисин сактап калат!</p>

          <h3>range() функциясынын үч формасы</h3>
          <p><code>range</code> функциясы абдан ийкемдүү жана 1ден 3кө чейин параметр ала алат:</p>
          <ul>
            <li><code>range(stop)</code> — 0дөн <code>stop-1</code>ге чейинки сандарды түзөт. <em>Мисалы, range(3) → 0, 1, 2.</em></li>
            <li><code>range(start, stop)</code> — <code>start</code>тан <code>stop-1</code>ге чейин. <em>Мисалы, range(5, 8) → 5, 6, 7.</em></li>
            <li><code>range(start, stop, step)</code> — <code>step</code> кадамы менен. <em>Мисалы, range(1, 10, 2) → 1, 3, 5, 7, 9.</em></li>
          </ul>

          <div class="warning">
            <strong>⚠️ Көп кездешүүчү ката:</strong> Жаңы баштагандар <code>range(5)</code> 1ден 5ке чейинки сандарды берет деп ойлошот. Чынында программисттер нөлдөн баштап санашат! Тизмек 0дөн башталат, жана эң негизгиси — <strong>оң чек (stop) ЭЧ КАЧАН кошулбайт</strong>. Эгерде 1ден 5ке чейинки сандар керек болсо, <code>range(1, 6)</code> деп жазыңыз.
          </div>

          <p>Артка кантип саноо керек? Оңой, терс кадамды колдонобуз!</p>
          <pre><code>for i in range(10, 0, -1):
    print(i) # 10, 9, 8, ... 1 чыгарат</code></pre>
          `
        },
        analogy: {
          title: {
            ru: 'Рулетка с числами',
            ky: 'Сандары бар рулетка'
          },
          content: {
            ru: 'Представьте рулетку, на которой написаны числа. range(1, 4) выдает вам билетики с номерами 1, 2 и 3. Цикл for берет каждый билетик по очереди, кладет в переменную i и пускает вас на аттракцион.',
            ky: 'Сандар жазылган рулетканы элестетиңиз. range(1, 4) сизге 1, 2 жана 3 номерлүү билеттерди берет. for цикли ар бир билетти кезек менен алып, аны i өзгөрмөсүнө салып, сизди аттракционго киргизет.'
          }
        }
      },
      guidedPractice: [
        {
          id: 'gp-for-1',
          type: 'predict-output',
          question: {
            ru: 'Что выведет этот код?',
            ky: 'Бул код эмнени чыгарат?'
          },
          code: 'for i in range(1, 4):\n    print(i)',
          options: [
            { ru: '1\\n2\\n3', ky: '1\\n2\\n3' },
            { ru: '1\\n2\\n3\\n4', ky: '1\\n2\\n3\\n4' },
            { ru: '0\\n1\\n2\\n3', ky: '0\\n1\\n2\\n3' }
          ],
          correctAnswer: '1\\n2\\n3',
          explanation: {
            ru: 'Цикл начнется с 1 и закончится ПЕРЕД 4.',
            ky: 'Цикл 1ден башталып, 4түн АЛДЫНДА токтойт.'
          }
        },
        {
          id: 'gp-for-2',
          type: 'fill-gap',
          question: {
            ru: 'Впишите аргументы range(), чтобы получить числа 10, 8, 6.',
            ky: '10, 8, 6 сандарын алуу үчүн range() аргументтерин жазыңыз.'
          },
          codeTemplate: 'for i in range(___):\n    print(i)',
          correctAnswer: '10, 4, -2',
          explanation: {
            ru: 'Старт 10. Шаг -2. Чтобы число 6 вошло, мы должны остановиться после него, например на 4 (или 5). range(10, 4, -2) сгенерирует 10, 8, 6.',
            ky: 'Башталышы 10. Кадам -2. 6 саны кириши үчүн, биз андан кийин токтошубуз керек, мисалы 4 (же 5)тө. range(10, 4, -2) 10, 8, 6ны түзөт.'
          }
        }
      ],
      freePractice: [
        {
          id: 'fp-for-1',
          type: 'code-run',
          question: {
            ru: 'Вывод чисел',
            ky: 'Сандарды чыгаруу'
          },
          prompt: {
            ru: 'Используйте цикл for, чтобы вывести числа от 1 до 5 (включительно). Каждое число на новой строке.',
            ky: '1ден 5ке чейинки сандарды (кошуп) чыгаруу үчүн for циклин колдонуңуз. Ар бир сан жаңы сапта.'
          },
          starterCode: '# Напиши код здесь / Кодду бул жерге жазыңыз\n',
          expectedStdout: '1\n2\n3\n4\n5',
          explanationOnFail: {
            ru: 'Не забудьте, что правая граница в range() не включается! Используйте range(1, 6).',
            ky: 'range() оң чеги кошулбай турганын унутпаңыз! range(1, 6) колдонуңуз.'
          },
          explanationOnSuccess: {
            ru: 'Прекрасно! Вы освоили базовый цикл for.',
            ky: 'Эң сонун! Сиз негизги for циклин өздөштүрдүңүз.'
          }
        }
      ]
    },
    {
      id: 'for_collections',
      title: {
        ru: 'Цикл for по коллекциям',
        ky: 'Коллекциялар боюнча for цикли'
      },
      theory: {
        content: {
          ru: `
          <p>В Python цикл <code>for</code> невероятно силен. В других языках, чтобы пройти по списку, вам пришлось бы делать цикл с индексами (0, 1, 2...) и обращаться к списку по индексу. Python умеет перебирать элементы <strong>напрямую</strong>!</p>
          <pre><code>word = "Кот"
for letter in word:
    print(letter)</code></pre>
          <div class="trace">
            <div class="trace-title">По шагам:</div>
            <div class="trace-step"><span class="step-num">Шаг 1:</span> <span class="step-action">letter = "К"</span> <span class="step-result">→ выводится "К"</span></div>
            <div class="trace-step"><span class="step-num">Шаг 2:</span> <span class="step-action">letter = "о"</span> <span class="step-result">→ выводится "о"</span></div>
            <div class="trace-step"><span class="step-num">Шаг 3:</span> <span class="step-action">letter = "т"</span> <span class="step-result">→ выводится "т"</span></div>
          </div>
          
          <p>Точно так же это работает со списками (list) и кортежами (tuple):</p>
          <pre><code>users = ["Иван", "Мария", "Олег"]
for name in users:
    print(f"Привет, {name}!")</code></pre>
          
          <h3>Функция enumerate()</h3>
          <p>Что если нам нужен и сам элемент списка, и его индекс (порядковый номер 0, 1, 2...)? Для этого существует гениальная функция <code>enumerate()</code> (перечислить):</p>
          <pre><code>users = ["Иван", "Мария"]
for i, name in enumerate(users):
    print(f"Пользователь {i}: {name}")</code></pre>
          <div class="trace">
            <div class="trace-title">По шагам (enumerate):</div>
            <div class="trace-step"><span class="step-num">Шаг 1:</span> <span class="step-action">i = 0, name = "Иван"</span> <span class="step-result">→ выводится "Пользователь 0: Иван"</span></div>
            <div class="trace-step"><span class="step-num">Шаг 2:</span> <span class="step-action">i = 1, name = "Мария"</span> <span class="step-result">→ выводится "Пользователь 1: Мария"</span></div>
          </div>
          `,
          ky: `
          <p>Python'до <code>for</code> цикли абдан күчтүү. Башка тилдерде тизмени карап чыгуу үчүн индекстер (0, 1, 2...) менен цикл жасап, тизмеге индекс аркылуу кайрылууга туура келмек. Python элементтерди <strong>түздөн-түз</strong> карап чыгууну билет!</p>
          <pre><code>word = "Мышык"
for letter in word:
    print(letter)</code></pre>
          <div class="trace">
            <div class="trace-title">Кадамдар боюнча:</div>
            <div class="trace-step"><span class="step-num">Кадам 1:</span> <span class="step-action">letter = "М"</span> <span class="step-result">→ "М" чыгарылат</span></div>
            <div class="trace-step"><span class="step-num">Кадам 2:</span> <span class="step-action">letter = "ы"</span> <span class="step-result">→ "ы" чыгарылат</span></div>
            <div class="trace-step"><span class="step-num">Кадам 3:</span> <span class="step-action">letter = "ш"</span> <span class="step-result">→ "ш" чыгарылат</span></div>
            <div class="trace-step"><span class="step-num">Кадам 4:</span> <span class="step-action">letter = "ы"</span> <span class="step-result">→ "ы" чыгарылат</span></div>
            <div class="trace-step"><span class="step-num">Кадам 5:</span> <span class="step-action">letter = "к"</span> <span class="step-result">→ "к" чыгарылат</span></div>
          </div>
          
          <p>Бул тизмелер (list) жана кортеждер (tuple) менен да так ушундай иштейт:</p>
          <pre><code>users = ["Иван", "Мария", "Олег"]
for name in users:
    print(f"Салам, {name}!")</code></pre>
          
          <h3>enumerate() функциясы</h3>
          <p>Эгер бизге тизменин элементи да, анын индекси (катар номери 0, 1, 2...) да керек болсочу? Бул үчүн эң сонун <code>enumerate()</code> (санап чыгуу) функциясы бар:</p>
          <pre><code>users = ["Иван", "Мария"]
for i, name in enumerate(users):
    print(f"Колдонуучу {i}: {name}")</code></pre>
          <div class="trace">
            <div class="trace-title">Кадамдар боюнча (enumerate):</div>
            <div class="trace-step"><span class="step-num">Кадам 1:</span> <span class="step-action">i = 0, name = "Иван"</span> <span class="step-result">→ "Колдонуучу 0: Иван" чыгарылат</span></div>
            <div class="trace-step"><span class="step-num">Кадам 2:</span> <span class="step-action">i = 1, name = "Мария"</span> <span class="step-result">→ "Колдонуучу 1: Мария" чыгарылат</span></div>
          </div>
          `
        },
        analogy: {
          title: {
            ru: 'Конвейер с коробками',
            ky: 'Коробкалары бар конвейер'
          },
          content: {
            ru: 'Вместо того чтобы говорить "посмотри на 1-ю коробку, потом на 2-ю", Python берет коробку с ленты прямо вам в руки (переменная name), и вы с ней что-то делаете. А enumerate() дополнительно клеит на каждую коробку порядковый номер.',
            ky: '"1-коробканы кара, анан 2-ни" дегендин ордуна, Python коробканы лентадан түз эле колуңузга берет (name өзгөрмөсү) жана сиз аны менен бир нерсе жасайсыз. Ал эми enumerate() кошумча ар бир коробкага катар номерин чаптайт.'
          }
        }
      },
      guidedPractice: [
        {
          id: 'gp-coll-1',
          type: 'predict-output',
          question: {
            ru: 'Что выведет код?',
            ky: 'Код эмнени чыгарат?'
          },
          code: 'nums = [10, 20]\nfor n in nums:\n    print(n * 2)',
          options: [
            { ru: '10\\n20', ky: '10\\n20' },
            { ru: '20\\n40', ky: '20\\n40' },
            { ru: '0\\n1', ky: '0\\n1' }
          ],
          correctAnswer: '20\\n40',
          explanation: {
            ru: 'Цикл берет каждый элемент списка и умножает его на 2 перед выводом.',
            ky: 'Цикл тизменин ар бир элементин алып, чыгарар алдында 2ге көбөйтөт.'
          }
        }
      ],
      freePractice: [
        {
          id: 'fp-coll-1',
          type: 'code-run',
          question: {
            ru: 'Приветствие пользователей',
            ky: 'Колдонуучулар менен саламдашуу'
          },
          prompt: {
            ru: 'Напишите цикл for, который перебирает список `users = ["Tom", "Jerry"]` и выводит "Hello, Tom", затем "Hello, Jerry" (используйте f-строки).',
            ky: '`users = ["Tom", "Jerry"]` тизмесин карап чыгып, "Hello, Tom", андан кийин "Hello, Jerry" чыгара турган for циклин жазыңыз (f-саптарын колдонуңуз).'
          },
          starterCode: 'users = ["Tom", "Jerry"]\n# Напиши код здесь / Кодду бул жерге жазыңыз\n',
          expectedStdout: 'Hello, Tom\nHello, Jerry',
          explanationOnFail: {
            ru: 'Нужно использовать цикл `for user in users:` и `print(f"Hello, {user}")`',
            ky: '`for user in users:` циклин жана `print(f"Hello, {user}")` колдонуу керек'
          },
          explanationOnSuccess: {
            ru: 'Отлично! Перебор списков — одна из самых частых задач в программировании.',
            ky: 'Азаматсыз! Тизмелерди карап чыгуу — программалоодогу эң көп кездешүүчү маселелердин бири.'
          }
        }
      ]
    },
    {
      id: 'while_loop',
      title: {
        ru: 'Цикл while',
        ky: 'while цикли'
      },
      theory: {
        content: {
          ru: `
          <p>Цикл <code>while</code> (пока) выполняет код до тех пор, пока условие истинно (<code>True</code>).</p>
          <pre><code>count = 3
while count > 0:
    print(count)
    count = count - 1
print("Пуск!")</code></pre>
          <div class="trace">
            <div class="trace-title">По шагам:</div>
            <div class="trace-step"><span class="step-num">Перед циклом:</span> <span class="step-action">count = 3</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Проверка 1:</span> <span class="step-action">3 > 0 (True) → Входим в цикл</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Итерация 1:</span> <span class="step-action">print(3) → count = 3 - 1 (стало 2)</span> <span class="step-result">выводит 3</span></div>
            <div class="trace-step"><span class="step-num">Проверка 2:</span> <span class="step-action">2 > 0 (True) → Входим в цикл</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Итерация 2:</span> <span class="step-action">print(2) → count = 2 - 1 (стало 1)</span> <span class="step-result">выводит 2</span></div>
            <div class="trace-step"><span class="step-num">Проверка 3:</span> <span class="step-action">1 > 0 (True) → Входим в цикл</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Итерация 3:</span> <span class="step-action">print(1) → count = 1 - 1 (стало 0)</span> <span class="step-result">выводит 1</span></div>
            <div class="trace-step"><span class="step-num">Проверка 4:</span> <span class="step-action">0 > 0 (False) → ЦИКЛ ОКОНЧЕН</span> <span class="step-result">переход к print("Пуск!")</span></div>
          </div>
          
          <p>Обратите внимание: условие проверяется <strong>перед каждой</strong> итерацией, включая самую первую. Если изначально условие ложно (например, `count = 0`), цикл не выполнится ни разу!</p>

          <div class="warning">
            <strong>⚠️ Частая ошибка: Бесконечный цикл.</strong> Если вы забудете написать <code>count = count - 1</code> внутри цикла, значение <code>count</code> навсегда останется равным 3. Условие <code>3 > 0</code> всегда будет True, и цикл никогда не завершится (программа "зависнет"). Обязательно меняйте переменную условия внутри тела цикла!
          </div>
          `,
          ky: `
          <p><code>while</code> (пока/чейин) цикли шарт чын (<code>True</code>) болуп турганда кодду аткара берет.</p>
          <pre><code>count = 3
while count > 0:
    print(count)
    count = count - 1
print("Пуск!")</code></pre>
          <div class="trace">
            <div class="trace-title">Кадамдар боюнча:</div>
            <div class="trace-step"><span class="step-num">Циклге чейин:</span> <span class="step-action">count = 3</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Текшерүү 1:</span> <span class="step-action">3 > 0 (True) → Циклге киребиз</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Итерация 1:</span> <span class="step-action">print(3) → count = 3 - 1 (2 болду)</span> <span class="step-result">3 чыгарат</span></div>
            <div class="trace-step"><span class="step-num">Текшерүү 2:</span> <span class="step-action">2 > 0 (True) → Циклге киребиз</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Итерация 2:</span> <span class="step-action">print(2) → count = 2 - 1 (1 болду)</span> <span class="step-result">2 чыгарат</span></div>
            <div class="trace-step"><span class="step-num">Текшерүү 3:</span> <span class="step-action">1 > 0 (True) → Циклге киребиз</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Итерация 3:</span> <span class="step-action">print(1) → count = 1 - 1 (0 болду)</span> <span class="step-result">1 чыгарат</span></div>
            <div class="trace-step"><span class="step-num">Текшерүү 4:</span> <span class="step-action">0 > 0 (False) → ЦИКЛ АЯКТАДЫ</span> <span class="step-result">print("Пуск!") га өтүү</span></div>
          </div>
          
          <p>Көңүл буруңуз: шарт <strong>ар бир</strong> итерациянын алдында, анын ичинде эң биринчисинде да текшерилет. Эгер башында шарт жалган болсо (мисалы, `count = 0`), цикл бир да жолу аткарылбайт!</p>

          <div class="warning">
            <strong>⚠️ Көп кездешүүчү ката: Чексиз цикл.</strong> Эгерде сиз циклдин ичинде <code>count = count - 1</code> деп жазууну унутуп калсаңыз, <code>count</code> мааниси түбөлүккө 3кө барабар бойдон калат. <code>3 > 0</code> шарты ар дайым True болот жана цикл эч качан аяктабайт (программа "катып" калат). Циклдин денесиндеги шарт өзгөрмөсүн сөзсүз өзгөртүп туруңуз!
          </div>
          `
        },
        analogy: {
          title: {
            ru: 'Поездка в такси',
            ky: 'Таксидеги сапар'
          },
          content: {
            ru: 'while "ещё не приехали": "продолжаем ехать". Мы каждую минуту выглядываем в окно (проверяем условие). Как только условие стало False (приехали), мы выходим из цикла (выходим из такси).',
            ky: 'while "али жете элекпиз": "жүрүүнү улантабыз". Биз ар бир мүнөт сайын терезени карайбыз (шартты текшеребиз). Шарт False болгондо (жеткенде), биз циклден чыгабыз (таксиден түшөбүз).'
          }
        }
      },
      guidedPractice: [
        {
          id: 'gp-while-1',
          type: 'predict-output',
          question: {
            ru: 'Что выведет этот код?',
            ky: 'Бул код эмнени чыгарат?'
          },
          code: 'x = 0\nwhile x > 5:\n    print(x)\n    x += 1',
          options: [
            { ru: '0, 1, 2, 3, 4', ky: '0, 1, 2, 3, 4' },
            { ru: 'Бесконечный цикл', ky: 'Чексиз цикл' },
            { ru: 'Ничего', ky: 'Эч нерсе' }
          ],
          correctAnswer: 'Ничего',
          explanation: {
            ru: 'При первой же проверке 0 > 5 даёт False, поэтому тело цикла даже не начнет выполняться.',
            ky: 'Биринчи эле текшерүүдө 0 > 5 False берет, ошондуктан циклдин денеси таптакыр аткарылбайт.'
          }
        }
      ],
      freePractice: [
        {
          id: 'fp-while-1',
          type: 'code-run',
          question: {
            ru: 'Удвоение чисел',
            ky: 'Сандарды эки эсе көбөйтүү'
          },
          prompt: {
            ru: 'С помощью цикла while выводите значение переменной x, а затем умножайте ее на 2. Цикл должен работать, пока x <= 10. Стартовое значение x = 2.',
            ky: 'while циклинин жардамы менен x өзгөрмөсүнүн маанисин чыгарып, андан кийин аны 2ге көбөйтүңүз. Цикл x <= 10 болуп турганда иштеши керек. Баштапкы мааниси x = 2.'
          },
          starterCode: 'x = 2\n# Напиши код здесь / Кодду бул жерге жазыңыз\n',
          expectedStdout: '2\n4\n8',
          explanationOnFail: {
            ru: 'Цикл должен быть: while x <= 10, внутри print(x), затем x = x * 2.',
            ky: 'Цикл мындай болушу керек: while x <= 10, ичинде print(x), андан кийин x = x * 2.'
          },
          explanationOnSuccess: {
            ru: 'Отлично! Цикл while работает правильно.',
            ky: 'Азаматсыз! while цикли туура иштейт.'
          }
        }
      ]
    },
    {
      id: 'loop_control',
      title: {
        ru: 'Управление циклом: break и continue',
        ky: 'Циклди башкаруу: break жана continue'
      },
      theory: {
        content: {
          ru: `
          <p>В Python есть специальные команды для изменения работы циклов.</p>
          <h3>break (Сломать)</h3>
          <p>Команда <code>break</code> досрочно и немедленно прекращает выполнение всего цикла.</p>
          <pre><code>for i in range(1, 10):
    if i == 4:
        break
    print(i)</code></pre>
          <p>Этот код выведет <code>1</code>, <code>2</code>, <code>3</code>. На шаге <code>i = 4</code> сработает условие, выполнится <code>break</code>, и цикл <strong>полностью завершится</strong>.</p>
          
          <h3>continue (Продолжить)</h3>
          <p>Команда <code>continue</code> прерывает только <strong>текущую итерацию (текущий шаг)</strong> и сразу прыгает к началу следующей итерации.</p>
          <pre><code>for i in range(1, 6):
    if i == 3:
        continue
    print(i)</code></pre>
          <p>Этот код выведет <code>1</code>, <code>2</code>, <code>4</code>, <code>5</code>. На шаге <code>i = 3</code> срабатывает <code>continue</code>. Программа пропускает оставшийся код в цикле (<code>print</code>) и переходит сразу к <code>i = 4</code>.</p>

          <div class="warning">
            <strong>⚠️ Разница:</strong> <code>break</code> выкидывает вас из цикла навсегда. <code>continue</code> просто перепрыгивает текущий шаг, но цикл продолжает работу.
          </div>
          `,
          ky: `
          <p>Python'до циклдердин иштешин өзгөртүү үчүн атайын буйруктар бар.</p>
          <h3>break (Сындыруу)</h3>
          <p><code>break</code> буйругу мөөнөтүнөн мурда жана дароо бүт циклдин аткарылышын токтотот.</p>
          <pre><code>for i in range(1, 10):
    if i == 4:
        break
    print(i)</code></pre>
          <p>Бул код <code>1</code>, <code>2</code>, <code>3</code> чыгарат. <code>i = 4</code> кадамында шарт иштеп, <code>break</code> аткарылат жана цикл <strong>толугу менен токтойт</strong>.</p>
          
          <h3>continue (Улантуу)</h3>
          <p><code>continue</code> буйругу <strong>учурдагы итерацияны (учурдагы кадамды)</strong> гана үзүп, дароо кийинки итерациянын башталышына секирет.</p>
          <pre><code>for i in range(1, 6):
    if i == 3:
        continue
    print(i)</code></pre>
          <p>Бул код <code>1</code>, <code>2</code>, <code>4</code>, <code>5</code> чыгарат. <code>i = 3</code> кадамында <code>continue</code> иштейт. Программа циклдин калган бөлүгүн (<code>print</code>) өткөрүп жиберип, дароо <code>i = 4</code>кө өтөт.</p>

          <div class="warning">
            <strong>⚠️ Айырмасы:</strong> <code>break</code> сизди циклден биротоло ыргытат. <code>continue</code> жөн гана учурдагы кадамды секирип өтөт, бирок цикл ишин улантат.
          </div>
          `
        },
        analogy: {
          title: {
            ru: 'Коробка с яблоками',
            ky: 'Алмалары бар коробка'
          },
          content: {
            ru: 'Вы перебираете яблоки. Если находите червивое яблоко и выбрасываете его, берясь за следующее — это continue. Если вы находите паука, бросаете коробку с криком и убегаете — это break.',
            ky: 'Сиз алмаларды карап жатасыз. Эгер курт түшкөн алма таап, аны ыргытып, кийинкисин алсаңыз — бул continue. Эгер жөргөмүш таап алып, коробканы ыргытып кыйкырып качып кетсеңиз — бул break.'
          }
        }
      },
      guidedPractice: [
        {
          id: 'gp-ctrl-1',
          type: 'predict-output',
          question: {
            ru: 'Что выведет этот код?',
            ky: 'Бул код эмнени чыгарат?'
          },
          code: 'for i in range(1, 4):\n    if i == 2:\n        break\n    print(i)',
          options: [
            { ru: '1\\n3', ky: '1\\n3' },
            { ru: '1', ky: '1' },
            { ru: '2', ky: '2' }
          ],
          correctAnswer: '1',
          explanation: {
            ru: 'Когда i станет 2, break полностью остановит цикл, поэтому 2 и 3 не выведутся.',
            ky: 'i 2 болгондо, break циклди толугу менен токтотот, ошондуктан 2 жана 3 чыгарылбайт.'
          }
        }
      ],
      freePractice: []
    },
    {
      id: 'nested_loops',
      title: {
        ru: 'Вложенные циклы',
        ky: 'Ички циклдер'
      },
      theory: {
        content: {
          ru: `
          <p>Внутри одного цикла можно запускать другой цикл! Это называется <strong>вложенными циклами</strong>. Внешний цикл отсчитывает "большие шаги", а внутренний выполняет свои действия полностью на <em>каждом</em> шаге внешнего.</p>
          <pre><code>for i in range(1, 3):       # Внешний цикл (1, 2)
    for j in range(1, 4):   # Внутренний цикл (1, 2, 3)
        print(f"i={i}, j={j}")</code></pre>
          <div class="trace">
            <div class="trace-title">По шагам:</div>
            <div class="trace-step"><span class="step-num">Внешний i=1</span> <span class="step-action">Запускается внутренний j от 1 до 3</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Внутр. i=1, j=1</span> <span class="step-action">print(i=1, j=1)</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Внутр. i=1, j=2</span> <span class="step-action">print(i=1, j=2)</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Внутр. i=1, j=3</span> <span class="step-action">print(i=1, j=3) → Внутренний завершён!</span> <span class="step-result"></span></div>
            
            <div class="trace-step"><span class="step-num">Внешний i=2</span> <span class="step-action">СНОВА запускается внутренний j от 1 до 3</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Внутр. i=2, j=1</span> <span class="step-action">print(i=2, j=1)</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Внутр. i=2, j=2</span> <span class="step-action">print(i=2, j=2)</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Внутр. i=2, j=3</span> <span class="step-action">print(i=2, j=3) → Внутренний завершён!</span> <span class="step-result"></span></div>
          </div>
          <p>Вложенные циклы часто используются для работы с таблицами, пикселями изображений или координатами (X и Y).</p>
          `,
          ky: `
          <p>Бир циклдин ичинде башка циклди иштетүүгө болот! Бул <strong>ички циклдер</strong> деп аталат. Тышкы цикл "чоң кадамдарды" санайт, ал эми ички цикл тышкы циклдин <em>ар бир</em> кадамында өз аракеттерин толугу менен аткарат.</p>
          <pre><code>for i in range(1, 3):       # Тышкы цикл (1, 2)
    for j in range(1, 4):   # Ички цикл (1, 2, 3)
        print(f"i={i}, j={j}")</code></pre>
          <div class="trace">
            <div class="trace-title">Кадамдар боюнча:</div>
            <div class="trace-step"><span class="step-num">Тышкы i=1</span> <span class="step-action">Ички j 1ден 3кө чейин башталат</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Ички i=1, j=1</span> <span class="step-action">print(i=1, j=1)</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Ички i=1, j=2</span> <span class="step-action">print(i=1, j=2)</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Ички i=1, j=3</span> <span class="step-action">print(i=1, j=3) → Ички цикл аяктады!</span> <span class="step-result"></span></div>
            
            <div class="trace-step"><span class="step-num">Тышкы i=2</span> <span class="step-action">КАЙРАДАН ички j 1ден 3кө чейин башталат</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Ички i=2, j=1</span> <span class="step-action">print(i=2, j=1)</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Ички i=2, j=2</span> <span class="step-action">print(i=2, j=2)</span> <span class="step-result"></span></div>
            <div class="trace-step"><span class="step-num">Ички i=2, j=3</span> <span class="step-action">print(i=2, j=3) → Ички цикл аяктады!</span> <span class="step-result"></span></div>
          </div>
          <p>Ички циклдер таблицалар, сүрөттүн пикселдери же координаттар (X жана Y) менен иштөөдө көп колдонулат.</p>
          `
        },
        analogy: {
          title: {
            ru: 'Уборка в доме',
            ky: 'Үйдү тазалоо'
          },
          content: {
            ru: 'Внешний цикл — это "Пройти по каждой комнате". Внутренний цикл — "Протереть каждый угол в этой комнате". Вы не перейдете в новую комнату, пока не протрете все углы в текущей.',
            ky: 'Тышкы цикл — бул "Ар бир бөлмөнү кыдырып чыгуу". Ички цикл — "Бул бөлмөдөгү ар бир бурчту сүртүү". Сиз учурдагы бөлмөнүн бардык бурчтарын сүртүп бүтмөйүнчө жаңы бөлмөгө өтпөйсүз.'
          }
        }
      },
      guidedPractice: [
        {
          id: 'gp-nest-1',
          type: 'predict-output',
          question: {
            ru: 'Сколько раз вызовется функция print в этом коде?',
            ky: 'Бул коддо print функциясы канча жолу чакырылат?'
          },
          code: 'for i in range(2):\n    for j in range(3):\n        print("Hi!")',
          options: [
            { ru: '2', ky: '2' },
            { ru: '5', ky: '5' },
            { ru: '6', ky: '6' }
          ],
          correctAnswer: '6',
          explanation: {
            ru: 'Внешний цикл выполнится 2 раза. Для каждого из этих 2 раз внутренний выполнится 3 раза. Итого: 2 * 3 = 6 раз.',
            ky: 'Тышкы цикл 2 жолу аткарылат. Бул 2 жолунун ар бири үчүн ички цикл 3 жолу аткарылат. Жалпысынан: 2 * 3 = 6 жолу.'
          }
        }
      ],
      freePractice: []
    }
  ],
  test: [
    {
      id: 'test-5-1',
      type: 'multiple-choice',
      question: {
        ru: 'Какую последовательность сгенерирует range(5)?',
        ky: 'range(5) кандай тизмекти түзөт?'
      },
      options: [
        { ru: '1, 2, 3, 4, 5', ky: '1, 2, 3, 4, 5' },
        { ru: '0, 1, 2, 3, 4', ky: '0, 1, 2, 3, 4' },
        { ru: '0, 1, 2, 3, 4, 5', ky: '0, 1, 2, 3, 4, 5' }
      ],
      correctAnswer: '0, 1, 2, 3, 4',
      explanation: {
        ru: 'Отсчет начинается с 0, а 5 (граница) не включается.',
        ky: 'Саноо 0дөн башталат, ал эми 5 (чек) кошулбайт.'
      }
    },
    {
      id: 'test-5-2',
      type: 'predict-output',
      question: {
        ru: 'Что выведет этот код?',
        ky: 'Бул код эмнени чыгарат?'
      },
      code: 'for i in range(3, 6):\n    print(i)',
      options: [
        { ru: '3\\n4\\n5', ky: '3\\n4\\n5' },
        { ru: '3\\n4\\n5\\n6', ky: '3\\n4\\n5\\n6' },
        { ru: '0\\n1\\n2', ky: '0\\n1\\n2' }
      ],
      correctAnswer: '3\\n4\\n5',
      explanation: {
        ru: 'Начинаем с 3, заканчиваем ПЕРЕД 6.',
        ky: '3төн баштайбыз, 6нын АЛДЫНДА токтойбуз.'
      }
    },
    {
      id: 'test-5-3',
      type: 'multiple-choice',
      question: {
        ru: 'Какая команда используется для пропуска текущего шага в цикле?',
        ky: 'Циклдеги учурдагы кадамды өткөрүп жиберүү үчүн кайсы буйрук колдонулат?'
      },
      options: [
        { ru: 'stop', ky: 'stop' },
        { ru: 'continue', ky: 'continue' },
        { ru: 'break', ky: 'break' }
      ],
      correctAnswer: 'continue',
      explanation: {
        ru: 'continue пропускает итерацию, break полностью останавливает цикл.',
        ky: 'continue итерацияны өткөрүп жиберет, break циклди толугу менен токтотот.'
      }
    },
    {
      id: 'test-5-4',
      type: 'predict-output',
      question: {
        ru: 'Что выведет этот код?',
        ky: 'Бул код эмнени чыгарат?'
      },
      code: 'count = 5\nwhile count < 5:\n    print(count)\n    count += 1',
      options: [
        { ru: '5', ky: '5' },
        { ru: 'Бесконечный цикл', ky: 'Чексиз цикл' },
        { ru: 'Ничего', ky: 'Эч нерсе' }
      ],
      correctAnswer: 'Ничего',
      explanation: {
        ru: 'Условие 5 < 5 сразу дает False, поэтому цикл не выполнится.',
        ky: '5 < 5 шарты дароо False берет, ошондуктан цикл аткарылбайт.'
      }
    },
    {
      id: 'test-5-5',
      type: 'predict-output',
      question: {
        ru: 'Что выведет код?',
        ky: 'Код эмнени чыгарат?'
      },
      code: 'for x in range(1, 4):\n    if x == 2:\n        break\n    print(x)',
      options: [
        { ru: '1\\n3', ky: '1\\n3' },
        { ru: '1', ky: '1' },
        { ru: '2\\n3', ky: '2\\n3' }
      ],
      correctAnswer: '1',
      explanation: {
        ru: 'Когда x становится 2, цикл полностью прекращается (break).',
        ky: 'x 2 болгондо, цикл толугу менен токтойт (break).'
      }
    },
    {
      id: 'test-5-6',
      type: 'predict-output',
      question: {
        ru: 'Что выведет код с вложенными циклами?',
        ky: 'Ички циклдери бар код эмнени чыгарат?'
      },
      code: 'for i in range(1, 3):\n    for j in range(1, 3):\n        print(f"{i}{j}")',
      options: [
        { ru: '11\\n22', ky: '11\\n22' },
        { ru: '11\\n12\\n21\\n22', ky: '11\\n12\\n21\\n22' },
        { ru: '1\\n2\\n1\\n2', ky: '1\\n2\\n1\\n2' }
      ],
      correctAnswer: '11\\n12\\n21\\n22',
      explanation: {
        ru: 'Для каждого i внутренний цикл полностью пробегает j=1 и j=2.',
        ky: 'Ар бир i үчүн ички цикл j=1 жана j=2ни толугу менен басып өтөт.'
      }
    }
  ]
};
"""

with open('src/data/lessons/lesson-5-loops.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("lesson-5-loops.ts generated successfully with ALL requirements.")
