export type Resort = {
  slug: string;
  name: string;
  location: string;
  country: string;
  region: string;
  visited: string;
  age: string;
  full?: boolean;
  forthcoming?: boolean;
  /** Marks entries added to round out the list, not actually visited. */
  __placeholder?: boolean;
};

export type SpreadEntry =
  | { kind: 'closed' }
  | { kind: 'toc' }
  | { kind: 'entry'; resortIdx: number; spreadIdx: 0 | 1 | 2 };
