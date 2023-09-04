export type StackParamProps = {
    HomeScreen:undefined;
    QuizScreen:{
        topicID:number;
    };
    ResultScreen:{
        answer: 
            {
                question: number;
                answer: boolean;
            }[];
        points:number;
        topicID:number;
    };
    StatsScreen:undefined
}