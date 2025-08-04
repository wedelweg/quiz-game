export interface Question {
    price: number;
    question: string;
    answer: string;
}

export interface Topic {
    title: string;
    questions: Question[];
}

export const topics: Topic[] = [
    {
        title: "JS",
        questions: [
            {price: 100, question: "Dom? Bom?", answer: "..."},
            {price: 200, question: "Dom? Bom?", answer: "..."},
            {price: 300, question: "Dom? Bom?", answer: "..."},
            {price: 400, question: "Dom? Bom?", answer: "..."},
            {price: 500, question: "Dom? Bom?", answer: "..."},

        ]
    },
    {
        title: "Math",
        questions: [
            {price: 100, question: "Division", answer: "..."},
            {price: 200, question: "Division", answer: "..."},
            {price: 300, question: "Division", answer: "..."},
            {price: 400, question: "Division", answer: "..."},
            {price: 500, question: "Division", answer: "..."}
        ]
    },
    {
        title: "TypeScript",
        questions: [
            {price: 100, question: "Something", answer: "..."},
            {price: 200, question: "Something", answer: "..."},
            {price: 300, question: "Something", answer: "..."},
            {price: 400, question: "Something", answer: "..."},
            {price: 500, question: "Something", answer: "..."}
        ]
    },
    {
        title: "React",
        questions: [
            {price: 100, question: "Something", answer: "..."},
            {price: 200, question: "Something", answer: "..."},
            {price: 300, question: "Something", answer: "..."},
            {price: 400, question: "Something", answer: "..."},
            {price: 500, question: "Something", answer: "..."}
        ]
    },
    {title: "Redux",
    questions: [
    {price: 100, question: "Something", answer: "..."},
    {price: 200, question: "Something", answer: "..."},
    {price: 300, question: "Something", answer: "..."},
    {price: 400, question: "Something", answer: "..."},
    {price: 500, question: "Something", answer: "..."}
]
}
];
