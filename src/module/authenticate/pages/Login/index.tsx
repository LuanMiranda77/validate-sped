import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonBase } from "../../../../components/Buttons/ButtonBase";
import { InputBase } from "../../../../components/Inputs/InputBase";
import { Logo } from "../../../../components/Logo";
import { login } from "../../../../service/auth";
import { SizeLogo } from "../../../../types/enums/size-logo";
import { Container } from "./styles";

function Login() {
  const [form, setForm] = useState({
    user: "",
    password: "",
  });
  const enter = () => {
    if (form.user == "flavio" && form.password == "1") {
      toast.success("login sucess");
      login(form);
    } else {
      toast.error("Usuário ou senha incorreto");
    }
  };

  return (
    <Container>
      <div className="div-left">
        <div className="card-local p-5">
          <h3>
            <Logo size="MEDIUM" />
            Bem vindo ao sistema
          </h3>
          <div style={{ margin: "3rem" }}>
            <InputBase
              type="text"
              model="input_line"
              placeholder=""
              label="Usuário"
              value={form.user}
              onChange={(e) => setForm({ ...form, user: e.target.value })}
            />
            <InputBase
              type="password"
              model="input_line"
              placeholder=""
              label="Senha"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <ButtonBase
              label="ENTRAR"
              model="btn_base"
              className="primary-color"
              size="small"
              onClick={enter}
            />
          </div>
        </div>
      </div>
      <div className="div-right">
        <Logo size={SizeLogo.MEDIUM}></Logo>
        <h1>Liberte-se</h1>
        <h2>Escolha seu melhor sistema</h2>
        <h2>Que vai te ajudar e gerenciar seu negocio</h2>
      </div>
    </Container>
  );
}

export default Login;
