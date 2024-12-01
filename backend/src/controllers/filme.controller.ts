import { Request, Response } from "express";
import connection from "../../db";

async function getRankGenero(request: Request, response: Response) {
  const { id } = request.params;
  const query = `SELECT nome, colocacao, avg_nota
                    FROM (
                        SELECT
                            gênero.nome AS nome, 
                            gênero.id AS gênero,
                            round(AVG(avaliacao_IMDb), 3) AS avg_nota,
                            RANK() OVER (ORDER BY AVG(avaliacao_IMDb) DESC) AS colocacao
                        FROM gênero
                        INNER JOIN filme_genero ON gênero.id = filme_genero.fk_gênero_id
                        INNER JOIN filme ON filme.id = filme_genero.fk_filme_id
                        INNER JOIN avaliação ON avaliação.fk_filme_id = filme.id
                        GROUP BY gênero.id
                    ) as colocacao_genero
                    WHERE gênero = ?;`;

  try {
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        response.status(500).send("Error fetching data");
        return;
      }
      response.status(201).json(results);
    });
  } catch (error) {
    return response.status(500).json({
      messageError: "Erro interno no servidor",
      error: (error as Error).message,
    });
  }
}

async function getInfoFilme(request: Request, response: Response) {
  const { id } = request.params;
  const query = `SELECT f.poster , titulo,ano_lancamento,arrecadacao, JSON_ARRAYAGG(
                        JSON_OBJECT('person_name', p.nome , 'person_function', t.funcao)
                    ) AS people, f.sinopse 
                    FROM filme f
                    JOIN filme_genero fg
                    ON f.id = fg.fk_Filme_id
                    JOIN gênero g
                    ON fg.fk_Gênero_id = g.id
                    AND g.id = ?
                    LEFT JOIN trabalha AS t
                    ON f.id = t.fk_Filme_id
                    LEFT JOIN pessoa AS p
                    ON  p.id = t.fk_Pessoa_id
                    GROUP BY
                        f.id , f.titulo ;`;

  try {
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        response.status(500).send("Error fetching data");
        return;
      }
      response.status(201).json(results);
    });
  } catch (error) {
    return response.status(500).json({
      messageError: "Erro interno no servidor",
      error: (error as Error).message,
    });
  }
}

async function getGenresRand(request: Request, response: Response) {
  const query = `SELECT nome FROM gênero
                ORDER BY rand() LIMIT 4;`;

  try {
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        response.status(500).send("Error fetching data");
        return;
      }
      response.status(201).json(results);
    });
  } catch (error) {
    return response.status(500).json({
      messageError: "Erro interno no servidor",
      error: (error as Error).message,
    });
  }
}

export { getRankGenero, getInfoFilme, getGenresRand };
