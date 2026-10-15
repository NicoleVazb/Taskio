import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthShell from "../components/AuthShell";
import { supabase } from "../lib/supabase";

const traduzir = (error) => {
  const m = (error.message || "").toLowerCase();
  if (m.includes("invalid login")) return "E-mail ou senha incorretos.";
  if (m.includes("not confirmed")) return "Confirme seu e-mail antes de entrar.";
  if (m.includes("rate limit")) return "Muitas tentativas. Espere um pouco e tente de novo.";
  if (m.includes("invalid api key")) return "Chave do Supabase inválida. Confira as variáveis de ambiente.";
  if (m.includes("failed to fetch")) return "Não consegui falar com o Supabase. Confira a URL nas variáveis de ambiente e se o projeto não está pausado.";
  return "Erro: " + error.message;
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/");
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        console.error("Erro do Supabase:", error);
        return setError(traduzir(error));
      }
      router.push("/");
    } catch (err) {
      console.error("Erro inesperado:", err);
      setError(traduzir(err));
    } finally {
      setLoading(false);
    }
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