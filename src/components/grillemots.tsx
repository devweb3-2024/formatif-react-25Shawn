import React from "react";
import { Grid, Paper } from "@mui/material";

interface GrilleMotsProps {
  essais: string[];
  essaiCourant: string;
  motCible: string;
}

const GrilleMot: React.FC<GrilleMotsProps> = ({
  essais,
  essaiCourant,
  motCible,
}) => {
  // SD : Modification du nombre de rangées pour en avoir 6x5
  const rows = Array.from({ length: 6 }, (_, i) => {
    const guess =
      essais[i] || (i === essais.length ? essaiCourant.toUpperCase() : "");
    return guess.padEnd(5, " ");
  });

  const obtenirCouleurLettre = (letter: string, index: number) => {
    if (!motCible) return "default";
    if (motCible[index] === letter) return "success.main";
    if (motCible.includes(letter)) return "warning.main";
    return "grey.500";
  };

  return (
    // SD : Ajout d'une taille pour la grille
    <Grid container spacing={1} sx={{ marginTop: 2, width: "338px" }}>
      {rows.map((row, rowIndex) => (
        <Grid container item spacing={1} key={rowIndex}>
          {row.split("").map((letter, index) => (
            <Grid item xs={2.4} key={index}>
              <Paper
                sx={{
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: obtenirCouleurLettre(letter, index),
                  color: "white",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {letter}
              </Paper>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default GrilleMot;
