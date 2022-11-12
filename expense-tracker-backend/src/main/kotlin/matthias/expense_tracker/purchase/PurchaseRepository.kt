package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.jpa.BaseRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import java.util.*

internal interface PurchaseRepository : BaseRepository<PurchaseEntity, UUID> {

    @Modifying
    @Query("delete from product where purchase_id = ?", nativeQuery = true)
    fun deletePurchaseProducts(purchaseId: UUID)

    @Query(
        "SELECT p.id as id, p.date as date, p.createdAt as createdAt, p.shop.name as shopName, COUNT(pp) as productsCount, SUM(pp.amount * pp.price) AS totalPrice " +
        "FROM PurchaseEntity p " +
        "JOIN p.products pp " +
        "GROUP BY p.id, p.date, p.shop.name, p.createdAt"
    )
    fun getPurchaseItems(pageable: Pageable): Page<PurchaseItemView>
}
