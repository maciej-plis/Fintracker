package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.jpa.BaseRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import java.util.*

internal interface PurchaseRepository : BaseRepository<PurchaseEntity, UUID>, JpaSpecificationExecutor<PurchaseEntity>
