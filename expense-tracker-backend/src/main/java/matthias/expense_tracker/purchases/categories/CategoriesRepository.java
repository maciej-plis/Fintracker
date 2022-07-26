package matthias.expense_tracker.purchases.categories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
interface CategoriesRepository extends JpaRepository<CategoryEntity, UUID> {

    boolean existsByName(String name);
}
