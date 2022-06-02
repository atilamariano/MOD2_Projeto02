import express from "express";
import path from "path";


const __dirname = path.resolve(path.dirname(""));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

let pokedex = [
  {
    id: 0.01,
    nome: "Mewtwo ",
    tipo: "Psychic",
    categoria: "Genetic",
    habilidade: "Pressure",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png",
  },
  {
    id: 0.02,
    nome: "Arbok ",
    tipo: "Poison",
    categoria: "Cobra",
    habilidade: "Shed Skin",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/024.png",
  },
  {
    id: 0.03,
    nome: "Ninetales  ",
    tipo: "Psychic",
    categoria: "Fox",
    habilidade: "Flash Fire",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/038.png",
  },
  {
    id: 0.04,
    nome: "Sawk",
    tipo: "Fighting",
    categoria: "Karate",
    habilidade: "Inner Focus",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/539.png",
  },
  {
    id: 0.05,
    nome: "Cyndaquil",
    tipo: "Fire",
    categoria: "Fire Mouse",
    habilidade: "Blaze",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/155.png",
  },
];
let message = "";

app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index.ejs", {
    pokedex,
    message,
  });
});

app.get("/detalhes/:id", (req, res) => {
  let pokemon;
  pokedex.filter((element) => {
    if (element.id == req.params.id) {
      pokemon = element;
    }
  });
  console.log(pokemon);
  res.render("detalhes.ejs", {
    pokemon,
  });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro.ejs");
});

app.post("/cadastro", (req, res) => {
  const pokemon = req.body;
  pokemon.id = (pokedex.length / 100 + +0.01).toFixed(2);
  pokedex.push(pokemon);
  message = `Pokemon Cadastrado!`;
  res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
