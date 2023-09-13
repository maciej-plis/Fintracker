package matthias.expense_tracker.purchase_summary

import io.github.perplexhub.rsql.RSQLJPASupport.toSort
import io.github.perplexhub.rsql.RSQLJPASupport.toSpecification
import matthias.expense_tracker.api.models.PurchaseSummariesPage
import matthias.expense_tracker.common.jpa.PaginationRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
internal class PurchaseSummaryService(
    private val purchaseSummaryRepository: PurchaseSummaryRepository
) {

    @Transactional(readOnly = true)
    fun getPurchaseSummaries(paginationRequest: PaginationRequest): PurchaseSummariesPage {
        return purchaseSummaryRepository.findAll(
            toSpecification<PurchaseSummaryEntity?>(paginationRequest.filter).and(toSort(paginationRequest.sort)),
            paginationRequest.pageable
        ).toDTO()
    }
}