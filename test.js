const mecab = require('mecab-ya');

const generateRandomString = (options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
};
const characters = ['@','@', '~~', ',,'];

function teulddakfy(sentence) {
    return new Promise((resolve) => {
        mecab.pos(sentence, (err, result) => {

            for (let i = result.length - 1; i >= 0; i--) {
                const [word, tag] = result[i];

                if (tag.startsWith('NN')) {
                    const startPos = sentence.indexOf(word);
                    const endPos = startPos + (word.length -1);
                    const randomMark = generateRandomString(characters);

                    // 문장 수정
                    sentence = sentence.slice(0, endPos) + randomMark + sentence.slice(endPos);
                }
            }
            resolve(sentence.replace(/ /g, ',,,, ') + generateRandomString(characters));
        });
    });
}

const sentence = "안녕하세요 83세 김춘배입니다 잘부탁해요";

teulddakfy(sentence)
    .then(result => {
        console.log(result);
    })
