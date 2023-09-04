import React, { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import {
  BackHandler,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { technology, history, biology, astronomy, geography, literature, math, scientist, sport } from "../constant";
import { Heart } from "../assets/icons/life";
import { useIsFocused } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamProps } from "../constant/stack_navigation";
import { AntDesign } from "@expo/vector-icons";

interface HeartProps {
  id: number;
  icon: ReactNode;
}

export interface QuizProps {
  question: string;
  options: {
    id: number;
    option: string;
    answer: string;
  }[];
  correctAnswerIndex: number;
}

const QuizScreen = ({
  navigation,
  route,
}: StackScreenProps<StackParamProps, "QuizScreen">) => {
  const isFocused = useIsFocused();

  const { topicID } = route.params
  const initQuiz: QuizProps[] = [
    {
      question: "",
      options: [
        {
          id: 0,
          option: "",
          answer: "",
        },
      ],
      correctAnswerIndex: 0,
    },
  ];

  const [heart, setHeart] = useState<HeartProps[]>([{ id: 0, icon: <></> }]);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(15);
  const [quiz, setQuiz] = useState<QuizProps[]>(initQuiz);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerStatus, setAnswerStatus] = useState<boolean | null>(null);

  const [answers, setAnswers] = useState([{ question: 0, answer: false }]);

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );

  const currentQuestion: QuizProps = quiz[questionIndex];

  let initInterval: any = null;

  useEffect(() => {
    setHeart(Heart);
    

    if(topicID == 1){
      setQuiz(astronomy);
    } else if(topicID == 2) {
      setQuiz(biology)
    } else if(topicID == 3) {
      setQuiz(geography)
    } else if(topicID == 4) {
      setQuiz(history)
    } else if(topicID == 5) {
      setQuiz(literature)
    } else if(topicID == 6) {
      setQuiz(math)
    } else if(topicID == 7) {
      setQuiz(scientist)
    } else if(topicID == 8) {
      setQuiz(sport)
    } else if(topicID == 9) {
      setQuiz(technology)
    } else  {
      setQuiz([])
    }
  }, [isFocused, topicID]);

  useEffect(() => {
    
    if (selectedAnswerIndex !== null) {
      
      if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
        
        setPoints(points  + questionIndex+1* 2);
        setAnswerStatus(true);
        answers.push({ question: questionIndex + 1, answer: true });
      } else {
        setAnswerStatus(false);
        answers.push({ question: questionIndex + 1, answer: false });

        if (heart.length > 0) {
          setHeart((prevHeart) => prevHeart.slice(0, prevHeart.length - 1));
        }
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [currentQuestion]);

  useEffect(() => {
    const myInterval = () => {
      if (timer >= 1) {
        setTimer((timer) => timer - 1);
      }
      if (timer === 0) {
        if(heart.length != 0){

        if(questionIndex + 1 >= quiz.length){
          setTimer(0)
          navigation.navigate("ResultScreen", {
                  answer: answers,
                  points: points,
                  topicID:topicID
                });
        } else {
          if (heart.length > 0) {
            setHeart((prevHeart) => prevHeart.slice(0, prevHeart.length - 1));
          } 
          setQuestionIndex(questionIndex + 1)
          setTimer(15);
        }
        
      } else {

        navigation.navigate("ResultScreen", {
          answer: answers,
          points: points,
          topicID:topicID
        });
      }
    }
    };

    initInterval = setTimeout(myInterval, 1000);
    return () => {
      clearTimeout(initInterval);
    };

  }, [timer]);

  useEffect(() => {
    if (!initInterval) {
      setTimer(15);
    }
  }, [questionIndex]);

  // useEffect(() => {
  //   if (questionIndex + 1 >= quiz.length) {
  //     // setQuiz(biology)
  //     navigation.navigate("ResultScreen", {
  //       answer: answers,
  //       points: points,
  //     });
  //   }
  // }, [currentQuestion]);


  useEffect(() => {

    if(heart.length == 0){
       
      navigation.navigate("ResultScreen", {
        answer: answers,
        points: points,
        topicID:topicID
      });
    }
  },[questionIndex])

  const handleNext = () => {

    if(heart.length !== 0){

    
    if(questionIndex + 1 >= quiz.length){
      
      navigation.navigate("ResultScreen", {
              answer: answers,
              points: points,
              topicID:topicID
            });
    } else {
      if (heart.length > 0) {
        setHeart((prevHeart) => prevHeart.slice(0, prevHeart.length - 1));
      } 
      setQuestionIndex(questionIndex + 1)
    }
  } else {
    navigation.navigate("ResultScreen", {
      answer: answers,
      points: points,
      topicID:topicID
    });
  }
  }

  return (
    <>
    <SafeAreaProvider>
      <SafeAreaView>
        {quiz.length != 0? 

<View style={style.mainContainer}>
<View style={style.topViewContainer}>
  <View style={style.viewHeaderInfo}>
    <Text style={style.BoldTextStyle}>Life:</Text>
    {heart.map((i) => {
      return (
        <View style={{ margin: 2 }} key={i.id}>
          {i.icon}
        </View>
      );
    })}
  </View>

  <View style={style.viewHeaderInfo}>
    <View
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "flex-end",
        width: "100%",
        paddingRight: 20,
      }}
    >
      <Pressable style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor:"yellow",
        padding:5,
        borderRadius:5
      }} onPress={() => handleNext()}>
      <Text style={style.BoldTextStyle}>Timer:</Text>
      <Text style={style.BoldTextStyle}>{timer}s</Text>
      </Pressable>
      
    </View>
  </View>
</View>

<View style={style.topViewContainer}>
  <View style={style.pointsView}>
    <Text style={style.BoldTextStyle}>Points: {points}</Text>
  </View>
</View>

{/* quiz area */}

<View style={style.quizViewContainer}>
  <View
    style={{
      width: "100%",
      height: 300,
    }}
  >
    <View
      style={{
        width: "100%",
        height: "auto",
        //  backgroundColor:"green",
        paddingLeft: 7,
        paddingRight: 7,
        justifyContent:"center",
        alignContent:"center"
      }}
    >
      <Text
        style={{
          marginLeft:3,
          flexWrap: "wrap",
          textAlign: "justify",
          fontFamily: "RobotoBold",
          textAlignVertical:"auto",
          fontSize: 17,
        }}
      >
        {currentQuestion.question}
      </Text>
    </View>

    {currentQuestion.options.map((i, k) => {
      return (
        <Pressable
          onPress={() =>
            selectedAnswerIndex === null &&
            setSelectedAnswerIndex(i.id)
          }
          style={
            selectedAnswerIndex === k &&
            k === currentQuestion.correctAnswerIndex
              ? [style.pressOption, { backgroundColor: "green" }]
              : selectedAnswerIndex !== null &&
                selectedAnswerIndex === k
              ? [style.pressOption, { backgroundColor: "red" }]
              : [style.pressOption]
          }
          key={k}
        >
          {selectedAnswerIndex === k &&
          k === currentQuestion.correctAnswerIndex ? (
            <AntDesign name="checkcircle" size={35} color={"white"} style={{marginLeft:3}} />
          ) : selectedAnswerIndex != null &&
            selectedAnswerIndex === k ? (
            <AntDesign name="closecircle" size={35} color={"white"} style={{marginLeft:3}}/>
          ) : (
            <Text
              style={{
                fontFamily: "RobotoBold",
                fontSize: 17,
                
                borderRadius: 20,
                textAlignVertical: "center",
                textAlign: "center",
                height: 40,
                width: 40,
              }}
            >
              {i.option}.
            </Text>
          )}

          <Text
            style={
              selectedAnswerIndex === k &&
              k === currentQuestion.correctAnswerIndex
                ? {
                    fontFamily: "RobotoBold",
                    fontSize: 17,
                    flexWrap: "wrap",
                    verticalAlign: "bottom",
                    color: "white",
                  }
                : selectedAnswerIndex !== null &&
                  selectedAnswerIndex === k
                ? {
                    fontFamily: "RobotoBold",
                    fontSize: 17,
                    flexWrap: "wrap",
                    verticalAlign: "bottom",
                    color: "white",
                  }
                : {
                    fontFamily: "RobotoRegular",
                    fontSize: 17,
                    flexWrap: "wrap",
                    verticalAlign: "bottom",
                  }
            }
          >
            {i.answer}
          </Text>
        </Pressable>
      );
    })}
  </View>
  
  <View style={{ height:100, padding:10}}>
    {answerStatus == null ? null :<>
    <Text style={{fontFamily:"RobotoBold", fontSize:15}}>Correct Answer: </Text>
    <Text style={{marginLeft:10, fontFamily:"RobotoRegular", fontSize:15}}>
      {currentQuestion.options[currentQuestion.correctAnswerIndex].answer}
    </Text>
    </>
    }
    </View>

    <View style={{
    height:100,
     padding:10,
     display:"flex",
     flexDirection:"row",
     justifyContent:"flex-end"
     }}>
      {heart.length != 0 ? questionIndex + 1 >= quiz.length ?
        selectedAnswerIndex !== null ?
      (
        <Pressable onPress={() => navigation.navigate("ResultScreen", {
          answer:answers,
          points:points,
          topicID:topicID
        })} style={{
          backgroundColor:"blue",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          height:45,
          width:110,
          borderRadius:10,
          marginRight:10
        }}>
          <Text style={{
            fontFamily:"RobotoBold",
            fontSize:17,
            color:"white"
          }}>See Result</Text>
        </Pressable>
      ) : "" : answerStatus === null ? null : (
        <Pressable onPress={() => setQuestionIndex(questionIndex + 1)} style={{
          backgroundColor:"green",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          height:45,
          width:80,
          borderRadius:10,
          marginRight:10
        }}>
          <Text style={{
            fontFamily:"RobotoBold",
            fontSize:17,
            color:"white"
          }}>Next</Text>
        </Pressable>
      )
     :  <Pressable onPress={() => navigation.navigate("ResultScreen", {
      answer:answers,
      points:points,
      topicID:topicID
    })} style={{
      backgroundColor:"blue",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      height:45,
      width:110,
      borderRadius:10,
      marginRight:10
    }}>
      <Text style={{
        fontFamily:"RobotoBold",
        fontSize:17,
        color:"white"
      }}>See Result</Text>
    </Pressable>
     }

    </View>
</View>

</View>
         :  ""}
        
       
      </SafeAreaView>
    </SafeAreaProvider>
    </>
  );
};

const style = StyleSheet.create({
  pressOption: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 40,
    margin: 5,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 20,
    gap: 1,
  },
  mainContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  quizViewContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height:"100%"

     
  },
  topViewContainer: {
    //  backgroundColor:"green",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 35,
    justifyContent: "space-between",
  },
  viewHeaderInfo: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 5,
    width: "40%",
    height: 30,
  },
  pointsView: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 5,
    width: "40%",
    height: 30,
  },

  BoldTextStyle: {
    fontFamily: "RobotoBold",
    fontSize: 15,
    textAlignVertical: "center",
    marginRight: 5,
  },
});

export default QuizScreen;
