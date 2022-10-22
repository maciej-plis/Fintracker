package matthias.expense_tracker.purchase.products;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

interface ProductsRepository extends JpaRepository<ProductEntity, UUID> {
    List<ProductEntity> findAllByNameContainingIgnoreCase(String query);
}
