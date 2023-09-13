package matthias.expense_tracker.purchase_summary

import matthias.expense_tracker.api.apis.PurchaseSummariesApi
import matthias.expense_tracker.api.models.PurchaseSummariesPage
import matthias.expense_tracker.common.jpa.PaginationRequest
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.RestController

@RestController
internal class PurchaseSummaryController(
    private val purchaseSummaryService: PurchaseSummaryService
) : PurchaseSummariesApi {

    override fun getPurchaseSummaries(page: Int?, pageSize: Int?, sort: String?, filter: String?): ResponseEntity<PurchaseSummariesPage> {
        return ok(purchaseSummaryService.getPurchaseSummaries(PaginationRequest(page, pageSize, sort, filter)))
    }
}