package matthias.expense_tracker.purchases.shops;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
interface ShopsRepository extends JpaRepository<ShopEntity, UUID> {
    boolean existsByName(String name);
}
