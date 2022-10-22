package matthias.expense_tracker.purchase

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
internal interface PurchaseRepository : JpaRepository<PurchaseEntity, UUID>
