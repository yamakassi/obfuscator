#!/usr/bin/env node
function randomString(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function replaceAt(string, index, replace, lenhthNumber) {
  return (
    string.substring(0, index) +
    replace +
    string.substring(index + lenhthNumber)
  );
}
function swapDigit(digit, digitLength) {
  let res = Math.random() * (digit * 1000 - digit) + digit + 100;
  res = Math.floor(res);

  let value = res - digit;

  let obfDigit =
    new String(res.toString() + "-") + new String(value.toString());
  let shift = obfDigit.length - digit.toString().length;
  return {
    value: obfDigit,
    shiftUp: shift,
  };
}

const obfuscateCode = (sourceCode) => {
  const reSpaceTab = /\s+/g;
  const reFunctionName = /(?<=function).*\(/gm;
  const reOneLineComment = /\/\/[^\r\n]+/g;
  const reMultiLineComment = /\/\*.*?\*\//gs;
  const rePositiveDigit = /-?\b[0-9]+(\.[0-9]+)?/g;
  const reWords = /([a-z0-9{}]+)/gi;
  const reFuncVariable = /(?<=\()(.*)(?=\))/;
  const reSwapDigit = /\b[2]+\b(\.[0-9]+)?/g;
  let resultCode = sourceCode.replace(reOneLineComment, "");
  resultCode = resultCode.replace(reMultiLineComment, "");

  let collectDigits = resultCode.matchAll(rePositiveDigit);

  //resultCode = replaceAt(resultCode, 992, "gfg", 2);
  /*
   *сдвиг разности  длинны исходного числа на обфусцированную запись т.к в
   *collectDigits индексы указываются до вставки значаний и если мы вставляем то  индекс 
   * сделующий после первой вставки сдвигается
  
*/
  let shiftUp = 0;
  for (const digit of collectDigits) {
    const obfuscateDigit = swapDigit(digit[0]);

    obfDigitValue = obfuscateDigit.value;

    resultCode = replaceAt(
      resultCode,
      digit.index + shiftUp,
      obfDigitValue,
      digit[0].length
    );
    shiftUp += obfuscateDigit.shiftUp;
    /* for (let i = 0;i<=resultCode.length )*/
  }
  /*
TODO: найти имя функции > записать имя функции в мапу и её обфусцир имя > поиск по массиву всех имен через регулярку  Match (matchAll) > Замена вызовов 
*/
  let collectFuncNames = resultCode.matchAll(reFunctionName);
  const sourceCodeWords = resultCode.matchAll(reWords);
  const dictionaryNamesFunc = new Map();

  for (const name of collectFuncNames) {
    let nameFunc = name[0].substring(0, name[0].length - 1).trim();
    let obfNameFunc = randomString(11);
    let obfuscate = {
      index: name.index,
      obfName: obfNameFunc,
    };
    dictionaryNamesFunc.set(nameFunc, obfuscate);
  }

  let shiftUpName = 0;
  for (const word of sourceCodeWords) {
    if (dictionaryNamesFunc.has(word[0])) {
      const obfName = dictionaryNamesFunc.get(word[0]).obfName;
      resultCode = replaceAt(
        resultCode,
        word.index + shiftUpName,
        obfName,
        word[0].length
      );
      if (obfName.length > word[0].length) {
        shiftUpName += obfName.length - word[0].length;
      }
    }
  }
  //str.substring(0, str.length - 1);

  const allFuncParametrs = resultCode.match(reFuncVariable);
  const variablesMap = new Map();
  const allWords = Array.from(resultCode.matchAll(reWords));
  for (let i = 0; i < allFuncParametrs.length; i++) {
    const parametrs = allFuncParametrs[i].split(",");

    for (const parametr of parametrs.values()) {
      if (!variablesMap.has(parametr)) {
        variablesMap.set(parametr.trim(), randomString(5));
      }
    }
  }

  for (let i = 0; i < allWords.length; i++) {
    if (
      allWords[i][0] == "let" ||
      allWords[i][0] == "const" ||
      allWords[i][0] == "var" ||
      allWords[i][0] == "class"
    ) {
      //   console.log(allWords[i][0]);
      if (!variablesMap.has(allWords[i + 1][0]))
        variablesMap.set(allWords[i + 1][0].trim(), randomString(5));
    }
  }

  let upCursor = 0;
  for (const word of allWords) {
    if (variablesMap.has(word[0])) {
      let obfName = variablesMap.get(word[0]);
      resultCode = replaceAt(
        resultCode,
        word.index + upCursor,
        obfName,
        word[0].length
      );
      if (obfName.length > word[0].length) {
        upCursor += obfName.length - word[0].length;
      }
    }
  }

  /*
  * избыточный код после return
  * добавление всегда выпол If 
  ?  if(str.length==3)
  */
  const allSigns = Array.from(resultCode.matchAll(/([a-z0-9{};]+)/gi));
  const indexReplace = new Array();
  for (let i = 0; i < allSigns.length; i++) {
    if (
      allSigns[i][0] == "let" ||
      allSigns[i][0] == "const" ||
      allSigns[i][0] == "var" ||
      allSigns[i][0] == "return"
    ) {
      let j = i;
      while (!allSigns[j][0].includes(";")) {
        j++;
        if (allSigns[j][0].includes(";")) {
          console.log(allSigns[j][0]);
          console.log("_--");
          indexReplace.push(allSigns[j].index + allSigns[j][0].length);
        }
        /* 
          if (!variablesMap.has(allWords[i + 1][0]))
            variablesMap.set(allWords[i + 1][0].trim(), randomString(5));*/
      }
    }
  }
  console.log(indexReplace);
  let upCursorIndex = 0;
  for (let i = 0; i < indexReplace.length; i++) {
    console.log(indexReplace[i]);

    let obfName = "\r@\r";
    console.log(indexReplace);
    resultCode = replaceAt(
      resultCode,
      indexReplace[i] + upCursorIndex,
      obfName,
      obfName.length - 1
    );

    upCursorIndex += obfName.length - 1;
  }

  // resultCode = resultCode.replace(reSpaceTab, "");
  return resultCode;
};

module.exports = { obfuscateCode };
