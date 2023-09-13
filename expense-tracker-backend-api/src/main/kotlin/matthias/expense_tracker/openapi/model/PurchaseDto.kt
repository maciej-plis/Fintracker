package matthias.expense_tracker.openapi.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import matthias.expense_tracker.openapi.model.ProductDto
import matthias.expense_tracker.openapi.model.ShopDto
import io.swagger.v3.oas.annotations.media.Schema

/**
 *
 * @param id
 * @param shop
 * @param date
 * @param products
 */
data class PurchaseDto(

    @Schema(example = "4a807620-7e35-4824-bbe9-acf4a597c97f", required = true, description = "")
    @field:JsonProperty("id", required = true) val id: java.util.UUID,

    @Schema(example = "null", required = true, description = "")
    @field:JsonProperty("shop", required = true) val shop: ShopDto,

    @Schema(example = "Mon Jul 27 02:00:00 CEST 2020", required = true, description = "")
    @field:JsonProperty("date", required = true) val date: java.time.LocalDate,

    @Schema(example = "null", required = true, description = "")
    @field:JsonProperty("products", required = true) val products: kotlin.collections.List<ProductDto>
) {

}

