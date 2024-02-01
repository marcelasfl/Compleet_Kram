

interface Mapping {
  [key: string]: string[];
}

/**
 * @deprecated Essa função está obsoleta e será removida em versões futuras.
 * por favor use "initialValue" em "FormItem".
 */
export function transformObject(obj: any, mapping: Mapping): any {
  const result: any = { ...obj }; // Copiar o objeto original

  for (const key in mapping) {
    const keys = mapping[key];
    const originalValue = keys.reduce((acc, k) => acc[k], obj);

    if (originalValue !== undefined) {
      if (typeof originalValue === 'object') {
        result[key] = transformObject(originalValue, mapping);
      } else {
        result[key] = originalValue;

      }
    }
  }
  console.log({ result });

  return result;
}