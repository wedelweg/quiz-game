import type { Topic } from "../utils/types";

export const topics: Topic[] = [
    {
        title: "JS",
        questions: [
            {
                price: 100,
                question: "Что такое переменная в JavaScript?",
                answer: "Это именованное хранилище для данных."
            },
            {
                price: 200,
                question: "Чем отличается let от var?",
                answer: "let — блочная область видимости, var — функциональная."
            },
            {
                price: 300,
                question: "Что такое массив?",
                answer: "Это упорядоченная коллекция элементов."
            },
            {
                price: 400,
                question: "Что делает метод map()?",
                answer: "Создаёт новый массив, применяя функцию к каждому элементу."
            },
            {
                price: 500,
                question: "Что такое замыкание (closure)?",
                answer: "Функция, которая запоминает область видимости, в которой была создана."
            }
        ]
    },
    {
        title: "Math",
        questions: [
            {
                price: 100,
                question: "Что такое деление?",
                answer: "Операция нахождения, сколько раз одно число помещается в другое."
            },
            {
                price: 200,
                question: "Что такое остаток от деления?",
                answer: "Это часть, которая остаётся после деления нацело."
            },
            {
                price: 300,
                question: "Что такое дробное число?",
                answer: "Число с десятичной точкой, например 3.14."
            },
            {
                price: 400,
                question: "Что такое логарифм?",
                answer: "Степень, в которую надо возвести основание, чтобы получить число."
            },
            {
                price: 500,
                question: "Что такое факториал числа n?",
                answer: "Это произведение всех целых чисел от 1 до n."
            }
        ]
    },
    {
        title: "TypeScript",
        questions: [
            {
                price: 100,
                question: "Что такое TypeScript?",
                answer: "Это язык с типизацией на основе JavaScript."
            },
            {
                price: 200,
                question: "Для чего нужны типы в TypeScript?",
                answer: "Для раннего обнаружения ошибок в коде."
            },
            {
                price: 300,
                question: "Как указать тип переменной строка?",
                answer: "let name: string;"
            },
            {
                price: 400,
                question: "Что такое interface?",
                answer: "Описание структуры объекта."
            },
            {
                price: 500,
                question: "Для чего нужны generics?",
                answer: "Для написания универсальных функций и классов."
            }
        ]
    },
    {
        title: "React",
        questions: [
            {
                price: 100,
                question: "Что такое компонент в React?",
                answer: "Это функция или класс, возвращающий JSX."
            },
            {
                price: 200,
                question: "Что такое props?",
                answer: "Это входные параметры компонента."
            },
            {
                price: 300,
                question: "Что делает useState?",
                answer: "Позволяет компоненту хранить состояние."
            },
            {
                price: 400,
                question: "Что делает useEffect?",
                answer: "Выполняет побочный эффект после рендера."
            },
            {
                price: 500,
                question: "Что такое виртуальный DOM?",
                answer: "Это копия DOM в памяти для оптимизации рендера."
            }
        ]
    },
    {
        title: "Redux",
        questions: [
            {
                price: 100,
                question: "Что такое Redux?",
                answer: "Это библиотека для управления состоянием приложения."
            },
            {
                price: 200,
                question: "Что такое action в Redux?",
                answer: "Это объект, описывающий изменение состояния."
            },
            {
                price: 300,
                question: "Что такое reducer?",
                answer: "Это функция, которая вычисляет новое состояние."
            },
            {
                price: 400,
                question: "Что делает функция dispatch?",
                answer: "Отправляет action в хранилище Redux."
            },
            {
                price: 500,
                question: "Что такое middleware в Redux?",
                answer: "Это функция для расширения возможностей dispatch."
            }
        ]
    }
];
