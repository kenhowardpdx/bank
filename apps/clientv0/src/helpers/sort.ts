interface POJO {
  [key: string]: string | number | bigint | Date;
}

export const sort = (o: unknown, ...keys: Array<string>): Array<POJO> => {
  const copy = JSON.parse(JSON.stringify(o)) as Array<POJO>;

  keys.forEach((key) =>
    copy.sort((a, b) => {
      if (key.toLowerCase().includes("date")) {
        const dateA = new Date(a[key] as string);
        const dateB = new Date(b[key] as string);
        if (dateA > dateB) {
          return 1;
        }
        if (dateA < dateB) {
          return -1;
        }
        return 0;
      }
      if (typeof a[key] === "string") {
        return (<string>a[key]).localeCompare(<string>b[key]);
      }
      if (typeof a[key] === "number") {
        return <number>a[key] - <number>b[key];
      }
      return 0;
    }),
  );

  return copy;
};
