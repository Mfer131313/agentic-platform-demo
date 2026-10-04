# Agentic Platform por industria

Cuatro consolas de Agentic Platform con la misma estructura y los mismos casos ejecutados con agentes que la demo de
Congelados de Navarra:

| Industria | Empresa ficticia | Consola |
|---|---|---|
| Maquinaria industrial | Hidromec Ebro | `consola.html?ind=maquinaria` |
| Banca y servicios financieros | Banco Cierzo | `consola.html?ind=banca` |
| Gran consumo y retail | Mercados Moncayo | `consola.html?ind=retail` |
| Cervecera y bebidas | Cervecera Bardenas | `consola.html?ind=cerveceria` |

Cada consola tiene las ocho escenas de la demo de referencia: resumen del turno, de palabras a workflow, alarma con
aprobación humana, reclamación de cliente, simulacro de trazabilidad, cuestionario de cliente, procedimientos con
citas y cómo encaja Agentic Platform. Los casos de cada sector y sus identificadores están en [HISTORIAS.md](HISTORIAS.md).

## Abrirla

Cada push a `main` publica la demo en GitHub Pages (`.github/workflows/pages.yml`).
El workflow genera además `agentic-consola.html`, una descarga con los recursos incrustados
para abrirla en el ordenador y configurar la conexión al modelo.

Es HTML, CSS y JavaScript sin compilación ni dependencias. Basta con servir la carpeta:

```bash
python3 -m http.server 8080 --directory .
# http://localhost:8080/            portada con las cuatro industrias
# http://localhost:8080/consola.html?ind=banca#alarma
```

`?reset=1` borra el estado guardado de la industria abierta. Cada industria guarda su estado aparte en el
navegador (`agentic-ind-<industria>-v1`), así que publicar un workflow en banca no afecta a la cervecera.

## Cómo está hecha

```
index.html                       portada: selector de industria
consola.html                     la consola (marco de la demo de referencia)
HISTORIAS.md                     casos e identificadores por industria
assets/css/                      tokens y estilos de la demo de referencia, más opsmap.css e industrias.css
assets/js/
  industries/_register.js        agenticPack(id, parte): reúne las partes de cada paquete
  industries/<industria>/        meta, turno, trace, workflow, alarma, reclamacion, retirada,
                                 cuestionario, procedimientos, plataforma (solo datos)
  boot.js                        elige el paquete (?ind= o la última industria), lo publica como CN_DATA y aplica sus colores
  core.js                        núcleo de la demo de referencia (App.*), con almacenamiento por industria y traza genérica
  opsmap.js                      mapa de la operación por zonas (sustituye al plano de planta)
  scenes/*.js                    las ocho escenas, genéricas: todo el texto del sector sale de CN_DATA
```

Las escenas no contienen texto de ningún sector. Para añadir una industria se crea una carpeta en
`assets/js/industries/` con las diez partes, se añade su id a `boot.js` y a la portada, y se cargan sus ficheros en
`consola.html`.

Los conectores de negocio son de demostración. Frontera muestra respuestas preparadas, sin llamar a un modelo.
Local puede llamar a una API compatible con OpenAI/LiteLLM para redactar procedimientos, cuestionario y respuesta
a reclamación, con URL, modelo y token configurados por el usuario. Las demás acciones siguen simuladas.

## Con Prodigy detrás

El modo **Prodigy** envía las mismas consultas (procedimientos, cuestionario y respuesta a reclamación) al
orquestador de Prodigy por su API (`POST /auth/login` y `POST /chat`), así que el plan, la elección de
capacidades, el modelo y el consumo de tokens los decide Prodigy.

1. Arranca Prodigy en tu ordenador con una clave de LLM en su `.env` (`docker compose up`; la API queda en
   `http://localhost:9700`, comprobable en `http://localhost:9700/health`).
2. Sirve la consola con el proxy incluido, que reenvía `/prodigy/*` a Prodigy y evita problemas de CORS:

   ```bash
   python3 tools/serve.py --prodigy http://localhost:9700
   ```

3. Abre `http://localhost:8080/consola.html`, pulsa **Prodigy** en el selector de modelo y entra con un usuario
   de Prodigy. El token se guarda solo en el navegador; si caduca, la consola vuelve a pedir la contraseña.

Desde el enlace publicado en claude.ai el modo Prodigy no funciona: la página no puede llamar a otros servidores.
