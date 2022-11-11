function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const obfuscateCode = (sourceCode) => {
  const reSpaceTab = /\s+/g;
  const reFunctionName = /^(?=function).*\(/gm;
  const reOneLineComment = /\/\/[^\r\n]+/g;
  const reMultiLineComment = /\/\*.*?\*\//gs;
  const reDigit = /^-?\d+\.?\d*$/g;
  const reWords = /([a-z0-9{}]+)/gi;
  let resultCode = sourceCode.replace(
    reOneLineComment,
    "//" + randomString(145)
  );
  resultCode = sourceCode.replace(
    reMultiLineComment,
    "/*" + randomString(777) + "*/"
  );
  const sourceCodeWords = sourceCode.match(reWords);
  const dictionary = new Map();
  for (let i in sourceCodeWords) {
    let countCurlyBrackets = 0;
    
    const word = sourceCodeWords[i];
    
    if (dictionary.get();

    if (word == "function") {
      dictionary.set(sourceCodeWords[++i], randomString(18));
    }

    if (word = '{') countCurlyBrackets++
    if(word = '}') countCurlyBrackets--
    let j = 0;
    

    if (j === dictionary.length) {
      dictionary.push({ word: word, count: 1 });
    }
  }
  //  = sourceCode.replace(reSpaceTab, "");

  return resultCode;
};

module.exports = { obfuscateCode };
