import * as SQLite  from 'expo-sqlite';

const quizConnDB = SQLite.openDatabase('quiz.db');


export const closeDBConn = () => {

    quizConnDB.closeAsync()
}

export default quizConnDB