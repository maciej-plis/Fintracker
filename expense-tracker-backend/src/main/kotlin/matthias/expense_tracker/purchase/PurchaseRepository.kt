package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.jpa.BaseRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import java.util.*

internal interface PurchaseRepository : BaseRepository<PurchaseEntity, UUID>, JpaSpecificationExecutor<PurchaseEntity> {

    @Modifying
    @Query("delete from product where purchase_id = ?", nativeQuery = true)
    fun deletePurchaseProducts(purchaseId: UUID)
}
