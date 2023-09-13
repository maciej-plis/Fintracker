package matthias.expense_tracker.purchase_summary

import matthias.expense_tracker.common.jpa.BaseRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import java.util.*

internal interface PurchaseSummaryRepository : BaseRepository<PurchaseSummaryEntity, UUID>, JpaSpecificationExecutor<PurchaseSummaryEntity>
