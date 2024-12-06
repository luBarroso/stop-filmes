import { Request, Response } from "express";
import connection from "../../db";

async function getVerificaFilme(request: Request, response: Response) {
  const { genero, letra } = request.params;
  const query = `SELECT f.titulo, f.id FROM filme f
                  JOIN filme_genero fg ON (f.id = fg.fk_Filme_id)
                  JOIN gênero g on (fg.fk_Gênero_id = g.id)
                  WHERE g.nome = ? AND
                    f.titulo LIKE ? ;`;

  try {
    connection.query(query, [genero, `${letra}%`], (err, results) => {
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

async function getAvalFilme(request: Request, response: Response) {
  const { id } = request.params;
  const query = `SELECT a.avaliacao_IMDb FROM avaliação a
                  WHERE a.fk_Filme_id = ? AND
                  a.avaliacao_IMDb >= (
                    SELECT avg(a2.avaliacao_IMDb) FROM avaliação a2
                  );`;

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

async function getVerificaPessoa(request: Request, response: Response) {
  const { funcao, letra } = request.params;
  const query = `SELECT distinct Pessoa.nome FROM Pessoa
                  INNER JOIN Trabalha ON Trabalha.fk_Pessoa_id = Pessoa.id
                  WHERE Pessoa.nome like ?
                  AND Trabalha.Funcao = ? ;`;

  try {
    connection.query(query, [`${letra}%`, funcao], (err, results) => {
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

async function getRankGenero(request: Request, response: Response) {
  const { genero } = request.params;
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
                    WHERE nome = ?;`;

  try {
    connection.query(query, [genero], (err, results) => {
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

async function getVotosFilme(request: Request, response: Response) {
  const { id } = request.params;
  const query = `select a.qtd_votos from avaliação a
                where a.fk_Filme_id = ? and a.qtd_votos <= (
                  select avg(a2.qtd_votos) from avaliação a2 
                );`;

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
  const { genero } = request.params;
  const query = `SELECT f.poster , titulo,ano_lancamento,arrecadacao, JSON_ARRAYAGG(
                        JSON_OBJECT('person_name', p.nome , 'person_function', t.funcao)
                    ) AS people, f.sinopse 
                    FROM filme f
                    JOIN filme_genero fg
                    ON f.id = fg.fk_Filme_id
                    JOIN gênero g
                    ON fg.fk_Gênero_id = g.id
                    AND g.nome = ?
                    LEFT JOIN trabalha AS t
                    ON f.id = t.fk_Filme_id
                    LEFT JOIN pessoa AS p
                    ON  p.id = t.fk_Pessoa_id
                    GROUP BY
                        f.id , f.titulo
                    ORDER BY f.titulo ;`;

  try {
    connection.query(query, [genero], (err, results) => {
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
                ORDER BY RAND() LIMIT 6;`;

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

export {
  getVerificaFilme,
  getAvalFilme,
  getVerificaPessoa,
  getRankGenero,
  getVotosFilme,
  getInfoFilme,
  getGenresRand,
};
