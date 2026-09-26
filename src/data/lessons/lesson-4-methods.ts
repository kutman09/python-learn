import { LessonContent } from '@/types/lesson';

export const lesson4: LessonContent = {
  id: 'lesson-4',
  slug: 'lesson-4-methods',
  title: 'Занятие 4: Методы и встроенные функции',
  description: 'Учимся управлять данными с помощью встроенных инструментов Python. Блоки изменяемых и неизменяемых типов.',
  summary: [
    'Методы списков (list) вроде append() и sort() изменяют сам список "на месте" и ничего не возвращают (None).',
    'Множества (set) не имеют порядка и не хранят дубликаты. Метод discard() безопаснее remove().',
    'Метод get() у словаря (dict) позволяет безопасно получить значение по ключу (не вызовет ошибку, если ключа нет).',
    'Методы строк (str), такие как upper(), lower(), replace(), возвращают НОВУЮ строку. Сама исходная строка не меняется.',
    'Срезы (slice), например [::-1], помогают быстро развернуть список, строку или кортеж.',
    'Встроенные функции max(), min(), sum(), len(), sorted() работают почти с любыми коллекциями.'
  ],
  topics: [
    {
      id: 'methods_list',
      title: 'Методы списков (list)',
      theory: {
        content: `
          <p>В Занятии 1 мы узнали, что списки (<strong>list</strong>) — это <em>изменяемые (mutable)</em> коллекции. Значит, мы можем модифицировать их прямо в памяти. Для этого у списков есть <strong>методы</strong> (функции, которые "привязаны" к объекту и вызываются через точку).</p>
          <ul>
            <li><code>.append(x)</code> — добавляет элемент в конец списка.</li>
            <li><code>.insert(i, x)</code> — вставляет элемент x на позицию (индекс) i.</li>
            <li><code>.extend(list2)</code> — приклеивает элементы другого списка в конец.</li>
            <li><code>.remove(x)</code> — удаляет первое совпадение элемента x (ошибка, если такого нет).</li>
            <li><code>.pop(i)</code> — удаляет и возвращает элемент по индексу (по умолчанию последний).</li>
            <li><code>.clear()</code> — очищает список.</li>
            <li><code>.sort()</code> — сортирует список (по возрастанию / алфавиту).</li>
            <li><code>.reverse()</code> — разворачивает список задом наперед.</li>
          </ul>
          <h3>Встроенные функции и фишки</h3>
          <p>В Python есть функции, которые можно применять к спискам (и не только): <code>max(L)</code>, <code>min(L)</code>, <code>sum(L)</code>, <code>len(L)</code> (узнать длину). <code>sorted(L)</code> вернет новый отсортированный список, не меняя старый.</p>
          <p>Еще есть "срезы". Например, <code>L[::-1]</code> вернет новую копию списка, но задом наперед.</p>
          <div class="warning">
            <strong>⚠️ Частая ошибка:</strong> Написать <code>L = L.append(5)</code>. Методы вроде <code>append</code> или <code>sort</code> меняют список "на месте" (in-place) и возвращают "Ничто" (None). Если вы присвоите это обратно в L, ваш список превратится в None и пропадет! Правильно писать просто: <code>L.append(5)</code> на отдельной строке.
          </div>
        `,
        analogy: {
          title: 'Полка с инструментами',
          content: 'Методы списка — это как разные действия с полкой в гараже. append — это положить отвертку с краю. insert — втиснуть ее между молотком и пилой. clear — смахнуть все с полки одним движением. Вам не нужно покупать новую полку (in-place изменение).'
        }
      },
      guidedPractice: [
        {
          id: 'gp-list-1',
          type: 'predict-output',
          question: 'Что выведет этот код?',
          code: 'nums = [1, 2, 3]\nnums.append(4)\nprint(nums)',
          options: ['[1, 2, 3]', '[1, 2, 3, 4]', 'None', 'Ошибка'],
          correctAnswer: '[1, 2, 3, 4]',
          explanation: 'Метод append добавляет элемент в конец списка.'
        },
        {
          id: 'gp-list-2',
          type: 'predict-output',
          question: 'Что выведет этот код?',
          code: 'nums = [3, 1, 2]\nres = nums.sort()\nprint(res)',
          options: ['[1, 2, 3]', '[3, 1, 2]', 'None'],
          correctAnswer: 'None',
          explanation: 'Метод sort() меняет список на месте и ничего не возвращает (None). Сама переменная nums отсортировалась, но в res попал None.'
        }
      ],
      freePractice: [
        {
          id: 'fp-list-1',
          type: 'code-run',
          question: 'Напиши код',
          prompt: 'У вас есть список `heroes = ["Бэтмен", "Супермен"]`. Добавьте в него "Флеш" с помощью метода `append`, а затем выведите длину списка с помощью `len()`.',
          starterCode: 'heroes = ["Бэтмен", "Супермен"]\n# Ваш код:\n',
          expectedStdout: '3',
          explanationOnFail: 'Не забудьте сначала вызвать heroes.append("Флеш"), а на следующей строке print(len(heroes)).',
          explanationOnSuccess: 'Отлично! append изменил список на месте.',
          explanation: ''
        }
      ]
    },
    {
      id: 'methods_set',
      title: 'Методы множеств (set)',
      theory: {
        content: `
          <p>Множество (<strong>set</strong>) — это мешок с уникальными элементами без какого-либо порядка.</p>
          <p>Чтобы создать пустое множество, нужно писать <code>set()</code>, потому что пустые скобки <code>{}</code> создадут словарь (dict)! Заполненное множество выглядит так: <code>{1, 2, 3}</code>.</p>
          <ul>
            <li><code>.add(x)</code> — добавить элемент.</li>
            <li><code>.remove(x)</code> — удалить элемент. Выдаст ошибку KeyError, если такого элемента нет.</li>
            <li><code>.discard(x)</code> — удалить элемент. Если элемента нет, просто промолчит (безопаснее).</li>
            <li><code>.union(other)</code> — объединить два множества.</li>
            <li><code>.intersection(other)</code> — пересечение (что общего у множеств).</li>
          </ul>
          <p>Множества не поддерживают индексы (нельзя сделать <code>my_set[0]</code>) и срезы. Если вам нужно отсортировать множество и получить его задом наперед, используйте <code>sorted(my_set, reverse=True)</code> — это вернет вам отсортированный список (list).</p>
        `,
        analogy: {
          title: 'Коробка с уникальными наклейками',
          content: 'Множество — это коробка. Вы можете кинуть туда наклейку с Пикачу (add). Если кинете еще одну такую же, она магическим образом исчезнет, потому что дубликаты запрещены. Вы не можете попросить "дай мне вторую наклейку", потому что в коробке всё перемешано (нет порядка).'
        }
      },
      guidedPractice: [
        {
          id: 'gp-set-1',
          type: 'predict-output',
          question: 'Что выведет этот код?',
          code: 's = {1, 2, 2, 3}\ns.discard(10)\nprint(len(s))',
          options: ['4', '3', '2', 'Ошибка'],
          correctAnswer: '3',
          explanation: 'В множестве {1, 2, 2, 3} дубликаты удаляются, остается {1, 2, 3} (длина 3). discard(10) не находит 10 и просто ничего не делает. Выведется 3.'
        }
      ],
      freePractice: [
        {
          id: 'fp-set-1',
          type: 'code-run',
          question: 'Напиши код',
          prompt: 'Создайте пустое множество в переменной `uniq` (вспомните, как правильно!). Добавьте в него число 5. Выведите множество.',
          starterCode: '# Ваш код:\n',
          checkScript: 'assert type(uniq) == set, "Переменная uniq должна быть типа set"\nassert 5 in uniq, "В множестве нет числа 5"',
          explanationOnFail: 'Пустое множество создается так: uniq = set()',
          explanationOnSuccess: 'Верно! {} создает словарь, а set() — множество.',
          explanation: ''
        }
      ]
    },
    {
      id: 'methods_dict',
      title: 'Методы словарей (dict)',
      theory: {
        content: `
          <p>Словарь (<strong>dict</strong>) хранит пары ключ-значение.</p>
          <ul>
            <li><code>.get(key)</code> — безопасный способ получить значение. Если написать <code>d["возраст"]</code>, а такого ключа нет, программа упадет с ошибкой. Если написать <code>d.get("возраст")</code>, она не упадет, а тихо вернет <code>None</code> (или значение по умолчанию, если написать <code>d.get("возраст", 0)</code>).</li>
            <li><code>.keys()</code> — возвращает все ключи.</li>
            <li><code>.values()</code> — возвращает все значения.</li>
            <li><code>.items()</code> — возвращает пары (ключ, значение). Очень удобно для циклов!</li>
            <li><code>.pop(key)</code> — удаляет ключ и возвращает его значение.</li>
            <li><code>.copy()</code> — создает поверхностную копию словаря. Помните: словари изменяемы. Если написать <code>d2 = d1</code>, то это одна и та же записная книжка в памяти. Измените d2 — изменится и d1. А вот <code>d2 = d1.copy()</code> сделает вам отдельную книжку.</li>
          </ul>
        `,
        analogy: {
          title: 'Вежливый библиотекарь (.get)',
          content: 'Если вы ищете книгу в архиве сами (квадратные скобки) и ее там нет, вы впадаете в панику (ошибка KeyError). Если вы просите библиотекаря (.get), он идет проверять и вежливо говорит "Такой книги нет (None)", и вы спокойно живете дальше.'
        }
      },
      guidedPractice: [
        {
          id: 'gp-dict-1',
          type: 'predict-output',
          question: 'Что выведет код?',
          code: 'user = {"name": "Ivan"}\nprint(user.get("age", 18))',
          options: ['None', '18', 'Ошибка'],
          correctAnswer: '18',
          explanation: 'Метод get ищет ключ "age". Так как его нет, он возвращает дефолтное значение 18, которое мы передали вторым аргументом.'
        }
      ],
      freePractice: [
        {
          id: 'fp-dict-1',
          type: 'code-run',
          question: 'Напиши код',
          prompt: 'У вас есть словарь `car = {"brand": "BMW"}`. Скопируйте его в `car2` с помощью метода copy(), добавьте в `car2` ключ "color" со значением "red". Выведите `car2`.',
          starterCode: 'car = {"brand": "BMW"}\n# Ваш код:\n',
          expectedStdout: "{'brand': 'BMW', 'color': 'red'}",
          explanationOnFail: 'Не забудьте использовать car.copy().',
          explanationOnSuccess: 'Отлично! Вы скопировали словарь и модифицировали только копию.',
          explanation: ''
        }
      ]
    },
    {
      id: 'methods_immutable',
      title: 'Методы строк (str) и кортежей (tuple)',
      theory: {
        content: `
          <h3>Строки (str)</h3>
          <p>Самое главное правило: <strong>строки неизменяемы (immutable)</strong>. Любой метод строки возвращает <strong>новую</strong> строку.</p>
          <ul>
            <li><code>.upper()</code> / <code>.lower()</code> — переводит все буквы в верхний/нижний регистр.</li>
            <li><code>.title()</code> / <code>.capitalize()</code> — каждое слово с большой буквы / только первая буква с большой.</li>
            <li><code>.split(sep)</code> — режет строку на список (list) кусочков по разделителю. Например: <code>"яблоко,банан".split(",")</code> вернет <code>["яблоко", "банан"]</code>.</li>
            <li><code>.replace(old, new)</code> — заменяет старые куски на новые.</li>
          </ul>
          <p>А как развернуть строку? Метода .reverse() у нее нет (потому что она неизменяема!). Мы используем срез: <code>"привет"[::-1]</code> вернет <code>"тевирп"</code>.</p>
          
          <h3>Кортежи (tuple)</h3>
          <p>Они тоже неизменяемы. У них нет методов append или remove. Зато мы можем применять к ним встроенные функции: <code>max(t)</code>, <code>min(t)</code>, <code>sum(t)</code>, <code>len(t)</code>. И еще их можно разворачивать срезом: <code>t[::-1]</code>.</p>
          <div class="warning">
            <strong>⚠️ Частая ошибка:</strong> Написать <code>text.upper()</code> и забыть сохранить результат. Компьютер переведет строку в верхний регистр и тут же выбросит ее в мусорку. Правильно: <code>text = text.upper()</code>.
          </div>
        `,
        analogy: {
          title: 'Штамповочный пресс (Методы строк)',
          content: 'Если вы отправляете кусок железа (строку) в пресс .upper(), он не меняет оригинальный кусок. Он оставляет его вам, а из трубы выплевывает совершенно новый, сияющий кусок железа большими буквами. Если вы не подставите под трубу корзину (не присвоите в переменную), новый кусок просто упадет на пол.'
        }
      },
      guidedPractice: [
        {
          id: 'gp-str-1',
          type: 'predict-output',
          question: 'Что выведет этот код?',
          code: 'msg = "Привет"\nmsg.upper()\nprint(msg)',
          options: ['ПРИВЕТ', 'Привет', 'Ошибка'],
          correctAnswer: 'Привет',
          explanation: 'Метод upper() возвращает новую строку, но мы её никуда не сохранили. Оригинальная переменная msg осталась неизменной.'
        },
        {
          id: 'gp-str-2',
          type: 'predict-output',
          question: 'Что выведет этот код?',
          code: 'text = "cat"\nprint(text[::-1])',
          options: ['cat', 'tac', 'Ошибка'],
          correctAnswer: 'tac',
          explanation: 'Срез [::-1] разворачивает строку.'
        }
      ],
      freePractice: [
        {
          id: 'fp-str-1',
          type: 'code-run',
          question: 'Напиши код',
          prompt: 'У вас есть строка `data = "один два три"`. Превратите ее в список (list) с помощью метода split() (разделитель по умолчанию - пробел) и выведите на экран.',
          starterCode: 'data = "один два три"\n# Ваш код:\n',
          expectedStdout: "['один', 'два', 'три']",
          explanationOnFail: 'Используйте data.split().',
          explanationOnSuccess: 'Правильно! split() разрезает строку и выдает список.',
          explanation: ''
        }
      ]
    }
  ],
  test: [
    {
      id: 'test-4-1',
      type: 'multiple-choice',
      question: 'Какой метод списка добавляет элемент в конец, изменяя сам список?',
      options: ['add()', 'push()', 'insert()', 'append()'],
      correctAnswer: 'append()',
      explanation: 'В Python для добавления в конец списка используется append().'
    },
    {
      id: 'test-4-2',
      type: 'predict-output',
      question: 'Что вернет код?',
      code: 'words = ["hello", "world"]\nres = words.reverse()\nprint(res)',
      options: ['["world", "hello"]', 'None', 'Ошибка'],
      correctAnswer: 'None',
      explanation: 'reverse() меняет список на месте и возвращает None.'
    },
    {
      id: 'test-4-3',
      type: 'multiple-choice',
      question: 'Как безопасно удалить элемент из множества (set), чтобы не было ошибки, если элемента там нет?',
      options: ['remove()', 'discard()', 'pop()', 'delete()'],
      correctAnswer: 'discard()',
      explanation: 'discard() удаляет элемент, если он есть, и молчит, если его нет.'
    },
    {
      id: 'test-4-4',
      type: 'predict-output',
      question: 'Что выведет код?',
      code: 'd = {"a": 1}\nprint(d.get("b"))',
      options: ['1', 'Ошибка KeyError', 'None'],
      correctAnswer: 'None',
      explanation: 'Метод get() безопасно возвращает None, если ключа нет.'
    },
    {
      id: 'test-4-5',
      type: 'predict-output',
      question: 'Что вернет код?',
      code: 's = "Python"\ns[0] = "J"\nprint(s)',
      options: ['Jython', 'Python', 'Ошибка'],
      correctAnswer: 'Ошибка',
      explanation: 'Строки неизменяемы, поэтому нельзя просто переназначить букву по индексу.'
    }
  ]
};
