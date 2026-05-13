import { Injectable } from '@angular/core';

@Injectable()
export abstract class StorageService<State extends Record<string, unknown>, Key extends keyof State = keyof State> {
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

  public removeItem(key: Key): void {
    this.storage.removeItem(this.generateKey(key));
  }

  public getItem<K extends Key>(key: K): State[K] | null;
  public getItem<K extends Key>(key: K, defaultValue: State[K]): State[K];
  public getItem<K extends Key>(key: K, defaultValue?: State[K]): State[K] | null {
    const savedValue = this.storage.getItem(this.generateKey(key));
    return savedValue === null ? (defaultValue ?? null) : JSON.parse(savedValue);
  }

  public setItem<K extends Key>(key: K, value: State[K]): void {
    this.storage.setItem(this.generateKey(key), JSON.stringify(value));
  }

  public generateKey(key: Key): string {
    return `${this.prefix}:${key.toString()}`;
  }
}
