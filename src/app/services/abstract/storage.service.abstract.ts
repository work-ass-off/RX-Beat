export abstract class StorageService<State extends Record<string, unknown>> {
  protected readonly storage: Storage;
  protected readonly prefix: string;

  constructor(storage: Storage, prefix: string) {
    this.storage = storage;
    this.prefix = prefix;
  }

  public get length(): number {
    return this.storage.length;
  }

  public key(index: number): string | null {
    return this.storage.key(index);
  }

  public clear(): void {
    this.storage.clear();
  }

  public removeItem<Key extends keyof State>(key: Key): void {
    this.storage.removeItem(this.generateKey(key));
  }

  public getItem<Key extends keyof State>(key: Key): State[Key] | null;

  public getItem<Key extends keyof State>(key: Key, defaultValue: State[Key]): State[Key];

  public getItem<Key extends keyof State>(key: Key, defaultValue?: State[Key]): State[Key] | null {
    const savedValue = this.storage.getItem(this.generateKey(key));

    if (savedValue === null) {
      return defaultValue ?? null;
    }

    return JSON.parse(savedValue);
  }

  public setItem<Key extends keyof State>(key: Key, value: State[Key]): void {
    this.storage.setItem(this.generateKey(key), JSON.stringify(value));
  }

  protected generateKey<Key extends keyof State>(key: Key): string {
    return `${this.prefix}:${String(key)}`;
  }
}
