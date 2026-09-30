import { LocalizedText, TString } from '@/types/lesson';

export function t(text: TString, lang: 'ru' | 'ky'): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[lang] || text.ru;
}

export const uiStrings: Record<'ru' | 'ky', Record<string, string>> = {
  ru: {
    back: 'Назад',
    next: 'Далее',
    understoodNext: 'Понятно, дальше',
    runAndCheck: 'Запустить и проверить',
    retakeTest: 'Пройти тест заново',
    toHome: 'На главную',
    output: 'ВЫВОД ПРОГРАММЫ',
    analogy: 'Аналогия из жизни',
    warning: '⚠️ Частая ошибка',
    whatWeLearned: 'Что мы выучили сегодня:',
    correct: 'Верно!',
    incorrect: 'Неверно',
    loading: 'Загрузка...',
    preparingSandbox: 'Готовим песочницу для кода...',
    lesson: 'Занятие',
    soon: 'скоро появится',
    understanding: 'Понимание',
    training: 'Тренировка',
    practice: 'Практика',
    finalTest: 'Финальный тест',
    question: 'Вопрос',
    of: 'из',
    nextQuestion: 'Следующий вопрос',
    finish: 'Завершить',
    lessonResults: 'Итоги занятия',
    dataTypesPerformance: 'Успеваемость по типам данных:',
    mistakesAndAnswers: 'Ошибки и правильные ответы',
    q: 'В:',
    expected: 'Ожидалось:',
    excellent: 'Отлично!',
    error: 'Ошибка.',
    codeMustPerformRightActions: 'Код должен выполнить правильные действия',
    done: 'Выполнено',
    check: 'Проверить'
  },
  ky: {
    back: 'Артка',
    next: 'Кийинки',
    understoodNext: 'Түшүнүктүү, кийинкиси',
    runAndCheck: 'Иштетүү жана текшерүү',
    retakeTest: 'Тестти кайра тапшыруу',
    toHome: 'Башкы бетке',
    output: 'ПРОГРАММАНЫН ЖЫЙЫНТЫГЫ',
    analogy: 'Турмуштан аналогия',
    warning: '⚠️ Көп кездешүүчү ката',
    whatWeLearned: 'Бүгүн эмнени үйрөндүк:',
    correct: 'Туура!',
    incorrect: 'Туура эмес',
    loading: 'Жүктөлүүдө...',
    preparingSandbox: 'Код үчүн кумкороо даярдалууда...',
    lesson: 'Сабак',
    soon: 'жакында чыгат',
    understanding: 'Түшүнүү',
    training: 'Машыгуу',
    practice: 'Практика',
    finalTest: 'Жыйынтыктоочу тест',
    question: 'Суроо',
    of: '/',
    nextQuestion: 'Кийинки суроо',
    finish: 'Аяктоо',
    lessonResults: 'Сабактын жыйынтыгы',
    dataTypesPerformance: 'Маалымат типтери боюнча жетишкендик:',
    mistakesAndAnswers: 'Каталар жана туура жооптор',
    q: 'С:',
    expected: 'Күтүлгөн:',
    excellent: 'Азаматсыз!',
    error: 'Ката.',
    codeMustPerformRightActions: 'Код туура аракеттерди аткарышы керек',
    done: 'Аткарылды',
    check: 'Текшерүү'
  }
};

export function tUi(key: string, lang: 'ru' | 'ky'): string {
  return uiStrings[lang][key] || uiStrings.ru[key] || key;
}
