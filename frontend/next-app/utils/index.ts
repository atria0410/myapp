/**
 * オブジェクトかどうか判定する
 * @param value 値
 * @returns 結果
 */
export const isObject = (value: any): boolean => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * オブジェクトが空か判定する
 * @param obj オブジェクト
 * @returns 結果
 */
export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length
}

/**
 * オブジェクトが同一の内容か判定する
 * @param obj1 オブジェクト1
 * @param obj2 オブジェクト2
 * @returns 結果
 */
export const isSameObject = (obj1: object, obj2: object): boolean => {
  const json1 = JSON.stringify(Object.entries(obj1).sort())
  const json2 = JSON.stringify(Object.entries(obj2).sort())
  return json1 === json2
}

/**
 * 文字列をスネークケースからキャメルケースに変換する
 * @param str 文字列
 * @returns キャメルケース文字列
 */
export const snakeToCamel = (str: string): string => {
  return str.replace(/_./g, (c) => {
    return c.charAt(1).toUpperCase()
  })
}

/**
 * 文字列をキャメルケースからスネークケースに変換する
 * @param str 文字列
 * @returns スネークケース文字列
 */
export const camelToSnake = (str: string): string => {
  return str.replace(/([A-Z])/g, (c) => {
    return '_' + c.toLowerCase()
  })
}

/**
 * オブジェクトのキーをスネークケースからキャメルケースに変換する
 * @param obj オブジェクト
 * @returns キャメルケースキーのオブジェクト
 */
export const snakeToCamelKeys = (obj: object): object => {
  if (!isObject(obj)) return obj

  const newObj: { [key: string]: number } = {}

  for (let [key, value] of Object.entries(obj)) {
    key = snakeToCamel(key)

    if (isObject(value)) {
      value = snakeToCamelKeys(value)
    } else if (Array.isArray(value)) {
      value = value.map((item) => (isObject(item) ? snakeToCamelKeys(item) : item))
    }

    newObj[key] = value
  }

  return newObj
}

/**
 * オブジェクトのキーをキャメルケースからスネークケースに変換する
 * @param obj オブジェクト
 * @param recursive 再帰的に変換するか（デフォルト：true）
 * @returns スネークケースキーのオブジェクト
 */
export const camelToSnakeKeys = (obj: object): object => {
  if (!isObject(obj)) return obj

  const newObj: { [key: string]: number } = {}

  for (let [key, value] of Object.entries(obj)) {
    key = camelToSnake(key)

    if (isObject(value)) {
      value = camelToSnakeKeys(value)
    } else if (Array.isArray(value)) {
      value = value.map((item) => (isObject(item) ? camelToSnakeKeys(item) : item))
    }

    newObj[key] = value
  }

  return newObj
}
