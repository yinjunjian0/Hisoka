export const isJson = function (str: string) {
  try {
    if (typeof JSON.parse(str) == "object") {
      return true;
    }
  } catch (e) {
  }
  return false;
}

export const formatJson = function (json: any): string {
  var formatted = '',     //转换后的json字符串
    padIdx = 0,         //换行后是否增减PADDING的标识
    PADDING = '    ';   //4个空格符
  /**
   * 将对象转化为string
   */
  if (typeof json !== 'string') {
    json = JSON.stringify(json);
  } else {
    if (!isJson(json)) {
      return ''
    }
    json = JSON.stringify(JSON.parse(json))
  }


  json = json.replace(/([{])/g, '\r\n$1\r\n')
    .replace(/([[\]])/g, '\r\n$1\r\n')
    .replace(/(,)/g, '$1\r\n')
    .replace(/(\r\n\r\n)/g, '\r\n')
    .replace(/\r\n,/g, ',')
    .replace(/([}])/g, '\r\n$1\r\n')

  const jsonChar = json.split('\r\n');
  console.log(jsonChar);


  (jsonChar).forEach(function (node: string, index: number) {
    console.log(node);

    var indent = 0,
      padding = '';
    if (node.match(/\{$/) || node.match(/\[$/)) indent = 1;
    else if (node.match(/\}/) || node.match(/\]/)) padIdx = padIdx !== 0 ? --padIdx : padIdx;
    else indent = 0;
    for (var i = 0; i < padIdx; i++)    padding += PADDING;
    if (index !== 0 && node !== '' && node.trim() !== '') formatted += padding + node + '\r\n';
    padIdx += indent;
  });

  return formatted;
}