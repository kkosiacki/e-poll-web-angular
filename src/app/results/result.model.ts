export class Result {
    public poll_slug: string;
    public poll: string;
    public question_slug: string;
    public question: string;
    public answer: string;
    public answer_slug: string;
    public count: number;
}


export class ChartKey {
    public poll: string;
    public question: string;

    constructor(result:Result) {
        this.poll = result.poll;
        this.question =result.question; 
    }
}

export class ChartValue {
    public answer: string;
    public count: number;

    constructor(result:Result) {
        this.answer = result.answer;
        this.count = result.count; 
    }
}


