import React, { useState, useRef } from 'react';

function Icon({ children, bg = '#fde8ef' }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className="icon-box" style={{ background: bg }}>
      {children}
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  const validate = () => {
    if (!email) return 'Por favor insira o email.';
    // basic email check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) return 'Endereço de email inválido.';
    if (!password || password.length < 6) return 'Senha deve ter ao menos 6 caracteres.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      // focus the error region for screen readers
      setTimeout(() => errorRef.current?.focus(), 50);
      return;
    }

    setSubmitting(true);
    try {
      // Try real API first
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
      });

      if (res.ok) {
        // In a real app we'd store token and redirect
        alert('Autenticado com sucesso.');
        return;
      }

      // If API returns non-OK, fallback to demo credentials
      const demoOk = (email === 'demo@maple.test' && password === 'demo');
      if (demoOk) {
        alert('Autenticado no modo demo.');
        return;
      }

      const body = await res.text();
      setError(body || 'Erro ao autenticar.');
      setTimeout(() => errorRef.current?.focus(), 50);
    } catch (err) {
      // Network error -> allow demo credentials
      const demoOk = (email === 'demo@maple.test' && password === 'demo');
      if (demoOk) {
        alert('Autenticado no modo demo (offline).');
        return;
      }
      setError('Não foi possível conectar ao servidor. Verifique sua conexão.');
      setTimeout(() => errorRef.current?.focus(), 50);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <aside className="login-left">
          <div className="brand">
            <div className="brand-logo">🍁</div>
            <div>
              <h2 className="brand-title">Maple Plan</h2>
              <p className="brand-sub">Gerenciamento de imigração para casais</p>
            </div>
          </div>

          <ul className="benefits">
            <li>
              <Icon bg="#fff0f6">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14" stroke="#da6a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Icon>
              <div>
                <div className="benefit-title">Planejamento coordenado</div>
                <div className="benefit-sub">Gerencie sua jornada de imigração junto com seu parceiro</div>
              </div>
            </li>

            <li>
              <Icon bg="#fff7ed">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 11v6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 7h8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Icon>
              <div>
                <div className="benefit-title">Seguro e privado</div>
                <div className="benefit-sub">Seus documentos de imigração sensíveis estão protegidos</div>
              </div>
            </li>

            <li>
              <Icon bg="#f0f9ff">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Icon>
              <div>
                <div className="benefit-title">Acompanhe o progresso</div>
                <div className="benefit-sub">Monitore cada etapa do seu processo de imigração</div>
              </div>
            </li>
          </ul>

          <p className="trusted">Confiado por casais ao redor do mundo em sua jornada para o Canadá</p>
        </aside>

        <main className="login-right">
          <div className="login-card">
            <h1 className="login-title">Bem-vindo de volta</h1>
            <p className="login-sub">Faça login para continuar seu planejamento de imigração</p>

            <form onSubmit={handleSubmit} className="login-form" aria-describedby={error ? 'login-error' : undefined}>
              {error && (
                <div
                  id="login-error"
                  ref={errorRef}
                  tabIndex={-1}
                  className="form-error"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </div>
              )}

              <label className="label" htmlFor="email">Endereço de email</label>
              <div className="input-group">
                <span className="input-icon" aria-hidden>📧</span>
                <input id="email" className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com" required disabled={submitting} />
              </div>

              <label className="label" htmlFor="password">Senha</label>
              <div className="input-group">
                <span className="input-icon" aria-hidden>🔒</span>
                <input id="password" className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required disabled={submitting} />
              </div>

              <div className="row-between">
                <label className="checkbox"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} disabled={submitting} /> Lembrar de mim</label>
                <a className="forgot" href="#">Esqueceu a senha?</a>
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting} aria-disabled={submitting}>
                {submitting ? 'Entrando...' : 'Entrar →'}
              </button>

              <div className="divider"><span>Novo no Maple Plan?</span></div>

              <button type="button" className="btn btn-secondary" disabled={submitting}>Criar conta</button>

              <p className="legal">Ao entrar, você concorda com nossos <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a></p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
