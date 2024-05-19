interface POJO {
  [key: string]: string | number | bigint | Date;
}

export const sort = (o: unknown, ...keys: Array<string>): Array<POJO> => {
  const copy = JSON.parse(JSON.stringify(o)) as Array<POJO>;

  keys.forEach((key) =>
    copy.sort((a, b) => {
      if (typeof a[key] === "string") {
        return (<string>a[key]).localeCompare(<string>b[key]);
      }
      if (a[key] instanceof Date) {
        return (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (new Date(a[key] as Date) as any) - (new Date(b[key] as Date) as any)
        );
      }
      if (typeof a[key] === "number") {
        return <number>a[key] - <number>b[key];
      }
      return 0;
    }),
  );

  return copy;
};
