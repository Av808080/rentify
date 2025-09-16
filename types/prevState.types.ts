export type PreviousState = {
  errors: Record<string, string | number>;
  values: Record<string, string | number | boolean>;
  ack?:boolean
} | undefined ;
