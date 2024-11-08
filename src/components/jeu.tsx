import React, { useState, useEffect } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import GrilleMot from "./grillemots";
import obtenirMotAleatoire, { listeMots } from "../utils/mots";
import Clavier from "./clavier";

const Jeu = () => {
  const [motCible, setMotCible] = useState<string>("");
  const [essais, setEssais] = useState<string[]>([]);
  const [essaiCourant, setEssaiCourant] = useState<string>("");
  const [finPartie, setFinPartie] = useState<boolean>(false);

  const [message, setMessage] = useState<{
    text: string;
    severity: "success" | "error";
  } | null>(null);

  useEffect(() => {
    setMotCible(obtenirMotAleatoire());
  }, []);

  useEffect(() => {
    if (essais.length > 0) {
      verifierDernierEssai();
    }
  }, [essais]);

  const verifierDernierEssai = () => {
    const dernierEssai = essais[essais.length - 1];
    console.log(dernierEssai);
    console.log(essais);
    if (dernierEssai === motCible) {
      setFinPartie(true);
      setMessage({
        text: "Félicitations ! Vous avez trouvé le mot !",
        severity: "success",
      });
    } else if (essais.length > 5) {
      setFinPartie(true);
      setMessage({
        text: `Dommage ! Le mot était "${motCible}".`,
        severity: "error",
      });
    }
  };

  console.log(motCible);
  const handleSoumettreEssai = () => {
    if (essaiCourant.length !== 5) {
      setMessage({
        text: "Le mot doit comporter 5 lettres.",
        severity: "error",
      });
      return;
    }
    if (
      // SD : Ajout d'un map pour aller chercher le mot à comparer avec l'essai courant
      !listeMots
        .map((mot) => mot.toUpperCase())
        .includes(essaiCourant.toUpperCase())
    ) {
      console.log(essaiCourant);
      setMessage({
        text: "Ce mot n'est pas dans la liste.",
        severity: "error",
      });
      return;
    }
    setEssais([...essais, essaiCourant.toUpperCase()]);
    setEssaiCourant("");
  };

  return (
    <Container maxWidth="sm">
      <GrilleMot
        essais={essais}
        motCible={motCible}
        essaiCourant={essaiCourant}
      />
      <Clavier
        essaiCourant={essaiCourant}
        setEssaiCourant={setEssaiCourant}
        onEnter={handleSoumettreEssai}
        inactif={finPartie}
      />
      {message && (
        <Snackbar open autoHideDuration={6000} onClose={() => setMessage(null)}>
          <Alert
            onClose={() => setMessage(null)}
            severity={message.severity}
            sx={{ width: "100%" }}
          >
            {message.text}
          </Alert>
        </Snackbar>
      )}

      {/* SD : Ajout d'un bouton pour recommencer la partie */}
      <button
        type="button"
        style={{
          width: "70%",
          height: "35px",
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1976d2",
          color: "white",
        }}
        onClick={() => window.location.reload()}
      >
        Recommencer la partie
      </button>
    </Container>
  );
};

export default Jeu;
