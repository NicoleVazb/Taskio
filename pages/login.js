import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthShell from "../components/AuthShell";
import { supabase } from "../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // se já estiver logado, vai direto para o app
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/");
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      const m = error.message || "";
      if (m.includes("Invalid login")) return setError("E-mail ou senha incorretos.");
      if (m.includes("not confirmed")) return setError("Confirme seu e-mail antes de entrar.");
      return setError("Não foi possível entrar. Tente de novo.");
    }
    router.push("/");
  };

  return (
    <AuthShell
      title="Entrar"
      subtitle="Acesse suas tarefas e metas da semana."
      footer={<>Ainda não tem conta? <a href="/cadastro">Criar conta</a></>}
    >
      <form onSubmit={submit}>
        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com" autoComplete="email" required />
        </label>
        <label>
          Senha
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha" autoComplete="current-password" required />
        </label>
        {error && <p className="err" role="alert">{error}</p>}
        <button className="btn" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
      </form>
    </AuthShell>
  );
}