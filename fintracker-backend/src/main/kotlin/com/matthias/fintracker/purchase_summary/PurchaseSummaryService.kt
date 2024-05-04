package com.matthias.fintracker.purchase_summary

import com.matthias.fintracker.api.models.PurchaseSummariesPage
import com.matthias.fintracker.common.jpa.PaginationRequest
import com.matthias.fintracker.common.jpa.TransactionExecutor
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
