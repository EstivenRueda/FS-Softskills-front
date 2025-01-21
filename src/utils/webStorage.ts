import { isDate, isRegExp, noop } from 'lodash';

function encode(value: unknown) {
  if (isDate(value) === true) {
    return 'date|' + (value as Date).toUTCString();
  }
  if (isRegExp(value) === true) {
    return 'expr|' + (value as RegExp).source;
  }
  if (typeof value === 'number') {
    return 'numb|' + value;
  }
  if (typeof value === 'boolean') {
    return 'bool|' + (value ? '1' : '0');
  }
  if (typeof value === 'string') {
    return 'strn|' + value;
  }
  if (typeof value === 'function') {
    return 'strn|' + value.toString();
  }
  if (value === Object(value)) {
    return 'objt|' + JSON.stringify(value);
  }

  // hmm, we don't know what to do with it,
  // so just return it as is
  return value as string;
}

function decode(value: string) {
  const length = value.length;
  if (length < 5) {
    // then it wasn't encoded by us
    return value;
  }

  const type = value.substring(0, 4);
  const source = value.substring(5);

  switch (type) {
    case 'date':
      return new Date(source);
    case 'expr':
      return new RegExp(source);
    case 'numb':
      return Number(source);
    case 'bool':
      return Boolean(source === '1');
    case 'strn':
      return '' + source;
    case 'objt':
      return JSON.parse(source);
    default:
      // hmm, we reached here, we don't know the type,
      // then it means it wasn't encoded by us, so just
      // return whatever value it is
      return value;
  }
}

export function getEmptyStorage() {
  const getVal = () => null;

  return {
    has: () => false,
    getLength: () => 0,
    getItem: getVal,
    getIndex: getVal,
    getKey: getVal,
    getAll: () => {},
    getAllKeys: () => [],
    set: noop,
    remove: noop,
    clear: noop,
    isEmpty: () => true,
  };
}

function getStorage(type: 'local' | 'session') {
  const webStorage = window[`${type}Storage`];
  const get = (key: string | null) => {
    const item = key ? webStorage.getItem(key) : null;
    return item ? decode(item) : null;
  };

  return {
    has: (key: string) => webStorage.getItem(key) !== null,
    getLength: () => webStorage.length,
    getItem: get,
    getIndex: (index: number) => {
      return index < webStorage.length ? get(webStorage.key(index)) : null;
    },
    getKey: (index: number) => {
      return index < webStorage.length ? webStorage.key(index) : null;
    },
    getAll: () => {
      let key: string | null;
      const result: Record<string, unknown> = {},
        len = webStorage.length;

      for (let i = 0; i < len; i++) {
        key = webStorage.key(i);
        if (key) result[key] = get(key);
      }

      return result;
    },
    getAllKeys: () => {
      const result = [],
        len = webStorage.length;

      for (let i = 0; i < len; i++) {
        result.push(webStorage.key(i));
      }

      return result;
    },
    set: (key: string, value: unknown) => {
      webStorage.setItem(key, encode(value));
    },
    remove: (key: string) => {
      webStorage.removeItem(key);
    },
    clear: () => {
      webStorage.clear();
    },
    isEmpty: () => webStorage.length === 0,
  };
}

const isServer = typeof window === 'undefined';

export const LocalStorage = isServer ? getEmptyStorage() : getStorage('local');

export const SessionStorage = isServer ? getEmptyStorage() : getStorage('session');
