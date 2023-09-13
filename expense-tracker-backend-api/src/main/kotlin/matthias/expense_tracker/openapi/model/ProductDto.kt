package matthias.expense_tracker.openapi.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import matthias.expense_tracker.openapi.model.CategoryDto
import io.swagger.v3.oas.annotations.media.Schema

/**
 *
 * @param id
 * @param category
 * @param name
 * @param amount
 * @param price
 * @param description
 */
data class ProductDto(

    @Schema(example = "92c58038-3267-4689-bc1c-cd0b1d90cc5f", required = true, description = "")
    @field:JsonProperty("id", required = true) val id: java.util.UUID,

    @Schema(example = "null", required = true, description = "")
    @field:JsonProperty("category", required = true) val category: CategoryDto,

    @Schema(example = "iPhone X", required = true, description = "")
    @field:JsonProperty("name", required = true) val name: kotlin.String,

    @Schema(example = "1.0", required = true, description = "")
    @field:JsonProperty("amount", required = true) val amount: kotlin.Double,

    @Schema(example = "1999.99", required = true, description = "")
    @field:JsonProperty("price", required = true) val price: kotlin.Double,

    @Schema(example = "Bought for my 18th birthday", description = "")
    @field:JsonProperty("description") val description: kotlin.String? = null
) {

}

