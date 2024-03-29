package matthias.expense_tracker.shop

import jakarta.persistence.EntityExistsException
import matthias.expense_tracker.api.models.AddShopRequest
import matthias.expense_tracker.api.models.ShopDTO
import matthias.expense_tracker.common.jpa.TransactionExecutor
import org.springframework.stereotype.Service
import java.util.*

@Service
internal class ShopService(
    private val shopRepository: ShopRepository,
    private val txExecutor: TransactionExecutor
) {

    fun getPurchaseShops(): List<ShopDTO> = txExecutor.readTx {
        return@readTx shopRepository.findAllByOrderByName().map { it.toDTO() }
    }

    fun getShopOrThrow(shopId: UUID): ShopDTO = txExecutor.readTx {
        return@readTx shopRepository.findByIdOrThrow(shopId).toDTO()
    }

    fun addPurchaseShop(request: AddShopRequest): UUID = txExecutor.tx {
        shopRepository.existsByName(request.name) && throw EntityExistsException("Shop with name '${request.name}' already exist")
        return@tx shopRepository.save(request.toEntity()).id
    }
}
