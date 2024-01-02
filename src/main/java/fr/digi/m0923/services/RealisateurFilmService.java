package fr.digi.m0923.services;

import fr.digi.m0923.entities.Film;
import fr.digi.m0923.entities.Realisateur;
import fr.digi.m0923.entities.RealisateurFilm;
import fr.digi.m0923.repositories.RealisateurFilmRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RealisateurFilmService {

    @Autowired
    private RealisateurFilmRepository realisateurFilmRepository;

    @Autowired
    private RealisateurService realisateurService;

    @Autowired
    private FilmService filmService;

    /**
     * Crée une association entre un réalisateur et un film et l'enregistre en base de données.
     *
     * @param realisateurFilm L'entité RealisateurFilm à créer.
     * @return L'entité RealisateurFilm créée et enregistrée.
     */
    @Transactional
    public RealisateurFilm createRealisateurFilm(RealisateurFilm realisateurFilm) {
        // Récupération du réalisateur à partir de son identifiant IMDB
        Realisateur realisateur = realisateurService.findByIdIMDB(realisateurFilm.getRealisateur().getIdIMDB());

        // Récupération du film à partir de son identifiant IMDB
        Film film = filmService.findByIdIMDB(realisateurFilm.getFilm().getIdIMDB());

        // Association du réalisateur et du film à l'entité RealisateurFilm
        realisateurFilm.setRealisateur(realisateur);
        realisateurFilm.setFilm(film);

        // Enregistrement de l'entité RealisateurFilm en base de données
        return realisateurFilmRepository.save(realisateurFilm);
    }
}
