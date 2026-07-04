declare module "splitting" {
  interface SplittingOptions {
    target?: Element | Element[] | NodeList | string;
    by?: string;
    key?: string | null;
  }
  interface SplittingResult {
    el: Element;
    chars?: Element[];
    words?: Element[];
  }
  export default function Splitting(options?: SplittingOptions): SplittingResult[];
}
