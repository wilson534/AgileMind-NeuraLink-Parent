declare module 'howler' {
  export class Howl {
    constructor(options?: any);
    play(sprite?: string | number): number;
    pause(id?: number): this;
    stop(id?: number): this;
    volume(volume?: number, id?: number): this | number;
    fade(from: number, to: number, duration: number, id?: number): this;
    mute(muted?: boolean, id?: number): this | boolean;
    seek(seek?: number, id?: number): this | number;
    loop(loop?: boolean, id?: number): this | boolean;
    state(): string;
    playing(id?: number): boolean;
    duration(id?: number): number;
    on(event: string, listener: Function, id?: number): this;
    once(event: string, listener: Function, id?: number): this;
    off(event: string, listener?: Function, id?: number): this;
    load(): this;
    unload(): void;
  }

  export class Howler {
    static volume(volume?: number): number | Howler;
    static mute(muted?: boolean): boolean | Howler;
    static stop(): void;
    static codecs(ext: string): boolean;
  }
}