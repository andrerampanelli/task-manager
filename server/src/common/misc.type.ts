export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type ValueOf<T> = T[keyof T];
