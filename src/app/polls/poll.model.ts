import { stringify } from 'querystring';

export class Poll {
    public slug: string;
    public name: string;
    public questions: Question[];
}

export class Question {
    public question: string;
    public slug: string;
    public type: string;
    public answers: Answer[];
}

export class Answer {
    public answer: string;
    public slug: string;
}


export class Vote{
    public slug: string;
    public questions: VoteQuestion[] = [];
    public isValid = true;

    constructor(poll: Poll) {
        this.slug = poll.slug;
        poll.questions.forEach(q => this.questions.push(new VoteQuestion(q)));
    }


    public checkValid() {
        this.questions.forEach(t => t.checkValid());
        this.isValid = this.questions.every(t => t.isValid);
        return this.isValid;
    }

    public clearValid() {
        this.questions.forEach(t => t.isValid = true);
        this.isValid = true;
    }
}

export class VoteQuestion {
    public slug: string;
    public type: string;
    public answers: VoteAnswer[] = [];
    public isValid = true;

    constructor(question: Question) {
        this.slug = question.slug;
        this.type = question.type;
    }

    addAnswer(answer: string) {
        if(this.type === 'single') {
        this.answers = [new VoteAnswer(answer)];
        } else {
            if (!this.answers.includes(new VoteAnswer(answer))) {
                this.answers.push(new VoteAnswer(answer));
            }
        }
    }

    removeAnswer(answer: string) {
        if(this.type === 'single') {
        this.answers = [];
        } else {
            if (this.answers.includes(new VoteAnswer(answer))) {
                this.answers.forEach( (item, index) => {
                    if(item.answer === answer){ 
                        this.answers.splice(index, 1);
                    }
                  });
            }
        }
    }

    public checkValid() {
        if(this.type === 'single') {
            this.isValid =  this.answers.length === 1;
        } else {
            this.isValid =  this.answers.length >= 1;
        }
    }
}

export class VoteAnswer {
    public answer: string;

    constructor(answer: string) {
        this.answer = answer;
    }
}
