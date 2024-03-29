package matthias.expense_tracker.purchase

import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface TestPurchaseRepository extends PurchaseRepository {

    @Query("SELECT p FROM PurchaseEntity p ORDER BY p.createdAt DESC LIMIT 1")
    PurchaseEntity findLatest()

    @Query(value = "SELECT * FROM purchase WHERE deleted = true", nativeQuery = true)
    List<PurchaseEntity> getDeletedPurchases()
}
