export type ResizeConfig = {
  method: 'scale' | 'fit' | 'cover' | 'thumb';
  width: number;
  height: number;
};

export type PreserveConfig = {
  preserve: ('copyright' | 'creation' | 'location')[];
};

export type Config = Partial<ResizeConfig> & Partial<PreserveConfig>;

export type ShrinkResult = {
  input: {
    size: number;
    type: string;
  };
};

export type Result = {
  data: Buffer;
  size: number;
  type: string;
};
