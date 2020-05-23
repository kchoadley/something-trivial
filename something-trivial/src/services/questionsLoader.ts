import parse from 'csv-parse';
import { INewQuestion } from '../redux/data/types';
import { nodeBuilder } from './answerRules';

/**
 * Creates answer objects from the CSV file and loads them into Redux store.
 * 
 * @param round What round is being loaded
 * @param createQuestion Redux action to create a new answer
 */
const questionsLoader = (createQuestion: (question: INewQuestion) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  let files = e.target.files;
  if (files === null || files.length === 0) {
    return;
  }
  
  let file = files[0]; // we only load 1 file
  let parser = parse();
  let fileReader = new FileReader();

  // action to perform when csv data is written to parser and ready to read
  parser.on('readable', () => {
    let record: string[] = csvRowTrimRight(parser.read());
    if (record === undefined || record.length < 4) {
      console.error(`Invalid number of columns, must be 4 columns. [round, number, prompt, answer]`)
      return;
    }

    if (isNaN(parseInt(record[0]))) {
      console.error('Column 0 must be an integer');
      return;
    }

    if (isNaN(parseInt(record[1]))) {
      console.error('Column 1 must be an integer');
      return;
    }

    // process csv record into new question and create in Redux store.
    let question: INewQuestion = {
      gameId: 0,
      round: parseInt(record[0]),
      number: parseInt(record[1]),
      prompt: record[2],
      answerContains: record[3].split(' '),
      rules: nodeBuilder(record[3].split(' ')),
      points: (record.length > 4 && !isNaN(parseFloat(record[4]))) ? parseFloat(record[4]) : 1
    }

    createQuestion(question);
  });

  parser.on('error', function (err) {
    console.error(err.message)
  })

  // filereader action to read in the lines of the csv file and write them to the csv parser.
  fileReader.onload = ((e: ProgressEvent<FileReader>) => {
    if (e.target === null) {
      return;
    }

    let content = e.target.result as string;
    let lines = content.split('\n');
    lines.forEach(line => parser.write(line));
    parser.end();
  });

  fileReader.readAsText(file);

  // reset value so you can load the same file again.
  e.target.value = '';
};

/**
 * Trims empty cells from the right side of the csv row.
 * 
 * @param csvRow a row of a csv file
 */
const csvRowTrimRight = (csvRow: string[]): string[] => {
  if (csvRow === null) {
    return [];
  }

  let tail = csvRow[csvRow.length - 1];
  if (tail === undefined || tail === '') {
    return csvRowTrimRight(csvRow.slice(0, csvRow.length - 1));
  }

  return csvRow;
}

export default questionsLoader;
