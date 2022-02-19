abstract class MyObject {
  protected size: number;
  protected x: number;
  protected y: number;

  abstract update(): void;
  abstract draw(): void;
}