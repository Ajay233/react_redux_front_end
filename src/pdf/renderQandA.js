import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import { asyncGetUsingParams } from '../axiosRequests/requests'

const RenderQandA = (props) => {

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#E4E4E4'
    },
    question: {
      fontSize: 15,
      marginVertical:10,
      marginHorizontal: 30
    },
    answer: {
      fontSize: 15,
      marginHorizontal: 30
    },
    section: {
      margin: 10,
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
          <Text style={styles.question}>{question.questionNumber}. {question.description}</Text>
          <Image
            src={question.imgUrl !== null ? question.imgUrl : null}
            style={question.imgUrl !== null ? styles.image : styles.noImage}
          />
          <View style={styles.section}>
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
        <Text key={`${questionId}-${answers.indexOf(answer)}`} style={styles.answer}>
          {answer.answerIndex}. {answer.description}
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
