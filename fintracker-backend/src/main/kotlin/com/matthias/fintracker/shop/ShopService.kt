package com.matthias.fintracker.shop

import com.matthias.fintracker.api.models.AddShopRequest
import com.matthias.fintracker.api.models.ShopDTO
import com.matthias.fintracker.common.jpa.TransactionExecutor
import jakarta.persistence.EntityExistsException
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

    fun getPurchaseShopOrThrow(shopId: UUID): ShopDTO = txExecutor.readTx {
        return@readTx shopRepository.findByIdOrThrow(shopId).toDTO()
    }

    fun addPurchaseShop(request: AddShopRequest): UUID = txExecutor.tx {
        shopRepository.existsByNameIgnoreCase(request.name) && throw EntityExistsException("Shop with name '${request.name}' already exist")
        return@tx shopRepository.save(request.toEntity()).id
    }
}
