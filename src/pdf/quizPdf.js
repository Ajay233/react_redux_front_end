import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import RenderQandA from './renderQandA'
import roboto from './fonts/Roboto-Bold.ttf'
import robotoRegular from './fonts/Roboto-Regular.ttf'

const QuizPdf = (props) => {

  Font.register({family: 'RobotoBold', src: roboto})
  Font.register({family: 'RobotoRegular', src: robotoRegular})

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#E4E4E4'
    },
    title: {
    marginTop: 40,
    marginBottom: 10,
    fontFamily: 'RobotoBold',
    fontSize: 27,
    textAlign: 'center',
    },
    quizDescription: {
      fontSize: 15,
      textAlign: 'center',
      fontFamily: 'RobotoRegular'
    },
    quizAuthor: {
      fontSize: 13,
      fontFamily: 'RobotoBold',
      textAlign: 'center',
      marginVertical: 15
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 20,
    },
    noImage: {}
  });

  const { name, imgUrl, description, author } = props.quiz

  const renderImg = (imgUrl) => {
    if(imgUrl){
      return(
        <Image
          cache={false}
          style={styles.image}
          src={`${imgUrl}`}
        />
      );
    } else {
      return null
    }
  }

  return(
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{name}</Text>
          {renderImg(imgUrl)}
          <Text style={styles.quizDescription}>{description}</Text>
          <Text style={styles.quizAuthor}>{`Created by: ${author}`}</Text>
        </View>
      </Page>
      <Page>
        <RenderQandA questions={props.quizDownloadData.questions} answers={props.quizDownloadData.answers}/>
      </Page>
    </Document>
  );
}

export default QuizPdf
