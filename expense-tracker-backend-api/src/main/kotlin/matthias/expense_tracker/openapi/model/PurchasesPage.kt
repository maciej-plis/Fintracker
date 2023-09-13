package matthias.expense_tracker.openapi.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import matthias.expense_tracker.openapi.model.PurchaseDto1
import io.swagger.v3.oas.annotations.media.Schema

/**
 *
 * @param content
 * @param totalPages
 * @param totalElements
 * @param first
 * @param last
 */
data class PurchasesPage(

    @Schema(example = "null", required = true, description = "")
    @field:JsonProperty("content", required = true) val content: kotlin.collections.List<PurchaseDto1>,

    @Schema(example = "null", required = true, description = "")
    @field:JsonProperty("totalPages", required = true) val totalPages: kotlin.Int,

    @Schema(example = "null", required = true, description = "")
    @field:JsonProperty("totalElements", required = true) val totalElements: kotlin.Long,

    @Schema(example = "null", required = true, description = "")
    @field:JsonProperty("first", required = true) val first: kotlin.Boolean,

    @Schema(example = "null", required = true, description = "")
    @field:JsonProperty("last", required = true) val last: kotlin.Boolean
) {

}

