import React from 'react'
import { Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import roboto from './fonts/Roboto-Bold.ttf'
import robotoRegular from './fonts/Roboto-Regular.ttf'
// import { asyncGetUsingParams } from '../axiosRequests/requests'

const RenderQandA = (props) => {

  Font.register({family: 'RobotoBold', src: roboto})
  Font.register({family: 'RobotoRegular', src: robotoRegular})

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#E4E4E4'
    },
    questionNumber: {
      fontSize: 15,
      fontFamily: 'RobotoBold',
      marginTop:10,
      marginBottom: 15
    },
    question: {
      fontSize: 15,
      fontFamily: 'RobotoRegular',
    },
    answerIndex: {
      fontSize: 15,
      fontFamily: 'RobotoBold',
      marginBottom: 5
    },
    answer: {
      fontSize: 15,
      fontFamily: 'RobotoRegular',
    },
    answerSection:{
      marginTop:15,
      marginBottom: 20
    },
    section: {
      marginLeft: 20,
      marginRight: 20,
      padding: 10,
      flexGrow: 1
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 60
    },
    noImage: {}
  });

  const renderQuestions = () => {
    console.log(props)
    const questions = props.questions
    const answers = props.answers
    let list = questions.map(question => {
      let id = question.id
      return(
        <View key={id} style={styles.section}>
          <Text style={styles.questionNumber}>{question.questionNumber}. <Text style={styles.question}>{question.description}</Text></Text>
          <Image
            src={question.imgUrl !== null ? question.imgUrl : null}
            style={question.imgUrl !== null ? styles.image : styles.noImage}
          />
          <View style={styles.answerSection}>
            {renderAnswers(id, answers[id])}
          </View>
        </View>
      );
    })
    return list
  }

  const renderAnswers = (questionId, answers) => {
    let answerList = answers.map(answer => {
      return(
        <Text key={`${questionId}-${answers.indexOf(answer)}`} style={styles.answerIndex}>
          {answer.answerIndex}. <Text style={styles.answer}>{answer.description}</Text>
        </Text>
      );
    })
    return answerList
  }

  return(
    <React.Fragment>
      {renderQuestions()}
    </React.Fragment>
  )
}

export default RenderQandA
