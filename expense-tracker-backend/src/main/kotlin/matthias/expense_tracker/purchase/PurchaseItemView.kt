package matthias.expense_tracker.purchase

import java.time.LocalDate
import java.util.*

interface PurchaseItemView {

    fun getId(): UUID
    fun getDate(): LocalDate
    fun getShopName(): String
    fun getProductsCount(): Int
    fun getTotalPrice(): Double
}