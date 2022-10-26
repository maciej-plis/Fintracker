package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.jpa.TransactionExecutor
import matthias.expense_tracker.openapi.model.PurchaseDto
import org.springframework.stereotype.Service
import java.util.*


@Service
internal class PurchaseService(
    private val purchaseRepository: PurchaseRepository,
    private val transactionEx: TransactionExecutor,
) {

    fun getPurchases(): List<PurchaseDto> {
        return purchaseRepository.findAll().map { it.toDTO() }
    }

    fun getPurchaseOrThrow(purchaseId: UUID): PurchaseDto {
        return purchaseRepository.findByIdOrThrow(purchaseId).toDTO()
    }

    fun addPurchases(purchaseDto: PurchaseDto): PurchaseDto {
        val savedPurchase = transactionEx.executeInTx {
            return@executeInTx purchaseRepository.save(purchaseDto.toEntity())
        }
        return purchaseRepository.refresh(savedPurchase).toDTO()
    }
}