type DateInputFormat = `${number}-${number}-${number}`;

export const formatDate = (d: Date) => {
  return d.toISOString().substring(0, 10) as DateInputFormat;
};

export const getFutureDate = (d: Date, addDays: number) => {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + addDays);
};

export const normalizeDate = (d: Date) => {
  return new Date(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    0,
  ).toLocaleDateString();
};
