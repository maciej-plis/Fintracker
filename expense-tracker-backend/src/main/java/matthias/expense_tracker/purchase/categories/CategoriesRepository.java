package matthias.expense_tracker.purchase.categories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface CategoriesRepository extends JpaRepository<CategoryEntity, UUID> {

    boolean existsByName(String name);
}
