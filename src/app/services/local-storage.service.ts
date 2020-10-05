import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

const KEY = 'ats::DATA';
const KEY_SETTINGS = 'SETTINGS';
const KEY_AUTH_DATA = 'AUTH_DATA';


export interface AuthData {
  code_verifier?: string;
  authorization_code?: string;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  refresh_at: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private nativeStorage: NativeStorage,
    private platform: Platform) {

  }

  private async getItem<T>(key: string): Promise<T> {
    if (this.platform.is('hybrid')) {
      return this.nativeStorage.getItem(key);
    }
    const data = localStorage.getItem(key);
    return JSON.parse(data) as T;
  }

  private async setItem<T>(key: string, data: T): Promise<void> {
    let value: string;
    if (this.platform.is('hybrid')) {
      return this.nativeStorage.setItem(key, data);
    }
    value = JSON.stringify(data);
    return localStorage.setItem(key, value);
  }

  private async removeItem(key: string): Promise<void> {
    if (this.platform.is('hybrid')) {
      return this.nativeStorage.remove(key);
    }
    return localStorage.removeItem(key);
  }

  private async clearStorage(): Promise<void> {
    if (this.platform.is('hybrid')) {
      return this.nativeStorage.clear();
    }
    return localStorage.clear();
  }
  async removeAuthData(): Promise<void> {
    const key = `${KEY}::${KEY_AUTH_DATA}`;
    return this.removeItem(key);
  }

  async setAuthData(data: AuthData): Promise<void> {
    try {
      const key = `${KEY}::${KEY_AUTH_DATA}`;
      await this.setItem(key, data);
    } catch (reason) {
      throw new Error('Error saving auth data');
    }
  }

  async getAuthData(): Promise<AuthData> {
    const key = `${KEY}::${KEY_AUTH_DATA}`;
    try {
      const authData: AuthData = await this.getItem(key);
      return authData;
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        return null;
      }
      console.log(reason);
      throw new Error('Error getting auth data');
    }
  }

  async clear(): Promise<void> {
    return this.clearStorage();
  }
}
