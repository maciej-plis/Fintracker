package matthias.expense_tracker.purchase_summary

import matthias.expense_tracker.api.models.PurchaseSummariesPage
import matthias.expense_tracker.common.jpa.PaginationRequest
import matthias.expense_tracker.common.jpa.TransactionExecutor
import org.springframework.stereotype.Service

@Service
internal class PurchaseSummaryService(
    private val purchaseSummaryRepository: PurchaseSummaryRepository,
    private val txExecutor: TransactionExecutor
) {

    fun getPurchaseSummaries(paginationRequest: PaginationRequest): PurchaseSummariesPage = txExecutor.readTx {
        return@readTx purchaseSummaryRepository.findAll(paginationRequest).toDTO()
    }
}
