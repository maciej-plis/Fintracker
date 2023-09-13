package matthias.expense_tracker.openapi.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema

/**
 *
 * @param id
 * @param name
 */
data class ShopDto(

    @Schema(example = "3fa85f64-5717-4562-b3fc-2c963f66afa6", required = true, description = "")
    @field:JsonProperty("id", required = true) val id: java.util.UUID,

    @Schema(example = "Walmart", required = true, description = "")
    @field:JsonProperty("name", required = true) val name: kotlin.String
) {

}

