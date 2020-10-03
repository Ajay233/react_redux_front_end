import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import RenderQandA from './renderQandA'

const QuizPdf = (props) => {

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#E4E4E4'
    },
    title: {
    fontSize: 24,
    textAlign: 'center',
    },
    quizDescription: {
      fontSize: 15,
      textAlign: 'center',
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

  const { name, imgUrl, description } = props.quiz
  
  return(
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{name}</Text>
          <Image
            cache={false}
            style={styles.image}
            src={`${imgUrl}`}
          />
          <Text style={styles.quizDescription}>{description}</Text>
        </View>
      </Page>
      <Page>
        <RenderQandA questions={props.quizDownloadData.questions} answers={props.quizDownloadData.answers}/>
      </Page>
    </Document>
  );
}

export default QuizPdf
