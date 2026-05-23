import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { JwtPayload, LoginRequest, LoginResponse } from '../interfaces/private/login.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = environment.apiUrl;
  private readonly TOKEN_KEY = environment.tokenKey;

  private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

  isAuthenticated = computed(() => !!this._token());
  token = computed(() => this._token());

  private _user = signal<string | null>(localStorage.getItem('username'));

  user = computed(() => this._user());

  payload = computed<JwtPayload | null>(() => {
    const t = this._token();
    return t ? this.decodeToken(t) : null;
  });

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.API}/auth/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this._token.set(res.token);
        localStorage.setItem('username', res.username);
        this._user.set(res.username);
      }),
    );
  }

  logout(router: any) {
    localStorage.removeItem(this.TOKEN_KEY);
    this._token.set(null);
    localStorage.removeItem('username');
    this._user.set(null);
    router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._token();
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }
}
