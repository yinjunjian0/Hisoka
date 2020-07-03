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
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 4);
  } else {
    if (!isJson(json)) {
      return ''
    }
    json = JSON.stringify(JSON.parse(json), null, 4)
  }

  return json
}