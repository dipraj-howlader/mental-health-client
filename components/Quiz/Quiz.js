import { TouchableOpacity, StyleSheet, Text, View, ImageBackground, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from "react";
import { qtn, categories } from './questions';  // Ensure categories contain additional advice
import Result from "../Result/Result";  // Assume Result component is already set up to show the result details

const Quiz = () => {
  const [questions, setQuestions] = useState(qtn);
  const [prediction, setPrediction] = useState(null);
  const [err, setErr] = useState(null);

  // Function to calculate the score and return the result
  const calculateResult = (features) => {
    let score = 0;
    for (let key in features) {
      score += features[key];  // Sum up the values from the answers (adjust this calculation if necessary)
    }

    // Determine the category based on the score
    let result;
    if (score < 5) {
      result = { 
        ...categories[0],
        advice: "It's great that you're feeling balanced! Keep up the healthy habits.",
        doctorVisit: "No need for a doctor visit at the moment.",
        treatment: "Maintain your healthy lifestyle with regular physical activity and stress management."
      };
    } else if (score >= 5 && score < 10) {
      result = { 
        ...categories[1],
        advice: "You may be dealing with some anger-related symptoms. Consider small changes to reduce stress.",
        doctorVisit: "No immediate doctor visit required, but consider a check-up if needed.",
        treatment: "Try anger management strategies such as mindfulness and exercise to reduce irritability."
      };
    } else {
      result = { 
        ...categories[2],
        advice: "You seem to be dealing with both anxiety and anger. It's important to seek help and adopt healthier strategies.",
        doctorVisit: "Consult with a healthcare professional for a full assessment and treatment plan.",
        treatment: "Incorporate relaxation techniques, therapy, and a regular exercise routine to manage both anger and anxiety."
      };
    }

    return result;
  };

  const handleOptionPress = ({ name, value }) => {
    const updatedQuestions = questions.map((q) => {
      if (q.name === name) {
        return { ...q, selected: value };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    let features = {};
    let isError = false;

    // Collect answers from the questions
    questions.forEach((question) => {
      if (question.selected !== null) {
        features[question.name] = question.selected;
      } else {
        isError = true;
        setErr(`Please select an option for the question "${question.text}"`);
      }
    });

    if (!isError) {
      // Calculate result based on the answers
      const result = calculateResult(features);
      setErr(null);
      setPrediction(result);  // Set prediction based on the calculated result
    }
  };

  const resetQuiz = () => {
    setQuestions(qtn);  // Reset the questions to their original state
    setPrediction(null);
    setErr(null);
  };

  const QuestionCard = ({ question }) => {
    return (
      <View style={styles.card}>
        <ImageBackground source={require('../../images/result-bg.jpg')} style={styles.hospitalItem}>
          {/* Question */}
          <View style={styles.top}>
            <Text style={styles.question}>{question.text}</Text>
          </View>

          {/* Choose Option */}
          <View style={styles.middle}>
            {question.options.map((op) => (
              <TouchableOpacity
                style={[styles.option, question.selected === op.value && styles.selectedOption]}
                key={op.text}
                onPress={() => handleOptionPress({ name: question.name, value: op.value })}
              >
                <Text style={styles.optionText}>{op.text}</Text>
                {question.selected === op.value && (
                  <Icon name="check-circle" size={20} color="white" style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {prediction ? (
        <ScrollView style={styles.container}>
          <View style={styles.resultContainer}>
            {/* Display Result */}
            <Text style={styles.resultTitle}>{prediction.category}</Text>
            <Text style={styles.resultDescription}>{prediction.description}</Text>

            {/* Display Additional Information */}
            <View style={styles.detailsContainer}>
              <Text style={styles.resultTitle}>Advice:</Text>
              <Text style={styles.resultText}>{prediction.advice}</Text>

              <Text style={styles.resultTitle}>Doctor Visit:</Text>
              <Text style={styles.resultText}>{prediction.doctorVisit}</Text>

              <Text style={styles.resultTitle}>Treatment:</Text>
              <Text style={styles.resultText}>{prediction.treatment}</Text>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={resetQuiz}
            >
              <Text style={styles.optionText}>Take the Quiz Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.container}>
          {questions.map((question) => (
            <QuestionCard key={question.name} question={question} />
          ))}

          {/* Error */}
          {err && <Text style={styles.errText}>{err}</Text>}

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
          >
            <Text style={styles.optionText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  hospitalItem: {
    padding: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  top: {},
  question: {
    fontSize: 22,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  middle: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  option: {
    backgroundColor: "#FC734D",
    marginVertical: 6,
    paddingVertical: 12,
    borderRadius: 5,
    flexDirection: "row",
  },
  selectedOption: {
    backgroundColor: "gray",
  },
  optionText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: 'white',
    width: "100%",
  },
  checkIcon: {
    marginLeft: '-15%',
  },
  errText: {
    color: 'red',
    marginHorizontal: 10,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  submitBtn: {
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 5,
  },
  resultContainer: {
    padding: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 15,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  }
});
