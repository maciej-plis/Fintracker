package matthias.expense_tracker.openapi.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema

/**
 *
 * @param id
 * @param shopName
 * @param date
 * @param productsCount
 * @param totalPrice
 * @param createdAt
 */
data class PurchaseItemDto(

    @Schema(example = "4a807620-7e35-4824-bbe9-acf4a597c97f", required = true, description = "")
    @field:JsonProperty("id", required = true) val id: java.util.UUID,

    @Schema(example = "Walmart", required = true, description = "")
    @field:JsonProperty("shopName", required = true) val shopName: kotlin.String,

    @Schema(example = "Mon Jul 27 02:00:00 CEST 2020", required = true, description = "")
    @field:JsonProperty("date", required = true) val date: java.time.LocalDate,

    @Schema(example = "5", required = true, description = "")
    @field:JsonProperty("productsCount", required = true) val productsCount: kotlin.Int,

    @Schema(example = "199.99", required = true, description = "")
    @field:JsonProperty("totalPrice", required = true) val totalPrice: kotlin.Double,

    @Schema(example = "null", required = true, description = "")
    @field:JsonProperty("createdAt", required = true) val createdAt: java.time.Instant
) {

}

