package fr.digi.m0923.repositories;

import fr.digi.m0923.entities.RealisateurFilm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RealisateurFilmRepository extends JpaRepository<RealisateurFilm, Integer> {

    // Aucune méthode spécifique n'est définie ici, car JpaRepository fournit déjà des méthodes pour
    // les opérations CRUD de base. Ces méthodes peuvent être utilisées telles quelles ou personnalisées
    // selon les besoins spécifiques de l'application.

}
