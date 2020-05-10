import parse from 'csv-parse';
import { INewAnswer } from '../redux/data/types';

/**
 * Creates answer objects from the CSV file and loads them into Redux store.
 * 
 * @param round What round is being loaded
 * @param createAnswer Redux action to create a new answer
 */
const answersLoader = (round: number, createAnswer: (answer: INewAnswer) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (record === undefined) {
      return;
    }

    // process csv record into new answers and create in Redux store.
    let name = record[0];
    for (let i = 1; i < record.length; i++) {
      let answer: INewAnswer = {
        round: round,
        number: i,
        teamName: name,
        answer: record[i]
      }

      createAnswer(answer);
    }
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
  });

  fileReader.readAsText(file);
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

export default answersLoader;
