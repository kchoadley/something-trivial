import { ContainsValueNode, AndNode } from "../../services/answerRules";

export default [
    {
        gameId: 0,
        id: 10,
        round: 1,
        number: 1,
        prompt: `What is the Latin word for dragon?`,
        answerContains: [`Draco`],
        rules: new ContainsValueNode(`Draco`),
        points: 1
    },
    {
        gameId: 0,
        id: 11,
        round: 1,
        number: 2,
        prompt: ` This is an atmospheric subgenre of alternative rock that relies on sonic textures as much as melody. It often features breathy vocals and processed, echo-laden guitars and synthesizers.`,
        answerContains: [`Dream`, `Pop`],
        rules: new AndNode(new ContainsValueNode(`Dream`), new ContainsValueNode(`Pop`)),
        points: 1
    },
    {
        gameId: 0,
        id: 12,
        round: 1,
        number: 3,
        prompt: `What was the middle name of US President Franklin Roosevelt?`,
        answerContains: [`Delano`],
        rules: new ContainsValueNode(`Delano`),
        points: 1
    },
    {
        gameId: 0,
        id: 13,
        round: 1,
        number: 4,
        prompt: `This psychological theory says that When we predict how long we will feel about some event, we tend to over-estimate the longevity of the emotional impact.`,
        answerContains: [`Durability`, `Bias`],
        rules: new AndNode(new ContainsValueNode(`Durability`), new ContainsValueNode(`Bias`)),
        points: 1
    },
    {
        gameId: 0,
        id: 14,
        round: 1,
        number: 5,
        prompt: `Published in 1897, what famous horror novel was written by Bram Stoker?`,
        answerContains: [`Dracula`],
        rules: new ContainsValueNode(`Dracula`),
        points: 1
    },
    {
        gameId: 0,
        id: 15,
        round: 1,
        number: 6,
        prompt: `This hindi word which means Happy Heart and is the name of a famous South Indian Bread with a Sweet filling in it.`,
        answerContains: [`Dilkush`],
        rules: new ContainsValueNode(`Dilkush`),
        points: 1
    },
    {
        gameId: 0,
        id: 16,
        round: 1,
        number: 7,
        prompt: `Who plays Jess Day in TV series "New Girl"?`,
        answerContains: [`Zooey`, `Deschanel`],
        rules: new AndNode(new ContainsValueNode(`Zooey`), new ContainsValueNode(`Deschanel`)),
        points: 1
    },
    {
        gameId: 0,
        id: 17,
        round: 1,
        number: 8,
        prompt: `This river flows from Lake St. Clair west and south to Lake Erie as a strait in the Great Lakes system.`,
        answerContains: [`Detroit`],
        rules: new ContainsValueNode(`Detroit`),
        points: 1
    },
    {
        gameId: 0,
        id: 18,
        round: 1,
        number: 9,
        prompt: `Born in 1996, what name was given to the world's first cloned sheep?`,
        answerContains: [`Dolly`],
        rules: new ContainsValueNode(`Dolly`),
        points: 1
    },
    {
        gameId: 0,
        id: 19,
        round: 1,
        number: 10,
        prompt: `This Irish singer-songwriter and musician is best known for their 2019 single "Outnumbered".`,
        answerContains: [`Dermot`, `Kennedy`],
        rules: new AndNode(new ContainsValueNode(`Dermot`), new ContainsValueNode(`Kennedy`)),
        points: 1
    },
]