import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthShell from "../components/AuthShell";
import { supabase } from "../lib/supabase";

// traduz os erros mais comuns; se não reconhecer, mostra a mensagem original
const traduzir = (error) => {
  const m = (error.message || "").toLowerCase();
  if (m.includes("already")) return "Este e-mail já tem cadastro. Entre na sua conta.";
  if (m.includes("rate limit")) return "Muitas tentativas. Espere um pouco e tente de novo.";
  if (m.includes("signups not allowed")) return "Cadastros estão desativados no Supabase.";
  if (m.includes("invalid api key")) return "Chave do Supabase inválida. Confira o .env.local.";
  if (m.includes("failed to fetch")) return "Não consegui falar com o Supabase. Confira a URL no .env.local e se o projeto não está pausado.";
  if (m.includes("password")) return "Senha recusada: " + error.message;
  if (m.includes("invalid") && m.includes("email")) return "O Supabase recusou este e-mail. Tente um e-mail real.";
  return "Erro: " + error.message;
};

export default function Cadastro() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/");
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (password.length < 6) return setError("A senha precisa ter pelo menos 6 caracteres.");
    if (password !== confirm) return setError("As senhas não são iguais.");

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("Erro do Supabase:", error);
        return setError(traduzir(error));
      }

      // Se o e-mail já existe e a confirmação está ligada, o Supabase
      // devolve um usuário sem identidades em vez de um erro.
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        return setError("Este e-mail já tem cadastro. Entre na sua conta.");
      }

      // confirmação de e-mail desligada: já vem logado
      if (data.session) return router.push("/");

      // confirmação de e-mail ligada
      setInfo("Conta criada! Enviamos um link de confirmação para o seu e-mail.");
    } catch (err) {
      console.error("Erro inesperado:", err);
      setError(traduzir(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Criar conta"
      subtitle="Leva menos de um minuto."
      footer={<>Já tem conta? <a href="/login">Entrar</a></>}
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
            placeholder="Mínimo de 6 caracteres" autoComplete="new-password" required />
        </label>
        <label>
          Repetir senha
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
            placeholder="Digite a senha de novo" autoComplete="new-password" required />
        </label>
        {error && <p className="err" role="alert">{error}</p>}
        {info && <p className="ok" role="status">{info}</p>}
        <button className="btn" disabled={loading}>{loading ? "Criando..." : "Criar conta"}</button>
      </form>
    </AuthShell>
  );
}