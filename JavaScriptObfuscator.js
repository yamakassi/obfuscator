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
  let resultCode = sourceCode.replace(
    reOneLineComment,
    "//" + randomString(145)
  );
  resultCode = sourceCode.replace(
    reMultiLineComment,
    "/*" + randomString(777) + "*/"
  );

  //  = sourceCode.replace(reSpaceTab, "");

  return resultCode;
};

module.exports = { obfuscateCode };
