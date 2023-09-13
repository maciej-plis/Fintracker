package matthias.expense_tracker.shop

import matthias.expense_tracker.api.models.AddShopRequest
import matthias.expense_tracker.api.models.ShopDTO
import matthias.expense_tracker.common.jpa.TransactionExecutor
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*
import javax.persistence.EntityExistsException

@Service
internal class ShopService(
    private val shopRepository: ShopRepository,
    private val transactionEx: TransactionExecutor
) {

    fun getPurchaseShops(): List<ShopDTO> {
        return shopRepository.findAll().map { it.toDTO() }
    }

    @Transactional(readOnly = true)
    fun getShopOrThrow(shopId: UUID): ShopDTO {
        return shopRepository.findByIdOrThrow(shopId).toDTO()
    }

    fun addPurchaseShop(request: AddShopRequest): UUID {
        return transactionEx.executeInTx {
            shopRepository.existsByName(request.name) && throw EntityExistsException("Shop with name '${request.name}' already exist")
            return@executeInTx shopRepository.save(request.toEntity()).id
        }
    }
}
