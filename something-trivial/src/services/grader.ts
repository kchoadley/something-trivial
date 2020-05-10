const correctAnswerStyle: any = { };
const wrongAnswerStyle: any = { backgroundColor: "red" };

const grade = (answer: string, answerContains: string[]) => {
  let style: any = correctAnswerStyle;
  answerContains.forEach(shouldContain => {
    if (!answer.toLowerCase().includes(shouldContain.toLowerCase())) {
      style = wrongAnswerStyle;
      return;
    }
  })

  return style;
};

export default grade;